import Link from "next/link";
import Sidebar from "@/components/layout/Sidebar";

const quickLinks = [
  {
    title: "📚 Digital Library",
    description: "Browse books, chapters and learning resources.",
    href: "/digital-library",
    color: "bg-blue-600",
  },
  {
    title: "📝 Lesson Planner",
    description: "Create and manage lesson plans.",
    href: "/lesson-planner",
    color: "bg-green-600",
  },
  {
    title: "❓ Question Bank",
    description: "Generate and organize question papers.",
    href: "/question-bank",
    color: "bg-purple-600",
  },
  {
    title: "⚙️ Admin Panel",
    description: "Manage classes, books and resources.",
    href: "/admin",
    color: "bg-orange-600",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8">

        <div className="rounded-3xl bg-linear-to-r from-blue-700 via-indigo-700 to-purple-700 text-white p-10 shadow-xl">
          <h1 className="text-5xl font-bold">
            TeacherMate
          </h1>

          <p className="mt-4 text-xl opacity-95 max-w-3xl">
            A complete CBSE Digital Learning Platform designed for
            teachers and students from Classes 1–12.
          </p>

          <div className="flex gap-4 mt-8 flex-wrap">
            <Link
              href="/digital-library"
              className="bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition"
            >
              Open Digital Library
            </Link>

            <Link
              href="/admin"
              className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white/10 transition"
            >
              Admin Dashboard
            </Link>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="text-3xl font-bold mb-6">
            Quick Access
          </h2>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {quickLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={`${item.color} rounded-2xl text-white p-6 shadow-lg hover:scale-[1.02] transition`}
              >
                <h3 className="text-2xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-4 text-white/90">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="text-3xl font-bold">
            About TeacherMate
          </h2>

          <p className="mt-4 text-slate-600 leading-8">
            TeacherMate provides a centralized Digital Library, lesson planning,
            worksheets, presentations, videos, question banks and academic
            resources for CBSE schools. The platform is designed to help
            teachers deliver engaging classroom experiences while giving
            students quick access to high-quality learning materials.
          </p>
        </section>
      </main>
    </div>
  );
}