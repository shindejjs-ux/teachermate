"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function TeacherAIPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleGenerate = () => {
    setResponse(
      "🤖 AI response will appear here. Later this will connect to OpenAI or Gemini API."
    );
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold text-indigo-700">
          🤖 TeacherMate AI
        </h1>

        <p className="text-gray-600 mt-2 mb-8">
          Your intelligent CBSE teaching assistant powered by Artificial Intelligence.
        </p>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* AI Prompt */}

          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-2xl font-bold text-indigo-700 mb-6">
              Ask TeacherMate AI
            </h2>

            <textarea
              rows={8}
              placeholder="Example: Generate a competency-based lesson plan for Class 9 Mathematics Chapter 1..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full border rounded-2xl p-4 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              onClick={handleGenerate}
              className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-semibold transition"
            >
              🚀 Generate with AI
            </button>

            <div className="mt-8">

              <h3 className="text-xl font-bold text-indigo-700 mb-3">
                AI Response
              </h3>

              <div className="bg-slate-50 rounded-2xl border p-6 min-h-[220px] whitespace-pre-wrap">
                {response || (
                  <span className="text-gray-400">
                    Your AI response will appear here...
                  </span>
                )}
              </div>

            </div>

          </div>

          {/* Quick Tools */}

          <div className="bg-white rounded-3xl shadow-xl p-8">

            <h2 className="text-2xl font-bold text-indigo-700 mb-6">
              AI Quick Tools
            </h2>

            <div className="space-y-4">

              {[
                "📝 Lesson Plan Generator",
                "📄 Worksheet Generator",
                "❓ MCQ Generator",
                "📚 Question Bank",
                "📊 Competency Questions",
                "🎯 Bloom's Taxonomy Questions",
                "📖 Learning Outcomes",
                "🎨 Art Integration Ideas",
                "🧪 Activity Generator",
                "📋 Rubric Generator",
                "📑 Report Card Comments",
                "🎓 Teacher Training Assistant"
              ].map((tool) => (
                <button
                  key={tool}
                  className="w-full text-left bg-indigo-50 hover:bg-indigo-100 p-4 rounded-xl transition"
                >
                  {tool}
                </button>
              ))}

            </div>

          </div>

        </div>

        {/* AI Capabilities */}

        <div className="mt-10 bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-bold text-indigo-700 mb-6">
            AI Capabilities
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              "Lesson Planning",
              "Question Paper Creation",
              "Worksheets",
              "Competency Mapping",
              "Learning Outcomes",
              "Assessment Design",
              "Parent Communication",
              "Classroom Activities"
            ].map((item) => (
              <div
                key={item}
                className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-5 text-center shadow"
              >
                <h3 className="font-semibold text-indigo-700">
                  {item}
                </h3>
              </div>
            ))}

          </div>

        </div>

      </main>
    </div>
  );
}