"use client";
import { getChapters } from "../../lib/curriculum/curriculumService";
import { useState } from "react";

export default function LessonPlansPage() {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        AI Lesson Plan Generator 📝
      </h1>

      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-3xl">

        <div className="mb-6">

          <label className="block mb-2 font-semibold">
            Subject
          </label>

          <input
            type="text"
            placeholder="Enter subject"
            className="w-full border rounded-xl p-3"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

        </div>

        <div className="mb-6">

          <label className="block mb-2 font-semibold">
            Topic
          </label>

          <input
            type="text"
            placeholder="Enter topic"
            className="w-full border rounded-xl p-3"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

        </div>

        <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl">
          Generate Lesson Plan
        </button>

      </div>

      {(subject || topic) && (

        <div className="mt-10 bg-green-50 border border-green-200 rounded-2xl p-8">

          <h2 className="text-3xl font-bold mb-6">
            Sample Lesson Plan
          </h2>

          <p className="mb-4">
            <strong>Subject:</strong> {subject}
          </p>

          <p className="mb-4">
            <strong>Topic:</strong> {topic}
          </p>

          <div className="mb-4">

            <h3 className="text-xl font-bold mb-2">
              Learning Objectives
            </h3>

            <ul className="list-disc ml-6">
              <li>Understand key concepts</li>
              <li>Develop analytical skills</li>
              <li>Apply concepts in daily life</li>
            </ul>

          </div>

          <div className="mb-4">

            <h3 className="text-xl font-bold mb-2">
              Classroom Activities
            </h3>

            <ul className="list-disc ml-6">
              <li>Group discussion</li>
              <li>Hands-on activity</li>
              <li>Worksheet practice</li>
            </ul>

          </div>

          <div>

            <h3 className="text-xl font-bold mb-2">
              Assessment
            </h3>

            <ul className="list-disc ml-6">
              <li>Quiz questions</li>
              <li>Oral questioning</li>
              <li>Homework assignment</li>
            </ul>

          </div>

        </div>

      )}

    </div>
  );
}