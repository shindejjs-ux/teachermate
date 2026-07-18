"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function SubjectPage() {
  const params = useParams();

  const classId = params.class as string;
  const subjectId = Number(params.subject);

  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("subject_id", subjectId)
      .order("id");

    if (error) {
      console.error(error);
      return;
    }

    setBooks(data || []);
  }

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold mb-8">
        Books
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {books.map((book) => (

          <Link
            key={book.id}
            href={`/digital-library/${classId}/${subjectId}/${book.id}`}
          >

            <div className="bg-white shadow-lg rounded-xl p-6 hover:scale-105 transition">

              <h2 className="text-xl font-bold">
                {book.title}
              </h2>

              <p className="text-gray-500 mt-2">
                View Chapters
              </p>

            </div>

          </Link>

        ))}

      </div>

    </div>
  );
}