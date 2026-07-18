"use client";

import { useState } from "react";

type Props = {
  onGenerated: (lesson: string) => void;
};

export default function LessonPlannerForm({ onGenerated }: Props) {
  const [className, setClassName] = useState("IX");
  const [subject, setSubject] = useState("Mathematics");
  const [chapter, setChapter] = useState("");
  const [duration, setDuration] = useState("45 Minutes");
  const [language, setLanguage] = useState("English");
  const [loading, setLoading] = useState(false);

  async function generateLesson() {
  console.log("✅ Generate button clicked");

    setLoading(true);

    try {
      const res = await fetch("/api/lesson-plan", {
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

      const data = await res.json();
      onGenerated(data.lessonPlan ?? "");
    } catch (err) {
      console.error(err);
      alert("Failed to generate lesson plan.");
    }

    setLoading(false);
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h2 className="text-xl font-bold">AI Lesson Planner</h2>

      <input
        className="border p-2 w-full rounded"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        placeholder="Class"
      />

      <input
        className="border p-2 w-full rounded"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
      />

      <input
        className="border p-2 w-full rounded"
        value={chapter}
        onChange={(e) => setChapter(e.target.value)}
        placeholder="Chapter"
      />

      <input
        className="border p-2 w-full rounded"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        placeholder="Duration"
      />

      <select
        className="border p-2 w-full rounded"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option>English</option>
        <option>Hindi</option>
      </select>

      <button
        onClick={generateLesson}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Generating..." : "Generate Lesson Plan"}
      </button>
    </div>
  );
}