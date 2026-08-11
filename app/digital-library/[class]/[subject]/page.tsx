import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

type PageProps = {
  params: Promise<{
    class: string;
    subject: string;
  }>;
};

export default async function SubjectPage({ params }: PageProps) {
  const supabase = await createClient();

  const resolvedParams = await params;

  const classId = Number(resolvedParams.class);
  const subjectId = Number(resolvedParams.subject);

  const { data: subject, error: subjectError } = await supabase
    .from("subjects")
    .select("*")
    .eq("id", subjectId)
    .eq("class_id", classId)
    .maybeSingle();

  const { data: books, error: booksError } = await supabase
    .from("books")
    .select("*")
    .eq("class_id", classId)
    .eq("subject_id", subjectId)
    .order("title");

  if (subjectError) {
    console.error("Subject loading error:", subjectError);
  }

  if (booksError) {
    console.error("Books loading error:", booksError);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-gradient-to-r from-indigo-700 to-blue-700 text-white">
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-8">
          <Link
            href={`/digital-library/${classId}`}
            className="inline-block rounded-lg bg-white/20 px-5 py-2 hover:bg-white/30"
          >
            ← Back
          </Link>

          <h1 className="mt-8 text-4xl font-bold md:text-5xl">
            {subject?.name ?? subject?.subject_name ?? "Subject"}
          </h1>

          <p className="mt-3 text-xl text-indigo-100">
            Digital Library
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2">
            <span>📚</span>
            <span>{books?.length ?? 0} Books Available</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
        {books && books.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {books.map((book) => (
              <Link
                key={book.id}
                href={`/digital-library/${classId}/${subjectId}/${book.id}`}
              >
                <div className="overflow-hidden rounded-3xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                  <div className="flex h-80 items-center justify-center bg-slate-100">
                    <div className="text-8xl">📚</div>
                  </div>

                  <div className="p-6">
                    <h2 className="line-clamp-2 text-xl font-bold text-slate-800">
                      {book.title ?? "Book"}
                    </h2>

                    <p className="mt-2 text-slate-500">
                      {book.publisher || "Publisher"}
                    </p>

                    <div className="mt-5 flex items-center justify-between gap-3">
                      <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700">
                        {book.book_type || "Textbook"}
                      </span>

                      <span className="text-sm text-slate-500">
                        {book.language || "English"}
                      </span>
                    </div>

                    <div className="mt-6 w-full rounded-xl bg-indigo-600 py-3 text-center font-semibold text-white transition hover:bg-indigo-700">
                      Open Book →
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl bg-white p-12 text-center shadow-lg">
            <div className="mb-6 text-7xl">📚</div>

            <h2 className="text-3xl font-bold text-slate-800">
              No Books Found
            </h2>

            <p className="mt-4 text-slate-500">
              Please add books from the Admin Panel.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}