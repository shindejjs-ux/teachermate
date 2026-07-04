"use client";

import Sidebar from "@/components/layout/Sidebar";

export default function WorksheetsPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8" role="main">
        <h1 className="text-4xl font-bold text-indigo-700">
          📄 Worksheets
        </h1>

        <p className="text-gray-600 mt-4">
          Welcome to TeacherMate Worksheets.
        </p>
      </main>
    </div>
  );
}