"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Library,
  School,
  GraduationCap,
  BookOpen,
  BookCopy,
  FolderOpen,
  FileText,
  Users,
  UserRound,
  ClipboardList,
  Brain,
  FileQuestion,
  ClipboardCheck,
  BarChart3,
  Settings,
} from "lucide-react";

const menu = [
  {
    heading: "Dashboard",
  },

  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },

  {
    title: "Digital Library",
    href: "/digital-library",
    icon: Library,
  },

  {
    heading: "Academic",
  },

  {
    title: "Boards",
    href: "/admin/boards",
    icon: School,
  },

  {
    title: "Classes",
    href: "/admin/classes",
    icon: GraduationCap,
  },

  {
    title: "Subjects",
    href: "/admin/subjects",
    icon: BookOpen,
  },

  {
    title: "Books",
    href: "/admin/books",
    icon: BookCopy,
  },

  {
    title: "Chapters",
    href: "/admin/chapters",
    icon: FolderOpen,
  },

  {
    title: "Resources",
    href: "/admin/resources",
    icon: FileText,
  },

  {
    heading: "Teaching",
  },

  {
    title: "Lesson Plans",
    href: "/admin/lesson-plans",
    icon: ClipboardList,
  },

  {
    title: "Question Bank",
    href: "/admin/question-bank",
    icon: Brain,
  },

  {
    title: "Question Papers",
    href: "/admin/question-papers",
    icon: FileQuestion,
  },

  {
    title: "Quizzes",
    href: "/admin/quizzes",
    icon: ClipboardCheck,
  },

  {
    heading: "Users",
  },

  {
    title: "Teachers",
    href: "/admin/teachers",
    icon: Users,
  },

  {
    title: "Students",
    href: "/admin/students",
    icon: UserRound,
  },

  {
    heading: "System",
  },

  {
    title: "Reports",
    href: "/admin/reports",
    icon: BarChart3,
  },

  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-72 flex-col bg-slate-900 text-white border-r border-slate-800">

      {/* Logo */}

      <div className="border-b border-slate-800 p-6">

        <h1 className="text-3xl font-bold text-indigo-400">
          TeacherMate
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          AI Powered Teaching Platform
        </p>

      </div>

      {/* Menu */}

      <nav className="flex-1 overflow-y-auto p-4">

        {menu.map((item, index) => {

          if ("heading" in item) {
            return (
              <p
                key={index}
                className="mt-6 mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                {item.heading}
              </p>
            );
          }

          const Icon = item.icon;

          const active =
            pathname === item.href ||
            pathname.startsWith(item.href + "/");

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                active
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon size={20} />

              <span className="font-medium">
                {item.title}
              </span>
            </Link>
          );

        })}

      </nav>

      {/* Footer */}

      <div className="border-t border-slate-800 p-5">

        <div className="rounded-xl bg-slate-800 p-4">

          <p className="font-semibold">
            TeacherMate AI
          </p>

          <p className="mt-1 text-xs text-slate-400">
            Version 1.0.0
          </p>

        </div>

      </div>

    </aside>
  );
}