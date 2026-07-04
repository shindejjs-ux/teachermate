"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
export default function WorksheetsPage() {
  const [topic, setTopic] = useState("");

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-8 flex-1">
        <h1 className="text-4xl font-bold mb-8">
          Worksheet Generator 📝
        </h1>

        <input
          type="text"
          placeholder="Enter topic..."
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="border p-4 rounded-xl w-full mb-8"
        />

        {topic && (
          <div className="bg-white shadow-xl rounded-2xl p-6 border">
            <h2 className="text-2xl font-bold mb-4">
              Worksheet on {topic}
            </h2>

            <ol className="list-decimal ml-6 space-y-3">
              <li>Define {topic}</li>

              <li>
                Explain practical applications of {topic}
              </li>

              <li>
                Solve HOTS questions based on {topic}
              </li>

              <li>
                Write short notes on {topic}
              </li>

              <li>
                Give one real-life example of {topic}
              </li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}