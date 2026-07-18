"use client";

import Link from "next/link";
import {
  School,
  GraduationCap,
  BookOpen,
  Library,
  FileText,
  Users,
  FolderOpen,
  UserCog,
} from "lucide-react";

const modules = [
  {
    title: "Boards",
    href: "/admin/boards",
    icon: School,
    color: "bg-blue-600",
  },
  {
    title: "Classes",
    href: "/admin/classes",
    icon: GraduationCap,
    color: "bg-green-600",
  },
  {
    title: "Subjects",
    href: "/admin/subjects",
    icon: BookOpen,
    color: "bg-purple-600",
  },
  {
    title: "Books",
    href: "/admin/books",
    icon: Library,
    color: "bg-pink-600",
  },
  {
    title: "Chapters",
    href: "/admin/chapters",
    icon: FileText,
    color: "bg-orange-600",
  },
  {
    title: "Resources",
    href: "/admin/resources",
    icon: FolderOpen,
    color: "bg-cyan-600",
  },
  {
    title: "Teachers",
    href: "/admin/teachers",
    icon: UserCog,
    color: "bg-red-600",
  },
  {
    title: "Students",
    href: "/admin/students",
    icon: Users,
    color: "bg-indigo-600",
  },
];

export default function AdminPage() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          ⚙️ TeacherMate Admin Panel
        </h1>

        <p className="text-slate-500 mt-2">
          Manage all TeacherMate data from one place.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        {modules.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.title}
              href={item.href}
              className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6"
            >
              <div
                className={`${item.color} w-14 h-14 rounded-xl flex items-center justify-center text-white mb-4`}
              >
                <Icon size={28} />
              </div>

              <h2 className="text-xl font-bold">
                {item.title}
              </h2>

            </Link>
          );
        })}

      </div>

    </div>
  );
}