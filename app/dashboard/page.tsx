"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

type Stats = {
  classes: number;
  subjects: number;
  books: number;
  chapters: number;
  resources: number;
};

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    classes: 0,
    subjects: 0,
    books: 0,
    chapters: 0,
    resources: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  async function loadStats() {
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
  }

  const cards = [
    { title: "Classes", value: stats.classes, icon: "🏫" },
    { title: "Subjects", value: stats.subjects, icon: "📘" },
    { title: "Books", value: stats.books, icon: "📚" },
    { title: "Chapters", value: stats.chapters, icon: "📖" },
    { title: "Resources", value: stats.resources, icon: "📂" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold">TeacherMate Dashboard</h1>

      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
        {cards.map((card) => (
          <div
            key={card.title}
            className="bg-white rounded-xl shadow p-6 text-center"
          >
            <div className="text-5xl">{card.icon}</div>
            <div className="text-3xl font-bold mt-3">{card.value}</div>
            <div className="text-gray-500 mt-2">{card.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}