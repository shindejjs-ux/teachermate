"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import { classes } from "@/lib/data/classes";
import { subjects } from "@/lib/data/subjects";
import { getChapters } from "@/lib/curriculum/curriculumService";

export default function ChapterHubPage() {
  const [selectedClass, setSelectedClass] = useState<keyof typeof subjects | "">("");
  const [selectedSubject, setSelectedSubject] = useState("");

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Chapter Hub
      </h1>

      {/* STEP 1 - CLASS */}
      {!selectedClass && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Select Class
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {classes.map((cls) => (
              <button
                key={cls}
                onClick={() => setSelectedClass(cls as keyof typeof subjects)}
                className="p-6 bg-white rounded-2xl shadow-md border hover:shadow-xl hover:scale-105 transition-all duration-200 text-left"
              >
                <div className="text-2xl font-bold text-indigo-600">
                  {cls}
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  Tap to open
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* STEP 2 - SUBJECT */}
      {selectedClass && !selectedSubject && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Select Subject ({selectedClass})
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {subjects[selectedClass]?.map((subj) => (
              <button
  key={subj}
  onClick={() => setSelectedSubject(subj)}
  className="p-6 bg-white rounded-2xl shadow-md border hover:shadow-xl hover:bg-green-50 transition-all text-left"
>
  <div className="text-xl font-semibold">
    {subj}
  </div>
  <div className="text-sm text-gray-500 mt-1">
    Subject Content
  </div>
</button>
            ))}
          </div>

          <button
            onClick={() => setSelectedClass("")}
            className="mt-4 text-sm text-blue-600"
          >
            ← Back
          </button>
        </div>
      )}

      {/* STEP 3 - CHAPTERS */}
      {selectedClass && selectedSubject && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Chapters ({selectedClass} - {selectedSubject})
          </h2>

          <div className="grid gap-4">
            {getChapters(selectedClass, selectedSubject).map(
              (ch: any) => (
                <div
                  key={ch.chapterNo}
                  className="p-4 bg-white shadow rounded-xl"
                >
                  <h3 className="font-bold">
                    Chapter {ch.chapterNo}
                  </h3>
                  <p>{ch.title}</p>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}