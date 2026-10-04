import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export default async function DigitalLibraryPage() {
  const supabase = await createClient();

  const { data: classes, error } = await supabase
    .from("classes")
    .select("*")
    .order("id");

  const className = (item: any) =>
    item?.class_name ?? item?.name ?? `Class ${item?.id ?? ""}`;

  const rows = classes ?? [];

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
        {error ? (
          <div className="rounded-3xl border border-red-200 bg-red-50 p-8 shadow">
            <h2 className="text-2xl font-bold text-red-700">Database Error</h2>
            <p className="mt-3 text-red-600">{error.message}</p>
            <p className="mt-4 text-sm text-red-500">
              Check the Supabase connection and Row Level Security policy for the classes table.
            </p>
          </div>
        ) : rows.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-lg">
            <div className="text-7xl">🎓</div>
            <h2 className="mt-6 text-3xl font-bold text-slate-800">No Classes Found</h2>
            <p className="mt-3 text-slate-500">
              Supabase returned 0 records from the classes table.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {rows.map((cls: any) => (
              <Link key={cls.id} href={`/digital-library/${cls.id}`}>
                <div className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-1 hover:shadow-2xl">
                  <div className="text-center text-6xl">🎓</div>
                  <h2 className="mt-6 text-center text-2xl font-bold text-slate-800">
                    {className(cls)}
                  </h2>
                  <div className="mt-8 w-full rounded-xl bg-indigo-600 py-3 text-center font-semibold text-white">
                    Open Class →
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
