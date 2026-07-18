"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Brain,
  FileText,
  ClipboardList,
  FileSpreadsheet,
  BarChart3,
  GraduationCap,
  Settings,
  User,
  LogOut,
} from "lucide-react";

const menu = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Digital Library",
    href: "/digital-library",
    icon: BookOpen,
  },
  {
    title: "AI Teacher",
    href: "/teacher-ai",
    icon: Brain,
  },
  {
    title: "Lesson Planner",
    href: "/lesson-planner",
    icon: FileText,
  },
  {
    title: "Question Papers",
    href: "/paper-generator",
    icon: ClipboardList,
  },
  {
    title: "Worksheets",
    href: "/worksheets",
    icon: FileSpreadsheet,
  },
  {
    title: "Question Bank",
    href: "/question-bank",
    icon: FileText,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Teacher Training",
    href: "/teacher-training",
    icon: GraduationCap,
  },
  {
    title: "Admin",
    href: "/admin",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-72 bg-slate-900 text-white shadow-xl">

      <div className="p-6 border-b border-slate-700">
        <h1 className="text-3xl font-bold text-indigo-400">
          TeacherMate
        </h1>

        <p className="text-sm text-slate-400 mt-2">
          AI Powered Teaching Platform
        </p>
      </div>

      <nav className="mt-6 px-3">

        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 mb-2 transition
              ${
                pathname === item.href
                  ? "bg-indigo-600 text-white"
                  : "hover:bg-slate-800 text-slate-300"
              }`}
            >
              <Icon size={20} />

              <span>{item.title}</span>
            </Link>
          );
        })}

      </nav>

      <div className="absolute bottom-0 w-full border-t border-slate-700 p-5">

        <div className="flex items-center gap-3 mb-5">
          <User size={26} />
          <div>
            <p className="font-semibold">
              Dr. Jayesh Shinde
            </p>

            <p className="text-xs text-slate-400">
              Administrator
            </p>
          </div>
        </div>

        <button className="flex items-center gap-3 text-red-400 hover:text-red-300">
          <LogOut size={18} />
          Logout
        </button>

      </div>

    </aside>
  );
}