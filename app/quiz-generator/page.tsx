"use client";

import { useState } from "react";

type Question = {
  question: string;
  options: string[];
  answer: number;
};

export default function QuizGeneratorPage() {
  const [chapter, setChapter] = useState("");
  const [loading, setLoading] = useState(false);

  const [questions, setQuestions] = useState<Question[]>([]);

  const sampleQuestions: Question[] = [
    {
      question: "What is a Rational Number?",
      options: [
        "Number of form p/q",
        "Whole Number",
        "Natural Number",
        "Prime Number",
      ],
      answer: 0,
    },
    {
      question: "Zero is",
      options: [
        "Natural",
        "Rational",
        "Prime",
        "Composite",
      ],
      answer: 1,
    },
    {
      question: "5/7 belongs to",
      options: [
        "Integers",
        "Whole Numbers",
        "Rational Numbers",
        "Natural Numbers",
      ],
      answer: 2,
    },
  ];

  async function generateQuiz() {
    setLoading(true);

    await new Promise((r) => setTimeout(r, 1000));

    setQuestions(sampleQuestions);

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="bg-pink-700 text-white p-8">
        <h1 className="text-4xl font-bold">
          🎯 AI Quiz Generator
        </h1>

        <p className="mt-2 text-pink-100">
          Generate quizzes instantly.
        </p>
      </div>

      <div className="max-w-6xl mx-auto p-8">

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <label className="font-bold">
            Chapter Name
          </label>

          <input
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            placeholder="Enter Chapter"
            className="w-full border rounded-lg p-3 mt-2"
          />

          <button
            onClick={generateQuiz}
            disabled={loading}
            className="mt-6 bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-xl font-bold"
          >
            {loading ? "Generating..." : "Generate Quiz"}
          </button>

        </div>

        {questions.length > 0 && (

          <div className="mt-8 space-y-6">

            {questions.map((q, i) => (

              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg p-6"
              >

                <h2 className="font-bold text-xl">
                  Q{i + 1}. {q.question}
                </h2>

                <div className="mt-4 space-y-3">

                  {q.options.map((op, index) => (

                    <label
                      key={index}
                      className="flex items-center gap-3 border rounded-lg p-3 cursor-pointer hover:bg-gray-100"
                    >

                      <input
                        type="radio"
                        name={`q${i}`}
                      />

                      {op}

                    </label>

                  ))}

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}