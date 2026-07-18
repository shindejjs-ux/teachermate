import { NextResponse } from "next/server";
import { ai } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    console.log("========== ENV TEST ==========");
    console.log("cwd:", process.cwd());
    console.log("API exists:", !!process.env.GEMINI_API_KEY);
    console.log("API length:", process.env.GEMINI_API_KEY?.length);
    console.log("==============================");

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
You are an expert CBSE teacher and curriculum designer.

Generate a detailed CBSE Lesson Plan.

Class: ${className}
Subject: ${subject}
Chapter: ${chapter}
Duration: ${duration}
Language: ${language}

The lesson plan must contain:

# Lesson Information

# Learning Outcomes

# Competencies

# Prerequisite Knowledge

# Teaching Learning Material

# Introduction (5 Minutes)

# Teaching Process

# Classroom Activity

# STEM Integration

# AI Integration

# Art Integration

# Real Life Applications

# Assessment

# HOTS Questions

# Homework

# Reflection

# Bloom's Taxonomy Mapping

# NEP 2020 Alignment

# 21st Century Skills

# Cross Curricular Links

Return the response in Markdown format.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    return NextResponse.json({
      success: true,
      lessonPlan: response.text,
    });

  } catch (error) {
    console.log("=================================");
    console.log("FULL ERROR");
    console.log("=================================");

    console.dir(error, { depth: null });

    if (error instanceof Error) {
      console.log("Message:", error.message);
      console.log("Stack:", error.stack);
    }

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown Error",
      },
      {
        status: 500,
      }
    );
  }
}