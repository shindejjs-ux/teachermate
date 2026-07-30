import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-browser/server";

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("books")
    .select("*");

  if (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true,
    data,
  });
}