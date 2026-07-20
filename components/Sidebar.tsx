"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  BookOpen,
  FileText,
  Library,
  ClipboardList,
  Brain,
  School,
  GraduationCap,
  Book,
  FolderOpen,
  Users,
  UserCog,
  Settings,
} from "lucide-react";

const menu = [
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
    title: "Lesson Planner",
    href: "/lesson-planner",
    icon: ClipboardList,
  },
  {
    title: "Question Bank",
    href: "/question-bank",
    icon: Brain,
  },
  {
    title: "Quiz Generator",
    href: "/quiz-generator",
    icon: FileText,
  },

  {
    heading: "Academic",
  },

  {
    title: "Classes",
    href: "/admin/classes",
    icon: School,
  },
  {
    title: "Subjects",
    href: "/admin/subjects",
    icon: GraduationCap,
  },
  {
    title: "Books",
    href: "/admin/books",
    icon: Book,
  },
  {
    title: "Chapters",
    href: "/admin/chapters",
    icon: BookOpen,
  },
  {
    title: "Resources",
    href: "/admin/resources",
    icon: FolderOpen,
  },

  {
    heading: "Users",
  },

  {
    title: "Teachers",
    href: "/admin/teachers",
    icon: UserCog,
  },
  {
    title: "Students",
    href: "/admin/students",
    icon: Users,
  },

  {
    heading: "System",
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
    <aside className="w-72 bg-slate-900 text-white min-h-screen shadow-xl">

      {/* Logo */}

      <div className="p-6 border-b border-slate-700">

        <h1 className="text-3xl font-bold text-indigo-400">
          TeacherMate
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          CBSE Learning Platform
        </p>

      </div>

      {/* Menu */}

      <nav className="p-4 space-y-2">

        {menu.map((item, index) => {
          if ("heading" in item) {
            return (
              <p
                key={index}
                className="mt-6 mb-2 px-3 text-xs uppercase tracking-wider text-slate-400"
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
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                active
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "hover:bg-slate-800 text-slate-300"
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

      <div className="absolute bottom-0 w-72 border-t border-slate-700 p-4">

        <div className="rounded-xl bg-slate-800 p-4">

          <p className="font-semibold">
            TeacherMate
          </p>

          <p className="text-xs text-slate-400 mt-1">
            Version 1.0.0
          </p>

        </div>

      </div>

    </aside>
  );
}
