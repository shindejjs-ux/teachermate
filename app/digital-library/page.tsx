import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

type ClassRecord = {
  id: number;
  name?: string | null;
  class_name?: string | null;
  board_id?: number | null;
};

export default async function DigitalLibraryHome() {
  const supabase = await createClient();

  const { data: classData, error: classError } = await supabase
    .from("classes")
    .select("*");

  if (classError) {
    console.error("Digital Library class loading error:", classError);
  }

  const classes = ((classData ?? []) as ClassRecord[])
    .filter((cls) => cls.board_id == null || cls.board_id === 1)
    .sort((a, b) => {
      const nameA = a.class_name ?? a.name ?? "";
      const nameB = b.class_name ?? b.name ?? "";
      const numberA = Number(nameA.match(/\d+/)?.[0] ?? 999);
      const numberB = Number(nameB.match(/\d+/)?.[0] ?? 999);
      return numberA - numberB || a.id - b.id;
    });

  const [{ count: books }, { count: chapters }, { count: resources }] =
    await Promise.all([
      supabase.from("books").select("*", { count: "exact", head: true }),
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
          ["📘", books ?? 0, "Books"],
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

        {classes.length === 0 ? (
          <div className="mt-8 rounded-2xl bg-white p-12 text-center shadow-lg">
            <div className="text-7xl">🎓</div>
            <h2 className="mt-6 text-3xl font-bold text-slate-800">
              No CBSE Classes Found
            </h2>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {classes.map((cls) => {
              const className = cls.class_name ?? cls.name ?? `Class ${cls.id}`;
              return (
                <Link key={cls.id} href={`/digital-library/${cls.id}`} className="group">
                  <div className="rounded-3xl bg-white p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <div className="mb-5 text-6xl">🎓</div>
                    <div className="text-sm font-semibold uppercase tracking-wider text-indigo-500">
                      CBSE
                    </div>
                    <h3 className="mt-2 text-3xl font-bold text-slate-800">
                      {className}
                    </h3>
                    <div className="mt-8 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white">
                      Open Library →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
