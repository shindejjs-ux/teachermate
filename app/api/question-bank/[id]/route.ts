import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-browser";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

// DELETE Question
export async function DELETE(
  req: NextRequest,
  { params }: Params
) {
  const { id } = await params;

  const { error } = await supabase
    .from("questions")
    .delete()
    .eq("id", id);

  if (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }

  return NextResponse.json({
    success: true,
  });
}

// GET Single Question
export async function GET(
  req: NextRequest,
  { params }: Params
) {
  const { id } = await params;

  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }

  return NextResponse.json({
    success: true,
    question: data,
  });
}

// UPDATE Question
export async function PUT(
  req: NextRequest,
  { params }: Params
) {
  const { id } = await params;
  const body = await req.json();

  const { error } = await supabase
    .from("questions")
    .update(body)
    .eq("id", id);

  if (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }

  return NextResponse.json({
    success: true,
  });
}