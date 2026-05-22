"use client";

import { useState } from "react";
import Sidebar from "../../components/Sidebar";

export default function QuizGeneratorPage() {
  const [topic, setTopic] = useState("");

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-8 flex-1 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold text-indigo-700 mb-8">
          Quiz Generator 🧠
        </h1>

        <input
          type="text"
          placeholder="Enter Topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-4 rounded-2xl border mb-8"
        />

        {topic && (
          <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">
              MCQ Quiz on {topic}
            </h2>

            <div className="space-y-6">

              <div>
                <p className="font-bold mb-2">
                  1. What is {topic}?
                </p>

                <div className="space-y-2">
                  <p>A. Option 1</p>
                  <p>B. Option 2</p>
                  <p>C. Option 3</p>
                  <p>D. Option 4</p>
                </div>
              </div>

              <div>
                <p className="font-bold mb-2">
                  2. Practical application of {topic}?
                </p>

                <div className="space-y-2">
                  <p>A. Application 1</p>
                  <p>B. Application 2</p>
                  <p>C. Application 3</p>
                  <p>D. Application 4</p>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}