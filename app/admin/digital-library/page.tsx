import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export default async function DigitalLibraryPage() {
  const supabase = await createClient();

  const { data: classes } = await supabase
    .from("classes")
    .select("id,name")
    .order("id");

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="bg-linear-to-r from-indigo-700 to-blue-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-5xl font-bold">
            📚 Digital Library
          </h1>

          <p className="text-xl mt-3 text-indigo-100">
            Browse textbooks, reference books, notes, worksheets and digital resources.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {classes?.map((cls) => (

            <Link
              key={cls.id}
              href={`/digital-library/${cls.id}`}
            >

              <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition hover:-translate-y-1 p-8">

                <div className="text-6xl text-center">
                  🎓
                </div>

                <h2 className="text-2xl font-bold text-center mt-6">
                  {cls.name}
                </h2>

                <button className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-3 font-semibold">
                  Open Class →
                </button>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </div>
  );
}