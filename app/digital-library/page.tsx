import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export default async function DigitalLibraryHome() {
  const supabase = await createClient();

  const { data: classes } = await supabase
    .from("classes")
    .select("*")
    .order("id");

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
    <div className="min-h-screen bg-slate-100">

      {/* Hero */}

      <div className="bg-gradient-to-r from-indigo-700 to-blue-700 text-white">

        <div className="max-w-7xl mx-auto px-8 py-12">

          <h1 className="text-5xl font-bold">
            📚 TeacherMate Digital Library
          </h1>

          <p className="mt-4 text-xl text-indigo-100">
            NCERT • Reference Books • Notes • Worksheets • Question Banks
          </p>

        </div>

      </div>

      {/* Statistics */}

      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-6 px-8 -mt-8">

        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <div className="text-5xl">📘</div>
          <h2 className="text-3xl font-bold mt-3">{books ?? 0}</h2>
          <p className="text-slate-500">Books</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <div className="text-5xl">📖</div>
          <h2 className="text-3xl font-bold mt-3">{chapters ?? 0}</h2>
          <p className="text-slate-500">Chapters</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <div className="text-5xl">📂</div>
          <h2 className="text-3xl font-bold mt-3">{resources ?? 0}</h2>
          <p className="text-slate-500">Resources</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <div className="text-5xl">🎓</div>
          <h2 className="text-3xl font-bold mt-3">{classes?.length ?? 0}</h2>
          <p className="text-slate-500">Classes</p>
        </div>

      </div>

      {/* Classes */}

      <div className="max-w-7xl mx-auto px-8 py-12">

        <h2 className="text-3xl font-bold mb-8">
          Select Class
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {classes?.map((cls) => (

            <Link
              key={cls.id}
              href={`/digital-library/${cls.id}`}
            >

              <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition p-8 text-center">

                <div className="text-6xl mb-5">
                  🎓
                </div>

                <h3 className="text-3xl font-bold">
                  {cls.class_name}
                </h3>

                <button className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 font-semibold">
                  Open Library →
                </button>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </div>
  );
}