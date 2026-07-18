"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Library,
  FileText,
  BookOpen,
  Brain,
  BarChart3,
  Users,
  Settings,
} from "lucide-react";

const menu = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Digital Library", href: "/library", icon: Library },
  { name: "Lesson Planner", href: "/lesson-planner", icon: FileText },
  { name: "Question Papers", href: "/question-paper", icon: BookOpen },
  { name: "AI Teacher", href: "/ai-teacher", icon: Brain },
  { name: "Students", href: "/students", icon: Users },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-72 h-screen bg-slate-900 text-white fixed left-0 top-0 p-6">

      <h1 className="text-3xl font-bold text-indigo-400 mb-10">
        TeacherMate
      </h1>

      <nav className="space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                pathname === item.href
                  ? "bg-indigo-600"
                  : "hover:bg-slate-800"
              }`}
            >
              <Icon size={20} />
              {item.name}
            </Link>
          );
        })}
      </nav>

    </aside>
  );
}