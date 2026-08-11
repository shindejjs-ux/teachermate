import Link from "next/link";
import { createClient } from "@/lib/supabase-server";
import DashboardCard from "@/components/dashboard/DashboardCard";
import {
  Users,
  GraduationCap,
  BookOpen,
  FolderOpen,
  FileText,
  Brain,
  LibraryBig,
  ClipboardList,
} from "lucide-react";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const [
    { count: teachers },
    { count: students },
    { count: books },
    { count: chapters },
    { count: resources },
    { count: questionBank },
    { count: lessonPlans },
  ] = await Promise.all([
    supabase.from("teachers").select("*", { count: "exact", head: true }),
    supabase.from("students").select("*", { count: "exact", head: true }),
    supabase.from("books").select("*", { count: "exact", head: true }),
    supabase.from("chapters").select("*", { count: "exact", head: true }),
    supabase.from("resources").select("*", { count: "exact", head: true }),
    supabase.from("question_bank").select("*", { count: "exact", head: true }),
    supabase.from("lesson_plans").select("*", { count: "exact", head: true }),
  ]);

  const cards = [
    {
      title: "Teachers",
      value: teachers ?? 0,
      icon: Users,
      href: "/admin/teachers",
      color: "bg-blue-500",
    },
    {
      title: "Students",
      value: students ?? 0,
      icon: GraduationCap,
      href: "/admin/students",
      color: "bg-green-500",
    },
    {
      title: "Books",
      value: books ?? 0,
      icon: BookOpen,
      href: "/admin/books",
      color: "bg-purple-500",
    },
    {
      title: "Chapters",
      value: chapters ?? 0,
      icon: FolderOpen,
      href: "/admin/chapters",
      color: "bg-orange-500",
    },
    {
      title: "Resources",
      value: resources ?? 0,
      icon: FileText,
      href: "/admin/resources",
      color: "bg-red-500",
    },
    {
      title: "Question Bank",
      value: questionBank ?? 0,
      icon: Brain,
      href: "/admin/question-bank",
      color: "bg-pink-500",
    },
    {
      title: "Digital Library",
      value: books ?? 0,
      icon: LibraryBig,
      href: "/digital-library",
      color: "bg-indigo-500",
    },
    {
      title: "Lesson Plans",
      value: lessonPlans ?? 0,
      icon: ClipboardList,
      href: "/admin/lesson-planner",
      color: "bg-cyan-500",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="rounded-2xl bg-linear-to-r from-indigo-700 to-blue-700 p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold">
          TeacherMate Admin Dashboard
        </h1>

        <p className="mt-2 text-indigo-100">
          Manage your complete Digital Learning Platform.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <DashboardCard
            key={card.title}
            title={card.title}
            value={String(card.value)}
            icon={card.icon}
            href={card.href}
            color={card.color}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <h2 className="mb-5 text-xl font-bold">
            Quick Actions
          </h2>

          <div className="grid gap-3">
            <Link href="/admin/resources" className="rounded-xl bg-blue-600 py-3 text-center text-white hover:bg-blue-700">
              Upload Resource
            </Link>

            <Link href="/admin/books" className="rounded-xl bg-green-600 py-3 text-center text-white hover:bg-green-700">
              Add Book
            </Link>

            <Link href="/admin/chapters" className="rounded-xl bg-purple-600 py-3 text-center text-white hover:bg-purple-700">
              Add Chapter
            </Link>

            <Link href="/admin/question-bank" className="rounded-xl bg-orange-600 py-3 text-center text-white hover:bg-orange-700">
              Question Bank
            </Link>

            <Link href="/admin/lesson-planner" className="rounded-xl bg-cyan-600 py-3 text-center text-white hover:bg-cyan-700">
              Lesson Planner
            </Link>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg">
          <h2 className="mb-5 text-xl font-bold">
            Platform Status
          </h2>

          <div className="space-y-4">
            <Status label="Supabase" status="Connected" color="text-green-600" />
            <Status label="Next.js 16" status="Running" color="text-green-600" />
            <Status label="Digital Library" status="Online" color="text-green-600" />
            <Status label="AI Engine" status="Coming Soon" color="text-yellow-600" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Status({
  label,
  status,
  color,
}: {
  label: string;
  status: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <span>{label}</span>
      <span className={`font-semibold ${color}`}>{status}</span>
    </div>
  );
}