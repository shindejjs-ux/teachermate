"use client";

import { useState } from "react";

export default function LessonPlannerPage() {
  const [form, setForm] = useState({
    className: "9",
    subject: "Mathematics",
    chapter: "",
    duration: "40",
    teachingMethod: "Experiential",
  });

  const [loading, setLoading] = useState(false);
  const [lesson, setLesson] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function generateLesson() {
    setLoading(true);

    // AI will be connected here
    await new Promise((r) => setTimeout(r, 1000));

    setLesson(`
LESSON PLAN

Class : ${form.className}
Subject : ${form.subject}
Chapter : ${form.chapter}

Learning Objectives
• Understand the concept
• Solve numerical problems
• Apply concepts in daily life

Teaching Aids
• Smart Board
• PPT
• NCERT Book
• Worksheet

Introduction (5 min)

Previous knowledge discussion.

Activity (15 min)

Experiential learning activity.

Explanation (15 min)

Concept explanation with examples.

Assessment (5 min)

Oral questions and worksheet.

Homework

Exercise from textbook.
`);

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="bg-teal-700 text-white p-8">
        <h1 className="text-4xl font-bold">
          📝 AI Lesson Planner
        </h1>

        <p className="mt-2 text-teal-100">
          Generate CBSE lesson plans instantly.
        </p>
      </div>

      <div className="max-w-5xl mx-auto p-8">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="font-semibold">Class</label>

              <select
                name="className"
                value={form.className}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i}>{i + 1}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-semibold">Subject</label>

              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              />
            </div>

            <div>
              <label className="font-semibold">Chapter</label>

              <input
                name="chapter"
                value={form.chapter}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
                placeholder="Chapter Name"
              />
            </div>

            <div>
              <label className="font-semibold">
                Duration (minutes)
              </label>

              <select
                name="duration"
                value={form.duration}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              >
                <option>35</option>
                <option>40</option>
                <option>45</option>
                <option>60</option>
              </select>
            </div>

            <div>
              <label className="font-semibold">
                Teaching Method
              </label>

              <select
                name="teachingMethod"
                value={form.teachingMethod}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 mt-2"
              >
                <option>Experiential</option>
                <option>Activity Based</option>
                <option>Discussion</option>
                <option>Problem Solving</option>
                <option>Inquiry Based</option>
              </select>
            </div>

          </div>

          <button
            onClick={generateLesson}
            disabled={loading}
            className="mt-8 w-full bg-teal-600 hover:bg-teal-700 text-white py-4 rounded-xl text-xl font-bold"
          >
            {loading ? "Generating..." : "🤖 Generate Lesson Plan"}
          </button>

        </div>

        {lesson && (
          <div className="bg-white rounded-2xl shadow-lg mt-8 p-8">
            <h2 className="text-2xl font-bold mb-4">
              Generated Lesson Plan
            </h2>

            <pre className="whitespace-pre-wrap text-gray-700">
              {lesson}
            </pre>
          </div>
        )}

      </div>

    </div>
  );
}