"use client";

import Link from "next/link";
import { FolderOpen, FileText, BookOpen, ClipboardList } from "lucide-react";

const resources = [
  {
    title: "Lesson Plans",
    description: "View all saved lesson plans",
    icon: FileText,
    href: "/my-lesson-plans",
    color: "bg-green-500",
  },
  {
    title: "Worksheets",
    description: "View generated worksheets",
    icon: ClipboardList,
    href: "/worksheets",
    color: "bg-blue-500",
  },
  {
    title: "Question Papers",
    description: "View generated question papers",
    icon: BookOpen,
    href: "/question-paper",
    color: "bg-purple-500",
  },
  {
    title: "digital library",
    description: "Open library resources",
    icon: FolderOpen,
    href: "/digital-library",
    color: "bg-orange-500",
  },
];

export default function MyResourcesPage() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          📂 My Resources
        </h1>

        <p className="text-slate-500 mt-2">
          Manage all your teaching resources in one place.
        </p>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {resources.map((item) => {
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

              <p className="text-gray-500 mt-2">
                {item.description}
              </p>
            </Link>
          );
        })}
      </div>

    </div>
  );
}