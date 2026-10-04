import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

type ClassRecord = {
  id: number;
  name?: string | null;
  class_name?: string | null;
};

export default async function DigitalLibraryPage() {
  const supabase = await createClient();

  const { data: classData, error } = await supabase
    .from("classes")
    .select("*")
    .order("id");

  if (error) {
    console.error("Digital Library class loading error:", error);
  }

  const classes = ((classData ?? []) as ClassRecord[]).sort((a, b) => {
    const nameA = a.class_name ?? a.name ?? "";
    const nameB = b.class_name ?? b.name ?? "";
    const numberA = Number(nameA.match(/\d+/)?.[0] ?? 999);
    const numberB = Number(nameB.match(/\d+/)?.[0] ?? 999);
    return numberA - numberB || a.id - b.id;
  });

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="bg-linear-to-r from-indigo-700 to-blue-700 py-12 text-white">
        <div className="mx-auto max-w-7xl px-8">
          <h1 className="text-5xl font-bold">📚 Digital Library</h1>
          <p className="mt-3 text-xl text-indigo-100">
            Browse textbooks, reference books, notes, worksheets and digital resources.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-8 py-12">
        {classes.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-lg">
            <div className="text-7xl">🎓</div>
            <h2 className="mt-6 text-3xl font-bold text-slate-800">
              No Classes Found
            </h2>
            <p className="mt-3 text-slate-500">
              Check that your Supabase classes table contains records.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {classes.map((cls) => {
              const className = cls.class_name ?? cls.name ?? `Class ${cls.id}`;
              return (
                <Link key={cls.id} href={`/digital-library/${cls.id}`}>
                  <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
                    <div className="text-center text-6xl">🎓</div>
                    <h2 className="mt-6 text-center text-2xl font-bold">
                      {className}
                    </h2>
                    <div className="mt-8 w-full rounded-xl bg-indigo-600 py-3 text-center font-semibold text-white">
                      Open Class →
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
