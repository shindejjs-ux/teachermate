import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

type ClassRecord = {
  id: number;
  name: string | null;
  board_id: number | null;
};

export default async function DigitalLibraryHome() {
  const supabase = await createClient();

  // Only CBSE classes
  const { data: classData, error: classError } = await supabase
    .from("classes")
    .select("*")
    .eq("board_id", 1);

  if (classError) {
    console.error("Digital Library class loading error:", classError);
  }

  // IMPORTANT:
  // Database IDs are NOT the class numbers.
  // Example:
  // Class 1  -> id 21
  // Class 9  -> id 33
  //
  // Therefore sort using the number inside the class name.
  const classes: ClassRecord[] = [...((classData ?? []) as ClassRecord[])].sort(
    (a, b) => {
      const numberA = Number(a.name?.match(/\d+/)?.[0] ?? 999);
      const numberB = Number(b.name?.match(/\d+/)?.[0] ?? 999);

      return numberA - numberB;
    }
  );

  const { count: books } = await supabase
    .from("books")
    .select("*", { count: "exact", head: true });

  const { count: chapters } = await supabase
    .from("chapters")
    .select("*", { count: "exact", head: true });

  const { count: resources } = await supabase
    .from("resources")
    .select("*", { count: "exact", head: true });

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="bg-linear-to-r from-indigo-700 to-blue-700 text-white">
        <div className="mx-auto max-w-7xl px-8 py-12">
          <h1 className="text-5xl font-bold">
            📚 TeacherMate Digital Library
          </h1>

          <p className="mt-4 text-xl text-indigo-100">
            NCERT • Reference Books • Notes • Worksheets • Question Banks
          </p>
        </div>
      </div>

      {/* Statistics */}
      <div className="mx-auto -mt-8 grid max-w-7xl gap-6 px-8 md:grid-cols-4">
        <div className="rounded-2xl bg-white p-6 text-center shadow">
          <div className="text-5xl">📘</div>
          <h2 className="mt-3 text-3xl font-bold">{books ?? 0}</h2>
          <p className="text-slate-500">Books</p>
        </div>

        <div className="rounded-2xl bg-white p-6 text-center shadow">
          <div className="text-5xl">📖</div>
          <h2 className="mt-3 text-3xl font-bold">{chapters ?? 0}</h2>
          <p className="text-slate-500">Chapters</p>
        </div>

        <div className="rounded-2xl bg-white p-6 text-center shadow">
          <div className="text-5xl">📂</div>
          <h2 className="mt-3 text-3xl font-bold">{resources ?? 0}</h2>
          <p className="text-slate-500">Resources</p>
        </div>

        <div className="rounded-2xl bg-white p-6 text-center shadow">
          <div className="text-5xl">🎓</div>
          <h2 className="mt-3 text-3xl font-bold">{classes.length}</h2>
          <p className="text-slate-500">CBSE Classes</p>
        </div>
      </div>

      {/* Classes */}
      <div className="mx-auto max-w-7xl px-8 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-800">
              Select Class
            </h2>

            <p className="mt-2 text-slate-500">
              CBSE Digital Learning Library
            </p>
          </div>
        </div>

        {classes.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-lg">
            <div className="mb-6 text-7xl">🎓</div>

            <h2 className="text-3xl font-bold text-slate-800">
              No CBSE Classes Found
            </h2>

            <p className="mt-4 text-slate-500">
              Please check the classes table and ensure CBSE classes have
              board_id = 1.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {classes.map((cls) => {
              const classNumber = Number(
                cls.name?.match(/\d+/)?.[0] ?? 0
              );

              return (
                <Link
                  key={cls.id}
                  href={`/digital-library/${cls.id}`}
                  className="group"
                >
                  <div className="rounded-3xl bg-white p-8 text-center shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                    <div className="mb-5 text-6xl">🎓</div>

                    <div className="text-sm font-semibold uppercase tracking-wider text-indigo-500">
                      CBSE
                    </div>

                    <h3 className="mt-2 text-3xl font-bold text-slate-800">
                      Class {classNumber}
                    </h3>

                    <button
                      type="button"
                      className="mt-8 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition group-hover:bg-indigo-700"
                    >
                      Open Library →
                    </button>
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