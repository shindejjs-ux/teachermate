"use client";

import Sidebar from "@/components/layout/Sidebar";

export default function DigitalLibraryPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-8 bg-gray-100">
        <h1 className="text-4xl font-bold text-indigo-700 mb-4">
          Digital Library
        </h1>

        <p className="text-gray-600">
          Welcome to the TeacherMate Digital Library.
        </p>
      </main>
    </div>
  );
}