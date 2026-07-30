"use client";

import { useState } from "react";

export default function WorksheetsPage() {
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");

  const [worksheet, setWorksheet] = useState("");
  const [loading, setLoading] = useState(false);

  async function generateWorksheet() {
    if (!className || !subject || !chapter) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/worksheets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          className,
          subject,
          chapter,
          difficulty,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setWorksheet(data.worksheet);
      } else {
        alert("Worksheet generation failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          📄 AI Worksheet Generator
        </h1>

        <p className="text-slate-500 mt-2">
          Generate CBSE worksheets instantly.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 space-y-5">

        <div className="grid md:grid-cols-2 gap-5">

          <select
            className="border rounded-xl p-3"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          >
            <option value="">Select Class</option>
            <option>Class 6</option>
            <option>Class 7</option>
            <option>Class 8</option>
            <option>Class 9</option>
            <option>Class 10</option>
            <option>Class 11</option>
            <option>Class 12</option>
          </select>

          <select
            className="border rounded-xl p-3"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="">Select Subject</option>
            <option>Mathematics</option>
            <option>Physics</option>
            <option>Chemistry</option>
            <option>Biology</option>
            <option>English</option>
            <option>Computer Science</option>
          </select>

          <input
            className="border rounded-xl p-3"
            placeholder="Enter Chapter Name"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
          />

          <select
            className="border rounded-xl p-3"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

        </div>

        <button
          onClick={generateWorksheet}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl"
        >
          {loading ? "Generating..." : "Generate Worksheet"}
        </button>

      </div>

      {worksheet && (
        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-2xl font-bold mb-4">
            Generated Worksheet
          </h2>

          <pre className="whitespace-pre-wrap">
            {worksheet}
          </pre>

        </div>
      )}

    </div>
  );
}