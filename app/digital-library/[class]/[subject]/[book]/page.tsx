import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export default async function BookPage({
  params,
}: {
  params: {
    class: string;
    subject: string;
    book: string;
  };
}) {
  
  const supabase = await createClient();

  const classId = Number(params.class);
  const subjectId = Number(params.subject);
  const bookId = Number(params.book);
const { data: firstChapter } = await supabase
  .from("chapters")
  .select("*")
  .eq("book_id", bookId)
  .order("chapter_no")
  .limit(1)
  .single();
  // Book Details
  const { data: book } = await supabase
    .from("books")
    .select("*")
    .eq("id", bookId)
    .single();

  // Chapters
  const { data: chapters } = await supabase
    .from("chapters")
    .select("*")
    .eq("book_id", bookId)
    .order("chapter_no");

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <div className="bg-gradient-to-r from-indigo-700 to-blue-700 text-white py-12">

        <div className="max-w-7xl mx-auto px-8">

          {firstChapter && (
  <Link
    href={`/digital-library/${classId}/${subjectId}/${bookId}/${firstChapter.id}`}
    className="inline-block mt-6 bg-white text-indigo-700 px-6 py-3 rounded-xl font-semibold hover:bg-slate-100"
  >
    📖 Start Reading
  </Link>
)}

          <p className="mt-3 text-xl text-indigo-100">
            {book?.publisher}
          </p>

          <div className="flex gap-4 mt-6">

            <span className="bg-white/20 rounded-full px-4 py-2">
              {book?.book_type}
            </span>

            <span className="bg-white/20 rounded-full px-4 py-2">
              {chapters?.length || 0} Chapters
            </span>

          </div>

        </div>

      </div>

      {/* Chapters */}

      <div className="max-w-7xl mx-auto p-8">

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

          {chapters?.map((chapter) => (

            <Link
              key={chapter.id}
              href={`/digital-library/${classId}/${subjectId}/${bookId}/${chapter.id}`}
            >

              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition p-6">

                <div className="flex justify-between items-center">

                  <div>

                    <p className="text-sm text-slate-500">
                      Chapter {chapter.chapter_no}
                    </p>

                    <h2 className="text-xl font-bold mt-2">
                      {chapter.title}
                    </h2>

                  </div>

                  <div className="text-5xl">
                    📖
                  </div>

                </div>

                <div className="grid grid-cols-2 gap-3 mt-8">

                  <div className="bg-blue-50 rounded-lg p-3 text-center">
                    📘
                    <p className="text-sm mt-2">
                      PDF
                    </p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-3 text-center">
                    📝
                    <p className="text-sm mt-2">
                      Worksheet
                    </p>
                  </div>

                  <div className="bg-yellow-50 rounded-lg p-3 text-center">
                    📒
                    <p className="text-sm mt-2">
                      Notes
                    </p>
                  </div>

                  <div className="bg-pink-50 rounded-lg p-3 text-center">
                    ❓
                    <p className="text-sm mt-2">
                      Question Bank
                    </p>
                  </div>

                </div>

                <button className="w-full mt-8 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white py-3 font-semibold">
                  Open Chapter →
                </button>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </div>
  );
}