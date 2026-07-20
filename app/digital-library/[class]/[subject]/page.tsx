"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Book = {
  id: number;
  title: string;
};

export default function SubjectPage() {
  const params = useParams();
  const router = useRouter();

  const classId = Number(params.class);
  const subjectId = Number(params.subject);

  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
  if (classId && subjectId) {
    loadBooks();
  }
}, [classId, subjectId]);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredBooks(books);
      return;
    }

    setFilteredBooks(
      books.filter((book) =>
        book.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, books]);

  async function loadBooks() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("books")
      .select("id,title")
      .eq("subject_id", subjectId)
      .order("id");

    if (error) {
      console.error(error);
      setError("Unable to load books.");
      setLoading(false);
      return;
    }

    setBooks(data || []);
    setFilteredBooks(data || []);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="bg-indigo-700 text-white p-8 shadow">

        <button
          onClick={() => router.back()}
          className="mb-4 bg-white text-indigo-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-bold">
          📘 Books
        </h1>

        <p className="text-indigo-100 mt-2">
          Select a book to view its chapters.
        </p>

      </div>

      <div className="p-8">

        <input
          type="text"
          placeholder="Search Book..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 mb-8 rounded-lg border p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {loading && (
          <div className="text-center text-lg font-semibold text-indigo-700">
            Loading Books...
          </div>
        )}

        {!loading && error && (
          <div className="bg-red-100 border border-red-300 rounded-xl p-6">

            <p className="text-red-700">{error}</p>

            <button
              onClick={loadBooks}
              className="mt-4 bg-red-600 text-white px-5 py-2 rounded-lg"
            >
              Retry
            </button>

          </div>
        )}

        {!loading && !error && filteredBooks.length === 0 && (
          <div className="bg-white rounded-xl shadow p-10 text-center">

            <h2 className="text-2xl font-bold">
              No Books Available
            </h2>

            <p className="text-gray-500 mt-2">
              Books will be added soon.
            </p>

          </div>
        )}

        {!loading && !error && filteredBooks.length > 0 && (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredBooks.map((book) => (

              <Link
                key={book.id}
                href={`/digital-library/${classId}/${subjectId}/${book.id}`}
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer">

                  <div className="text-6xl text-center mb-5">
                    📘
                  </div>

                  <h2 className="text-xl font-bold text-center text-gray-800">
                    {book.title}
                  </h2>

                  <p className="text-center text-gray-500 mt-3">
                    View Chapters →
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