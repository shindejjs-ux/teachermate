"use client";

import { useState } from "react";

export default function QuestionBankPage() {

  const [subject, setSubject] = useState("");

  const [topic, setTopic] = useState("");

  const questions = [
    {
      type: "HOTS Question",
      question:
        "Explain the concept with real-life application.",
    },

    {
      type: "Competency-Based",
      question:
        "Analyze the situation and answer logically.",
    },

    {
      type: "Assertion-Reason",
      question:
        "Assertion (A) and Reason (R) based question.",
    },

    {
      type: "Case Study",
      question:
        "Read the passage carefully and answer questions.",
    },
  ];

  return (
    <div className="p-8">

      <h1 className="text-5xl font-bold mb-8">
        Question Bank Generator 🎯
      </h1>

      <div className="bg-white rounded-3xl shadow-xl p-8 max-w-3xl">

        <div className="mb-6">

          <label className="block mb-2 font-semibold">
            Subject
          </label>

          <input
            type="text"
            placeholder="Enter subject"
            className="w-full border rounded-xl p-3"
            value={subject}
            onChange={(e) =>
              setSubject(e.target.value)
            }
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
            onChange={(e) =>
              setTopic(e.target.value)
            }
          />

        </div>

        <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl">
          Generate Questions
        </button>

      </div>

      {(subject || topic) && (

        <div className="mt-10 grid gap-6">

          {questions.map((q, index) => (

            <div
              key={index}
              className="bg-white border rounded-2xl shadow p-6"
            >

              <h2 className="text-2xl font-bold mb-3">
                {q.type}
              </h2>

              <p className="text-lg">
                {q.question}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}