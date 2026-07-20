"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Chapter = {
  id: number;
  chapter_no: number;
  title: string;
};

export default function BookPage() {
  const params = useParams();
  const router = useRouter();

  const classId = Number(params.class);
  const subjectId = Number(params.subject);
  const bookId = Number(params.book);

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [filteredChapters, setFilteredChapters] = useState<Chapter[]>([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (bookId) {
      loadChapters();
    }
  }, [bookId]);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredChapters(chapters);
      return;
    }

    setFilteredChapters(
      chapters.filter((chapter) =>
        chapter.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, chapters]);

  async function loadChapters() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("chapters")
      .select("id,chapter_no,title")
      .eq("book_id", bookId)
      .order("chapter_no");

    if (error) {
      console.error(error);
      setError("Unable to load chapters.");
      setLoading(false);
      return;
    }

    setChapters(data || []);
    setFilteredChapters(data || []);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-indigo-700 text-white p-8 shadow">

        <button
          onClick={() => router.back()}
          className="mb-4 bg-white text-indigo-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-bold">
          📖 Chapters
        </h1>

        <p className="text-indigo-100 mt-2">
          Select a chapter to view resources.
        </p>

      </div>

      <div className="p-8">

        <input
          type="text"
          placeholder="Search Chapter..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 mb-8 rounded-lg border p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {loading && (
          <div className="text-center text-lg font-semibold text-indigo-700">
            Loading Chapters...
          </div>
        )}

        {!loading && error && (
          <div className="bg-red-100 border border-red-300 rounded-xl p-6">

            <p className="text-red-700">{error}</p>

            <button
              onClick={loadChapters}
              className="mt-4 bg-red-600 text-white px-5 py-2 rounded-lg"
            >
              Retry
            </button>

          </div>
        )}

        {!loading && !error && filteredChapters.length === 0 && (
          <div className="bg-white rounded-xl shadow p-10 text-center">

            <h2 className="text-2xl font-bold">
              No Chapters Available
            </h2>

            <p className="text-gray-500 mt-2">
              Chapters will be added soon.
            </p>

          </div>
        )}

        {!loading && !error && filteredChapters.length > 0 && (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredChapters.map((chapter) => (

              <Link
                key={chapter.id}
                href={`/digital-library/${classId}/${subjectId}/${bookId}/${chapter.id}`}
              >
                <div className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer">

                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Chapter {chapter.chapter_no}
                    </span>

                    <span className="text-3xl">📄</span>
                  </div>

                  <h2 className="text-lg font-bold text-gray-800">
                    {chapter.title}
                  </h2>

                  <p className="text-gray-500 mt-3">
                    View Resources →
                  </p>

                </div>
              </Link>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}