import { NextResponse } from "next/server";
import { ai } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    const {
      className,
      subject,
      chapter,
      duration,
      language,
    } = await req.json();

    if (!className || !subject || !chapter) {
      return NextResponse.json(
        {
          success: false,
          error: "Class, Subject and Chapter are required.",
        },
        { status: 400 }
      );
    }

    const prompt = `
Generate a professional CBSE lesson plan.

Class: ${className}
Subject: ${subject}
Chapter: ${chapter}
Duration: ${duration}
Language: ${language}

Include:

# Lesson Information
# Learning Outcomes
# Competencies
# Prerequisite Knowledge
# Teaching Learning Material
# Introduction
# Teaching Process
# Classroom Activities
# Assessment
# HOTS Questions
# Homework
# Reflection

Return ONLY markdown.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    return NextResponse.json({
      success: true,
      lessonPlan: response.text ?? "",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Unknown Error",
      },
      { status: 500 }
    );
  }
}