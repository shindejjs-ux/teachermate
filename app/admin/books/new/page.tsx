"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-browser";

export default function NewBookPage() {
  const router = useRouter();

  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    class_id: "",
    subject_id: "",
    title: "",
    publisher: "",
    author: "",
    book_type: "Textbook",
    language: "English",
    cover_image: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data: cls } = await supabase
      .from("classes")
      .select("*")
      .order("id");

    const { data: sub } = await supabase
      .from("subjects")
      .select("*")
      .order("subject_name");

    setClasses(cls || []);
    setSubjects(sub || []);
  }

  async function saveBook(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase
      .from("books")
      .insert([
        {
          class_id: Number(form.class_id),
          subject_id: Number(form.subject_id),
          title: form.title,
          publisher: form.publisher,
          author: form.author,
          book_type: form.book_type,
          language: form.language,
          cover_image: form.cover_image,
        },
      ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Book Added Successfully");

    router.push("/admin/books");
  }

  return (
    <div className="max-w-4xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-8">
        📚 Add New Book
      </h1>

      <form
        onSubmit={saveBook}
        className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
      >

        <div className="grid md:grid-cols-2 gap-6">

          <div>

            <label className="font-semibold">
              Class
            </label>

            <select
              className="w-full border rounded-lg p-3 mt-2"
              value={form.class_id}
              onChange={(e) =>
                setForm({ ...form, class_id: e.target.value })
              }
            >
              <option value="">Select</option>

              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.class_name}
                </option>
              ))}

            </select>

          </div>

          <div>

            <label className="font-semibold">
              Subject
            </label>

            <select
              className="w-full border rounded-lg p-3 mt-2"
              value={form.subject_id}
              onChange={(e) =>
                setForm({ ...form, subject_id: e.target.value })
              }
            >
              <option value="">Select</option>

              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.subject_name}
                </option>
              ))}

            </select>

          </div>

        </div>

        <input
          className="w-full border rounded-lg p-3"
          placeholder="Book Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          className="w-full border rounded-lg p-3"
          placeholder="Publisher"
          value={form.publisher}
          onChange={(e) =>
            setForm({ ...form, publisher: e.target.value })
          }
        />

        <input
          className="w-full border rounded-lg p-3"
          placeholder="Author"
          value={form.author}
          onChange={(e) =>
            setForm({ ...form, author: e.target.value })
          }
        />

        <div className="grid md:grid-cols-2 gap-6">

          <select
            className="border rounded-lg p-3"
            value={form.book_type}
            onChange={(e) =>
              setForm({ ...form, book_type: e.target.value })
            }
          >
            <option>Textbook</option>
            <option>Reference</option>
            <option>Question Bank</option>
            <option>Exemplar</option>
          </select>

          <select
            className="border rounded-lg p-3"
            value={form.language}
            onChange={(e) =>
              setForm({ ...form, language: e.target.value })
            }
          >
            <option>English</option>
            <option>Hindi</option>
          </select>

        </div>

        <input
          className="w-full border rounded-lg p-3"
          placeholder="Cover Image (example: rd-sharma.jpg)"
          value={form.cover_image}
          onChange={(e) =>
            setForm({ ...form, cover_image: e.target.value })
          }
        />

        <button
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl"
        >
          {loading ? "Saving..." : "Save Book"}
        </button>

      </form>

    </div>
  );
}