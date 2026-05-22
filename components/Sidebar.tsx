import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-indigo-600 text-white p-6">
      <h1 className="text-3xl font-bold mb-8">
        TeacherMate
      </h1>

      <div className="space-y-4">

        <Link href="/">
          <div className="p-4 rounded-xl bg-indigo-500 cursor-pointer">
            Dashboard
          </div>
        </Link>

        <Link href="/library">
          <div className="p-4 rounded-xl bg-indigo-500 cursor-pointer">
            Digital Library
          </div>
        </Link>

        <Link href="/lesson-planner">
          <div className="p-4 rounded-xl bg-indigo-500 cursor-pointer">
            Lesson Planner
          </div>
        </Link>

        <Link href="/quiz-generator">
          <div className="p-4 rounded-xl bg-indigo-500 cursor-pointer">
            Quiz Generator
          </div>
        </Link>

      </div>
    </div>
  );
}