import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

type ClassRecord = {
  id: number;
  name?: string | null;
  class_name?: string | null;
  board_id?: number | null;
};

type BookRecord = {
  id: number;
  class_id?: number | null;
  board_id?: number | null;
};

export default async function DigitalLibraryHome() {
  const supabase = await createClient();

  // Books are the source of truth for the public library because the
  // book/PDF routes are already working in production.
  const [{ data: classData }, { data: bookData, error: booksError }] =
    await Promise.all([
      supabase.from("classes").select("*"),
      supabase.from("books").select("id,class_id,board_id").order("id"),
    ]);

  const classRows = (classData ?? []) as ClassRecord[];
  const books = (bookData ?? []) as BookRecord[];

  const classIds = Array.from(
    new Set(
      books
        .filter((book) => book.board_id == null || Number(book.board_id) === 1)
        .map((book) => Number(book.class_id))
        .filter((id) => Number.isFinite(id))
    )
  );

  const classes = classIds
    .map((id) => {
      const row = classRows.find((cls) => Number(cls.id) === id);
      return {
        id,
        name:
          row?.class_name ??
          row?.name ??
          `Class ${id}`,
      };
    })
    .sort((a, b) => {
      const numberA = Number(a.name.match(/\d+/)?.[0] ?? 999);
      const numberB = Number(b.name.match(/\d+/)?.[0] ?? 999);
      return numberA - numberB || a.id - b.id;
    });

  const [{ count: chapters }, { count: resources }] = await Promise.all([
    supabase.from("chapters").select("*", { count: "exact", head: true }),
    supabase.from("resources").select("*", { count: "exact", head: true }),
  ]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-linear-to-r from-indigo-700 to-blue-700 text-white">
        <div className="mx-auto max-w-7xl px-8 py-12">
          <h1 className="text-5xl font-bold">📚 TeacherMate Digital Library</h1>
          <p className="mt-4 text-xl text-indigo-100">
            NCERT • Reference Books • Notes • Worksheets • Question Banks
          </p>
        </div>
      </div>

      <div className="mx-auto -mt-8 grid max-w-7xl gap-6 px-8 md:grid-cols-4">
        {[
          ["📘", books.length, "Books"],
          ["📖", chapters ?? 0, "Chapters"],
          ["📂", resources ?? 0, "Resources"],
          ["🎓", classes.length, "CBSE Classes"],
        ].map(([icon, value, label]) => (
          <div key={String(label)} className="rounded-2xl bg-white p-6 text-center shadow">
            <div className="text-5xl">{icon}</div>
            <h2 className="mt-3 text-3xl font-bold">{value}</h2>
            <p className="text-slate-500">{label}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-8 py-12">
        <h2 className="text-3xl font-bold text-slate-800">Select Class</h2>
        <p className="mt-2 text-slate-500">CBSE Digital Learning Library</p>

        {booksError ? (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-8 shadow">
            <h2 className="text-2xl font-bold text-red-700">Library Database Error</h2>
            <p className="mt-3 text-red-600">{booksError.message}</p>
          </div>
        ) : classes.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-white p-12 text-center shadow-lg">
            <div className="text-7xl">🎓</div>
            <h2 className="mt-6 text-3xl font-bold text-slate-800">
              No Classes Found
            </h2>
            <p className="mt-3 text-slate-500">
              No books with a valid class_id were returned from Supabase.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {classes.map((cls) => (
              <Link key={cls.id} href={`/digital-library/${cls.id}`} className="group">
                <div className="rounded-3xl bg-white p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="mb-5 text-6xl">🎓</div>
                  <div className="text-sm font-semibold uppercase tracking-wider text-indigo-500">
                    CBSE
                  </div>
                  <h3 className="mt-2 text-3xl font-bold text-slate-800">{cls.name}</h3>
                  <div className="mt-8 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white">
                    Open Library →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
