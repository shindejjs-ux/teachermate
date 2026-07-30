import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export default async function ClassPage({
  params,
}: {
  params: { class: string };
}) {
  const supabase = await createClient();

  const classId = Number(params.class);

  const { data: classData } = await supabase
    .from("classes")
    .select("*")
    .eq("id", classId)
    .single();

  const { data: subjects } = await supabase
    .from("subjects")
    .select("*")
    .eq("class_id", classId)
    .order("subject_name");

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Header */}

      <div className="bg-gradient-to-r from-indigo-700 to-blue-700 text-white py-12">

        <div className="max-w-7xl mx-auto px-8">

          <h1 className="text-5xl font-bold">
            {classData?.class_name}
          </h1>

          <p className="mt-3 text-xl text-indigo-100">
            Select a Subject
          </p>

        </div>

      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">

          {subjects?.map((subject) => (

            <Link
              key={subject.id}
              href={`/digital-library/${classId}/${subject.id}`}
            >

              <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-1 transition p-8">

                <div className="text-6xl">
                  📚
                </div>

                <h2 className="text-3xl font-bold mt-6">
                  {subject.subject_name}
                </h2>

                <p className="text-slate-500 mt-3">
                  Textbooks, Reference Books,
                  Notes, Worksheets,
                  Question Banks
                </p>

                <button className="mt-8 w-full rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white py-3 font-semibold">
                  Open Subject →
                </button>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </div>
  );
}