import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export default async function SubjectPage({
  params,
}: {
  params: {
    class: string;
    subject: string;
  };
}) {
  const supabase = await createClient();

  const classId = Number(params.class);
  const subjectId = Number(params.subject);

  const { data: subject } = await supabase
    .from("subjects")
    .select("*")
    .eq("id", subjectId)
    .single();

  const { data: books } = await supabase
    .from("books")
    .select("*")
    .eq("class_id", classId)
    .eq("subject_id", subjectId)
    .order("title");

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Header */}

      <div className="bg-gradient-to-r from-indigo-700 to-blue-700 text-white">

        <div className="max-w-7xl mx-auto px-8 py-10">

          <Link
            href={`/digital-library/${classId}`}
            className="inline-block bg-white/20 hover:bg-white/30 px-5 py-2 rounded-lg mb-6"
          >
            ← Back
          </Link>

          <h1 className="text-5xl font-bold">
            {subject?.subject_name}
          </h1>

          <p className="text-xl mt-3 text-indigo-100">
            Digital Library
          </p>

          <div className="mt-6 inline-flex items-center gap-2 bg-white/20 px-5 py-2 rounded-full">
            📚
            <span>{books?.length || 0} Books Available</span>
          </div>

        </div>

      </div>

      {/* Books */}

      <div className="max-w-7xl mx-auto px-8 py-12">

        {books && books.length > 0 ? (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

            {books.map((book) => (

              <Link
                key={book.id}
                href={`/digital-library/${classId}/${subjectId}/${book.id}`}
              >
                <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">

                  <div className="h-80 bg-slate-100 flex items-center justify-center">

                    <Image
                      src={`/covers/class${classId}/${book.cover_image || "default.jpg"}`}
                      alt={book.title}
                      width={190}
                      height={260}
                      className="object-contain"
                    />

                  </div>

                  <div className="p-6">

                    <h2 className="text-xl font-bold line-clamp-2">
                      {book.title}
                    </h2>

                    <p className="text-slate-500 mt-2">
                      {book.publisher || "Publisher"}
                    </p>

                    <div className="flex justify-between items-center mt-5">

                      <span className="bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 text-sm">
                        {book.book_type || "Textbook"}
                      </span>

                      <span className="text-sm text-slate-500">
                        {book.language || "English"}
                      </span>

                    </div>

                    <button className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 font-semibold transition">
                      📖 Open Book
                    </button>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        ) : (

          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">

            <div className="text-7xl mb-6">
              📚
            </div>

            <h2 className="text-3xl font-bold">
              No Books Found
            </h2>

            <p className="text-slate-500 mt-4">
              Please add books from the Admin Panel.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}