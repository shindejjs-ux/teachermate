import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      className,
      subject,
      chapter,
      marks,
      difficulty,
    } = body;

    if (!className || !subject || !chapter) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required fields",
        },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    const prompt = `
You are an expert CBSE Question Paper Setter.

Prepare a professional CBSE Question Paper.

School:
THE ADITYA BIRLA PUBLIC SCHOOL, RENUKOOT

Class: ${className}
Subject: ${subject}
Chapter: ${chapter}
Maximum Marks: ${marks}
Difficulty: ${difficulty}

Generate ONLY the question paper.

Include:

• School Header
• General Instructions
• Time Allowed
• Maximum Marks

SECTION A – MCQs

SECTION B – Very Short Answer

SECTION C – Short Answer

SECTION D – Long Answer

SECTION E – Case Study

SECTION F – Competency Based Questions

Rules:
- Follow latest CBSE pattern.
- Include HOTS questions.
- Include Assertion & Reason wherever appropriate.
- Do not provide answers.
- Proper marks distribution.
`;

    const result = await model.generateContent(prompt);

    const paper = result.response.text();

    return NextResponse.json({
      success: true,
      paper,
    });

  } catch (err) {
    console.error("Question Paper Error:", err);

    return NextResponse.json(
      {
        success: false,
        error:
          err instanceof Error
            ? err.message
            : "Unable to generate question paper.",
      },
      { status: 500 }
    );
  }
}