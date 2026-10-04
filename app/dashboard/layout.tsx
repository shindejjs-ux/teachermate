import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import LogoutButton from "./logout-button";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const role = String(user?.user_metadata?.role || "teacher")
    .replace("_", " ")
    .replace(/\b\w/g, (c: string) => c.toUpperCase());

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/dashboard" className="text-xl font-bold tracking-tight text-indigo-700">
            TeacherMate <span className="text-slate-900">AI</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-900">{user?.user_metadata?.full_name || user?.email}</p>
              <p className="text-xs capitalize text-slate-500">{role}</p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl lg:grid-cols-[230px_1fr]">
        <aside className="hidden min-h-[calc(100vh-73px)] border-r border-slate-200 bg-white p-4 lg:block">
          <nav className="space-y-1">
            <Link href="/dashboard" className="block rounded-xl bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-700">
              Dashboard
            </Link>
            <Link href="/digital-library" className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50">
              Digital Library
            </Link>
            <Link href="/teacher" className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50">
              Teaching Workspace
            </Link>
            <Link href="/admin" className="block rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50">
              Administration
            </Link>
          </nav>
        </aside>
        <main className="min-w-0 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}