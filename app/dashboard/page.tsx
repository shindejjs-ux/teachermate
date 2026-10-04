"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

  const [name, setName] = useState("Teacher");
  const [role, setRole] = useState("teacher");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      const { data } = await supabase.auth.getUser();

      setName(data.user?.user_metadata?.full_name || data.user?.email?.split("@")[0] || "Teacher");
      setRole(data.user?.user_metadata?.role || "teacher");

      const results = await Promise.all([
        supabase.from("classes").select("*", { count: "exact", head: true }),
        supabase.from("subjects").select("*", { count: "exact", head: true }),
        supabase.from("books").select("*", { count: "exact", head: true }),
        supabase.from("chapters").select("*", { count: "exact", head: true }),
        supabase.from("resources").select("*", { count: "exact", head: true }),
      ]);

      setStats({
        classes: results[0].count || 0,
        subjects: results[1].count || 0,
        books: results[2].count || 0,
        chapters: results[3].count || 0,
        resources: results[4].count || 0,
      });

      setLoading(false);
    }

    loadDashboard();
  }, []);

  const cards = [
    { title: "Classes", value: stats.classes },
    { title: "Subjects", value: stats.subjects },
    { title: "Books", value: stats.books },
    { title: "Chapters", value: stats.chapters },
    { title: "Resources", value: stats.resources },
  ];

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">Teacher Workspace</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Welcome, {name}
        </h1>
        <p className="mt-2 text-slate-500">
          Your CBSE teaching workspace is ready.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => (
          <div key={card.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">{card.title}</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {loading ? "—" : card.value}
            </p>
          </div>
        ))}
      </section>

      <section className="grid gap-5 md:grid-cols-3">
        <Link href="/digital-library" className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
          <p className="font-semibold text-slate-900">Digital Library</p>
          <p className="mt-2 text-sm text-slate-500">Browse books, chapters and teaching resources.</p>
        </Link>

        <Link href="/teacher" className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
          <p className="font-semibold text-slate-900">Teaching Workspace</p>
          <p className="mt-2 text-sm text-slate-500">Build lesson plans, worksheets and assessments.</p>
        </Link>

        {(role === "school_admin" || role === "super_admin") && (
          <Link href="/admin" className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg">
            <p className="font-semibold text-slate-900">Administration</p>
            <p className="mt-2 text-sm text-slate-500">Manage your school's TeacherMate resources.</p>
          </Link>
        )}
      </section>
    </div>
  );
}
