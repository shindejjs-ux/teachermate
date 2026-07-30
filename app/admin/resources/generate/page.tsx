"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

export default function GenerateResourcesPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [bookId, setBookId] = useState("");
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

  async function generateResources() {
    if (!bookId) return;

    setLoading(true);

    const { data: chapters } = await supabase
      .from("chapters")
      .select("*")
      .eq("book_id", Number(bookId))
      .order("chapter_no");

    if (!chapters) {
      setLoading(false);
      return;
    }

    const resources: any[] = [];

    chapters.forEach((chapter: any) => {

      resources.push({
        chapter_id: chapter.id,
        title: `${chapter.title} PDF`,
        resource_type: "chapter_pdf",
        file_url: "",
      });

      resources.push({
        chapter_id: chapter.id,
        title: `${chapter.title} Notes`,
        resource_type: "notes",
        file_url: "",
      });

      resources.push({
        chapter_id: chapter.id,
        title: `${chapter.title} Worksheet`,
        resource_type: "worksheet",
        file_url: "",
      });

      resources.push({
        chapter_id: chapter.id,
        title: `${chapter.title} PPT`,
        resource_type: "ppt",
        file_url: "",
      });

      resources.push({
        chapter_id: chapter.id,
        title: `${chapter.title} Question Bank`,
        resource_type: "question_bank",
        file_url: "",
      });

      resources.push({
        chapter_id: chapter.id,
        title: `${chapter.title} Assignment`,
        resource_type: "assignment",
        file_url: "",
      });

    });

    const { error } = await supabase
      .from("resources")
      .insert(resources);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert(`${resources.length} Resources Created`);
  }

  return (
    <div className="max-w-5xl mx-auto p-10">

      <h1 className="text-4xl font-bold mb-8">
        ⚡ Auto Resource Generator
      </h1>

      <div className="bg-white rounded-2xl shadow p-8">

        <select
          className="w-full border rounded-xl p-3"
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
        >
          <option value="">Select Book</option>

          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.title}
            </option>
          ))}

        </select>

        <button
          onClick={generateResources}
          disabled={loading}
          className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl"
        >
          {loading
            ? "Generating..."
            : "Generate All Resources"}
        </button>

      </div>

    </div>
  );
}