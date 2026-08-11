"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  LibraryBig,
  School,
  GraduationCap,
  BookOpen,
  BookCopy,
  FolderOpen,
  FileText,
  ClipboardList,
  Brain,
  FileQuestion,
  ClipboardCheck,
  Users,
  UserRound,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const menu = [
  {
    section: "MAIN",
    items: [
      {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
      {
        title: "Digital Library",
        href: "/digital-library",
        icon: LibraryBig,
      },
    ],
  },
  {
    section: "ACADEMICS",
    items: [
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
    ],
  },
  {
    section: "TEACHING",
    items: [
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
    ],
  },
  {
    section: "USERS",
    items: [
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
    ],
  },
  {
    section: "SYSTEM",
    items: [
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
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 min-h-screen bg-slate-900 text-white flex flex-col border-r border-slate-800">
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-indigo-400">
          TeacherMate
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Admin Panel
        </p>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {menu.map((section) => (
          <div key={section.section}>
            <p className="px-3 mb-2 text-xs uppercase tracking-wider text-slate-500 font-semibold">
              {section.section}
            </p>

            {section.items.map((item) => {
              const Icon = item.icon;

              const active =
                pathname === item.href ||
                pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-4 py-3 mb-2 transition ${
                    active
                      ? "bg-indigo-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 font-medium hover:bg-red-700">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </aside>
  );
}