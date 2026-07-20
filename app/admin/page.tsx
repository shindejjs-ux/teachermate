"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  School,
  GraduationCap,
  BookOpen,
  FileText,
  FolderOpen,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    classes: 0,
    subjects: 0,
    books: 0,
    chapters: 0,
    resources: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);

    const [
      classes,
      subjects,
      books,
      chapters,
      resources,
    ] = await Promise.all([
      supabase.from("classes").select("*", { count: "exact", head: true }),
      supabase.from("subjects").select("*", { count: "exact", head: true }),
      supabase.from("books").select("*", { count: "exact", head: true }),
      supabase.from("chapters").select("*", { count: "exact", head: true }),
      supabase.from("resources").select("*", { count: "exact", head: true }),
    ]);

    setStats({
      classes: classes.count || 0,
      subjects: subjects.count || 0,
      books: books.count || 0,
      chapters: chapters.count || 0,
      resources: resources.count || 0,
    });

    setLoading(false);
  }

  const cards = [
    {
      title: "Classes",
      value: stats.classes,
      icon: School,
      color: "bg-blue-600",
      href: "/admin/classes",
    },
    {
      title: "Subjects",
      value: stats.subjects,
      icon: GraduationCap,
      color: "bg-green-600",
      href: "/admin/subjects",
    },
    {
      title: "Books",
      value: stats.books,
      icon: BookOpen,
      color: "bg-purple-600",
      href: "/admin/books",
    },
    {
      title: "Chapters",
      value: stats.chapters,
      icon: FileText,
      color: "bg-orange-600",
      href: "/admin/chapters",
    },
    {
      title: "Resources",
      value: stats.resources,
      icon: FolderOpen,
      color: "bg-red-600",
      href: "/admin/resources",
    },
    {
  title: "Analytics",
  icon: "📊",
  href: "/admin/analytics",
  color: "bg-cyan-600",
  description: "Dashboard Statistics",
},
{
  title: "Timetable",
  icon: "📅",
  href: "/admin/timetable",
  color: "bg-blue-700",
  description: "Manage School Timetable",
},
  ];

  return (
    <div className="space-y-8">

      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 rounded-3xl text-white p-8">
        <h1 className="text-4xl font-bold">
          TeacherMate Dashboard
        </h1>

        <p className="mt-2 opacity-90">
          Welcome to your AI Powered CBSE Platform
        </p>
      </div>

      {loading ? (
        <div className="text-center text-xl font-semibold">
          Loading Dashboard...
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;

            return (
              <Link key={card.title} href={card.href}>
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition p-6">

                  <div className="flex justify-between items-center">

                    <div>

                      <p className="text-gray-500">
                        {card.title}
                      </p>

                      <h2 className="text-4xl font-bold mt-2">
                        {card.value}
                      </h2>

                    </div>

                    <div
                      className={`${card.color} w-16 h-16 rounded-2xl flex items-center justify-center`}
                    >
                      <Icon className="text-white" size={30} />
                    </div>

                  </div>

                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}