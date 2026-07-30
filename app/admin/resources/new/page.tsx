"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-browser";

export default function AddResourcePage() {
  const router = useRouter();

  const [chapters, setChapters] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    chapter_id: "",
    title: "",
    resource_type: "chapter_pdf",
    file_url: "",
  });

  useEffect(() => {
    loadChapters();
  }, []);

  async function loadChapters() {
    const { data } = await supabase
      .from("chapters")
      .select("id,title")
      .order("id");

    setChapters(data || []);
  }

  async function saveResource(e: React.FormEvent) {
    e.preventDefault();

    setSaving(true);

    const { error } = await supabase
      .from("resources")
      .insert([
        {
          chapter_id: Number(form.chapter_id),
          title: form.title,
          resource_type: form.resource_type,
          file_url: form.file_url,
        },
      ]);

    setSaving(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Resource Added Successfully");

    router.push("/admin/resources");
  }

  return (
    <div className="max-w-4xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-8">
        📂 Add Resource
      </h1>

      <form
        onSubmit={saveResource}
        className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
      >

        <select
          className="w-full border rounded-lg p-3"
          value={form.chapter_id}
          onChange={(e) =>
            setForm({ ...form, chapter_id: e.target.value })
          }
        >
          <option value="">Select Chapter</option>

          {chapters.map((c) => (
            <option key={c.id} value={c.id}>
              {c.id} - {c.title}
            </option>
          ))}

        </select>

        <input
          className="w-full border rounded-lg p-3"
          placeholder="Resource Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <select
          className="w-full border rounded-lg p-3"
          value={form.resource_type}
          onChange={(e) =>
            setForm({
              ...form,
              resource_type: e.target.value,
            })
          }
        >
          <option value="chapter_pdf">Chapter PDF</option>
          <option value="notes">Notes</option>
          <option value="worksheet">Worksheet</option>
          <option value="ppt">PPT</option>
          <option value="video">Video</option>
          <option value="question_bank">Question Bank</option>
          <option value="assignment">Assignment</option>
        </select>

        <input
          className="w-full border rounded-lg p-3"
          placeholder="/pdfs/class9/ganita-manjari/ch1.pdf"
          value={form.file_url}
          onChange={(e) =>
            setForm({ ...form, file_url: e.target.value })
          }
        />

        <button
          disabled={saving}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl"
        >
          {saving ? "Saving..." : "Save Resource"}
        </button>

      </form>

    </div>
  );
}