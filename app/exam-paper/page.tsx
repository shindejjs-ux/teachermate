"use client";

import Sidebar from "@/components/layout/Sidebar";
import { useState } from "react";

export default function ExamPaperPage() {
  const [selectedClass, setSelectedClass] = useState("Class 9");
  const [subject, setSubject] = useState("Mathematics");
  const [examType, setExamType] = useState("Periodic Test");
  const [marks, setMarks] = useState("40");
  const [duration, setDuration] = useState("1:30 Hours");

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-4xl font-bold text-indigo-700 mb-2">
          📄 AI Exam Paper Generator
        </h1>

        <p className="text-gray-600 mb-8">
          Generate CBSE-compliant question papers in seconds.
        </p>

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <div className="grid md:grid-cols-2 gap-6">

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
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Exam Type
              </label>

              <select
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                className="w-full border rounded-xl p-3"
              >
                <option>Periodic Test</option>
                <option>Half Yearly</option>
                <option>Annual Exam</option>
                <option>Pre Board</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Maximum Marks
              </label>

              <input
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                className="w-full border rounded-xl p-3"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Duration
              </label>

              <input
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full border rounded-xl p-3"
              />
            </div>

          </div>

          <button
            className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg transition"
          >
            🚀 Generate Question Paper
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mt-8">

          <h2 className="text-2xl font-bold text-indigo-700 mb-6">
            Preview
          </h2>

          <div className="border rounded-xl p-6 bg-gray-50">

            <h3 className="text-xl font-bold text-center">
              THE ADITYA BIRLA PUBLIC SCHOOL
            </h3>

            <p className="text-center mt-2">
              {examType}
            </p>

            <div className="flex justify-between mt-6">
              <span><strong>Class:</strong> {selectedClass}</span>
              <span><strong>Subject:</strong> {subject}</span>
            </div>

            <div className="flex justify-between mt-3">
              <span><strong>Time:</strong> {duration}</span>
              <span><strong>Max Marks:</strong> {marks}</span>
            </div>

            <hr className="my-6" />

            <p className="text-gray-500 italic">
              AI-generated question paper preview will appear here.
            </p>

          </div>

        </div>
      </main>
    </div>
  );
}