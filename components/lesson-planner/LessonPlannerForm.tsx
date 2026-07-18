"use client";

import { useState } from "react";

interface Props {
  onGenerate: (lessonPlan: string) => void;
}

export default function LessonPlannerForm({ onGenerate }: Props) {
  const [className, setClassName] = useState("IX");
  const [subject, setSubject] = useState("Mathematics");
  const [chapter, setChapter] = useState("");
  const [duration, setDuration] = useState("45 Minutes");
  const [language, setLanguage] = useState("English");

  const [loading, setLoading] = useState(false);

  async function generateLesson() {
    if (!chapter.trim()) {
      alert("Please enter the chapter name.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/lesson-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          className,
          subject,
          chapter,
          duration,
          language,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Generation failed");
      }

      onGenerate(data.lessonPlan);
    } catch (error) {
      console.error(error);
      alert("Unable to generate lesson plan.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">
        Lesson Details
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          className="rounded border p-3"
          placeholder="Class"
          value={className}
          onChange={(e) => setClassName(e.target.value)}
        />

        <input
          className="rounded border p-3"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <input
          className="rounded border p-3"
          placeholder="Chapter"
          value={chapter}
          onChange={(e) => setChapter(e.target.value)}
        />

        <input
          className="rounded border p-3"
          placeholder="Duration"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />

        <select
          className="rounded border p-3"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option>English</option>
          <option>Hindi</option>
        </select>
      </div>

      <button
        onClick={generateLesson}
        disabled={loading}
        className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Generating..." : "Generate Lesson Plan"}
      </button>
    </div>
  );
}