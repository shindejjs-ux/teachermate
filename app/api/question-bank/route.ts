import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from("questions")
    .select(`
      *,
      classes(name),
      subjects(name),
      books(title),
      chapters(title)
    `)
    .order("id", { ascending: false });

  if (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }

  return NextResponse.json({
    success: true,
    questions: data,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      class_id,
      subject_id,
      book_id,
      chapter_id,
      question,
      answer,
      marks,
      difficulty,
      question_type,
      blooms_level,
      competency,
    } = body;

    if (
      !class_id ||
      !subject_id ||
      !question ||
      !answer
    ) {
      return NextResponse.json({
        success: false,
        error: "Please fill all required fields.",
      });
    }

    const { data, error } = await supabase
      .from("questions")
      .insert([
        {
          class_id,
          subject_id,
          book_id,
          chapter_id,
          question,
          answer,
          marks,
          difficulty,
          question_type,
          blooms_level,
          competency,
        },
      ])
      .select();

    if (error) {
      return NextResponse.json({
        success: false,
        error: error.message,
      });
    }

    return NextResponse.json({
      success: true,
      question: data[0],
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Server Error",
    });
  }
}