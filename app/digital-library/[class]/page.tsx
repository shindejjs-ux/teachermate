
import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

type PageProps = {
  params: Promise<{
    class: string;
  }>;
};

export default async function ClassPage({
  params,
}: PageProps) {
  const supabase = await createClient();

  const resolvedParams = await params;
  const classId = Number(resolvedParams.class);

  const { data: classData, error: classError } = await supabase
    .from("classes")
    .select("*")
    .eq("id", classId)
    .maybeSingle();

  const { data: subjects, error: subjectsError } = await supabase
    .from("subjects")
    .select("*")
    .eq("class_id", classId)
    .order("name");

  if (classError) {
    console.error("Class loading error:", classError);
  }

  if (subjectsError) {
    console.error("Subjects loading error:", subjectsError);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-linear-to-r from-indigo-700 to-blue-700 py-12 text-white">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <Link
            href="/digital-library"
            className="inline-block rounded-lg bg-white/20 px-5 py-2 hover:bg-white/30"
          >
            ← Back to Digital Library
          </Link>

          <h1 className="mt-8 text-4xl font-bold md:text-5xl">
            {classData?.name ?? `Class ${classId}`}
          </h1>

          <p className="mt-3 text-xl text-indigo-100">
            Select a Subject
          </p>
        </div>
      </div>

      {/* Subjects */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
        {subjects && subjects.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {subjects.map((subject) => (
              <Link
                key={subject.id}
                href={`/digital-library/${classId}/${subject.id}`}
              >
                <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
                  <div className="text-6xl">📚</div>

                  <h2 className="mt-6 text-3xl font-bold text-slate-800">
                    {subject.name}
                  </h2>

                  <p className="mt-3 text-slate-500">
                    Textbooks, Reference Books, Notes,
                    Worksheets, Question Banks
                  </p>

                  <div className="mt-8 w-full rounded-xl bg-indigo-600 py-3 text-center font-semibold text-white transition hover:bg-indigo-700">
                    Open Subject →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl bg-white p-12 text-center shadow-lg">
            <div className="text-7xl">📚</div>

            <h2 className="mt-6 text-3xl font-bold text-slate-800">
              No Subjects Found
            </h2>

            <p className="mt-3 text-slate-500">
              No subjects have been added for this class yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
