import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const response = NextResponse.next({ request });
  const pathname = request.nextUrl.pathname;
  const protectedRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/teacher");

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Do not take down public pages when Supabase configuration is missing.
  if (!supabaseUrl || !supabaseAnonKey) {
    if (protectedRoute) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      url.search = "";
      url.searchParams.set("redirect", pathname);
      url.searchParams.set("notice", "service-unavailable");
      return NextResponse.redirect(url);
    }
    return response;
  }

  try {
    let authResponse = response;
    const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          authResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            authResponse.cookies.set(name, value, options);
          });
        },
      },
    });

    const { data: { user }, error } = await supabase.auth.getUser();
    // A Supabase outage/quota restriction should not crash the request pipeline.
    if (error) {
      if (protectedRoute) {
        const url = request.nextUrl.clone();
        url.pathname = "/auth/login";
        url.search = "";
        url.searchParams.set("redirect", pathname);
        url.searchParams.set("notice", "service-unavailable");
        return NextResponse.redirect(url);
      }
      return authResponse;
    }

    if (protectedRoute && !user) {
      const url = request.nextUrl.clone();
      url.pathname = "/auth/login";
      url.search = "";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }

    if (pathname.startsWith("/auth/") && user) {
      const url = request.nextUrl.clone();
      url.pathname = "/dashboard";
      url.search = "";
      return NextResponse.redirect(url);
    }

    return authResponse;
  } catch (error) {
    console.error("Supabase proxy check failed:", error);
    // Keep public routes usable during an upstream outage.
    if (!protectedRoute) return response;

    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.search = "";
    url.searchParams.set("redirect", pathname);
    url.searchParams.set("notice", "service-unavailable");
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/teacher/:path*",
    "/auth/:path*",
  ],
};
