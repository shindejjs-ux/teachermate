import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-indigo-600 text-white p-6">
      
      <h1 className="text-3xl font-bold mb-8">
        TeacherMate
      </h1>

      <div className="space-y-3">

        <Link href="/dashboard">
          <div className="p-3 rounded-xl bg-indigo-500 cursor-pointer">
            Dashboard
          </div>
        </Link>

        <Link href="/chapter-hub">
          <div className="p-3 rounded-xl bg-indigo-500 cursor-pointer">
            Chapter Hub
          </div>
        </Link>

        <Link href="/lesson-planner">
          <div className="p-3 rounded-xl bg-indigo-500 cursor-pointer">
            Lesson Planner
          </div>
        </Link>

        <Link href="/question-bank">
          <div className="p-3 rounded-xl bg-indigo-500 cursor-pointer">
            Question Bank
          </div>
        </Link>

        <Link href="/worksheets">
          <div className="p-3 rounded-xl bg-indigo-500 cursor-pointer">
            Worksheets
          </div>
        </Link>

        <Link href="/question-paper">
          <div className="p-3 rounded-xl bg-indigo-500 cursor-pointer">
            Question Papers
          </div>
        </Link>

        <Link href="/teacher-ai">
          <div className="p-3 rounded-xl bg-indigo-500 cursor-pointer">
            Teacher AI
          </div>
        </Link>

        <Link href="/analytics">
          <div className="p-3 rounded-xl bg-indigo-500 cursor-pointer">
            Analytics
          </div>
        </Link>

      </div>
    </div>
  );
}