"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-browser";

export default function NewChapterPage() {
  const router = useRouter();

  const [books, setBooks] = useState<any[]>([]);
  const [bookId, setBookId] = useState("");
  const [chapters, setChapters] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    const { data } = await supabase
      .from("books")
      .select("id,title")
      .order("title");

    setBooks(data || []);
  }

  async function createChapters() {
    if (!bookId || !chapters) return;

    setLoading(true);

    const lines = chapters
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);

    const data = lines.map((title, index) => ({
      book_id: Number(bookId),
      chapter_no: index + 1,
      title,
    }));

    const { error } = await supabase
      .from("chapters")
      .insert(data);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert(`${data.length} Chapters Created`);

    router.push("/admin/chapters");
  }

  return (
    <div className="max-w-5xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-8">
        📖 Bulk Create Chapters
      </h1>

      <div className="bg-white rounded-2xl shadow p-8">

        <select
          className="w-full border rounded-xl p-3 mb-6"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
        >
          <option value="">Select Book</option>

          {books.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title}
            </option>
          ))}

        </select>

        <textarea
          rows={18}
          className="w-full border rounded-xl p-4"
          placeholder={`One chapter per line

Chapter 1
Chapter 2
Chapter 3`}
          value={chapters}
          onChange={(e) => setChapters(e.target.value)}
        />

        <button
          onClick={createChapters}
          disabled={loading}
          className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl"
        >
          {loading ? "Creating..." : "Create Chapters"}
        </button>

      </div>

    </div>
  );
}