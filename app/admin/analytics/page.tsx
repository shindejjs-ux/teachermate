"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Stats = {
  classes: number;
  subjects: number;
  books: number;
  chapters: number;
  resources: number;
  students: number;
  homework: number;
  attendance: number;
};

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<Stats>({
    classes: 0,
    subjects: 0,
    books: 0,
    chapters: 0,
    resources: 0,
    students: 0,
    homework: 0,
    attendance: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function getCount(table: string) {
    try {
      const { count, error } = await supabase
        .from(table)
        .select("*", {
          count: "exact",
          head: true,
        });

      if (error) {
        console.log(table, error.message);
        return 0;
      }

      return count ?? 0;
    } catch {
      return 0;
    }
  }

  async function loadStats() {
    setLoading(true);

    const [
      classes,
      subjects,
      books,
      chapters,
      resources,
      students,
      homework,
      attendance,
    ] = await Promise.all([
      getCount("classes"),
      getCount("subjects"),
      getCount("books"),
      getCount("chapters"),
      getCount("resources"),
      getCount("students"),
      getCount("homework"),
      getCount("attendance"),
    ]);

    setStats({
      classes,
      subjects,
      books,
      chapters,
      resources,
      students,
      homework,
      attendance,
    });

    setLoading(false);
  }

  const cards = [
    {
      title: "Classes",
      value: stats.classes,
      color: "bg-blue-600",
      icon: "🏫",
    },
    {
      title: "Subjects",
      value: stats.subjects,
      color: "bg-green-600",
      icon: "📚",
    },
    {
      title: "Books",
      value: stats.books,
      color: "bg-purple-600",
      icon: "📖",
    },
    {
      title: "Chapters",
      value: stats.chapters,
      color: "bg-orange-600",
      icon: "📄",
    },
    {
      title: "Resources",
      value: stats.resources,
      color: "bg-indigo-600",
      icon: "📁",
    },
    {
      title: "Students",
      value: stats.students,
      color: "bg-pink-600",
      icon: "👨‍🎓",
    },
    {
      title: "Homework",
      value: stats.homework,
      color: "bg-yellow-600",
      icon: "📝",
    },
    {
      title: "Attendance",
      value: stats.attendance,
      color: "bg-red-600",
      icon: "📅",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="bg-indigo-700 text-white p-8 shadow">

        <h1 className="text-4xl font-bold">
          📊 Analytics Dashboard
        </h1>

        <p className="text-indigo-100 mt-2">
          Welcome to TeacherMate Analytics
        </p>

        <p className="mt-1 text-sm">
          {new Date().toLocaleDateString()}
        </p>

      </div>

      <div className="max-w-7xl mx-auto p-8">

        <div className="flex justify-end mb-6">

          <button
            onClick={loadStats}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg"
          >
            🔄 Refresh
          </button>

        </div>

        {loading ? (

          <div className="bg-white rounded-xl shadow p-20 text-center">

            <h2 className="text-2xl font-bold text-indigo-600">
              Loading Analytics...
            </h2>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {cards.map((card) => (

              <div
                key={card.title}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6"
              >

                <div
                  className={`${card.color} w-16 h-16 rounded-xl flex items-center justify-center text-3xl text-white`}
                >
                  {card.icon}
                </div>

                <h2 className="text-4xl font-bold mt-5">
                  {card.value}
                </h2>

                <p className="text-gray-600 mt-2 font-medium">
                  {card.title}
                </p>

              </div>

            ))}

          </div>

        )}

        <div className="mt-10 flex gap-4">

          <Link
            href="/admin"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
          >
            ← Admin Dashboard
          </Link>

          <Link
            href="/"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Home
          </Link>

        </div>

      </div>

    </div>
  );
}