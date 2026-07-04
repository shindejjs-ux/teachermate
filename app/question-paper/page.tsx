"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function QuestionPaperPage() {
  const [selectedClass, setSelectedClass] = useState("Class 9");
  const [subject, setSubject] = useState("Mathematics");
  const [chapter, setChapter] = useState("");
  const [paperType, setPaperType] = useState("Unit Test");
  const [difficulty, setDifficulty] = useState("Moderate");

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold text-indigo-700">
          📝 AI Question Paper Generator
        </h1>

        <p className="text-gray-600 mt-2 mb-8">
          Create CBSE competency-based question papers within seconds.
        </p>

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            <div>
              <label className="block font-semibold mb-2">
                Class
              </label>

              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full border rounded-xl p-3"
              >
                <option>Class 6</option>
                <option>Class 7</option>
                <option>Class 8</option>
                <option>Class 9</option>
                <option>Class 10</option>
                <option>Class 11</option>
                <option>Class 12</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Subject
              </label>

              <input
                className="w-full border rounded-xl p-3"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Chapter
              </label>

              <input
                className="w-full border rounded-xl p-3"
                placeholder="Enter Chapter Name"
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Paper Type
              </label>

              <select
                value={paperType}
                onChange={(e) => setPaperType(e.target.value)}
                className="w-full border rounded-xl p-3"
              >
                <option>Unit Test</option>
                <option>Periodic Test</option>
                <option>Half Yearly</option>
                <option>Annual Exam</option>
                <option>Sample Paper</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Difficulty
              </label>

              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full border rounded-xl p-3"
              >
                <option>Easy</option>
                <option>Moderate</option>
                <option>Tough</option>
              </select>
            </div>

          </div>

          <button
            className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold transition shadow-lg"
          >
            🚀 Generate Question Paper
          </button>

        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <h2 className="text-2xl font-bold text-indigo-700 mb-6">
            Generated Paper Preview
          </h2>

          <div className="border rounded-2xl p-6 bg-gray-50">

            <h3 className="text-center text-xl font-bold">
              Question Paper
            </h3>

            <div className="grid md:grid-cols-2 gap-4 mt-6">

              <div>
                <strong>Class:</strong> {selectedClass}
              </div>

              <div>
                <strong>Subject:</strong> {subject}
              </div>

              <div>
                <strong>Chapter:</strong> {chapter || "Not Selected"}
              </div>

              <div>
                <strong>Paper Type:</strong> {paperType}
              </div>

              <div>
                <strong>Difficulty:</strong> {difficulty}
              </div>

            </div>

            <div className="mt-8 rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-500">
              AI-generated CBSE question paper will appear here.
            </div>

          </div>

        </div>

      </main>
    </div>
  );
}