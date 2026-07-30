"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase-browser";

type Class = {
  id: number;
  board_id: number;
  name: string;
  boards?: {
    name: string;
  }[];
};

export default function ClassesPage() {
  const [classes, setClasses] = useState<Class[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClasses();
    async function deleteClass(id: number) {
  const ok = confirm(
    "Are you sure you want to delete this class?"
  );

  if (!ok) return;

  const { error } = await supabase
    .from("classes")
    .delete()
    .eq("id", id);

  if (error) {
    alert(error.message);
    return;
  }

  loadClasses();
}
  }, []);

  async function loadClasses() {
    setLoading(true);

    const { data, error } = await supabase
      .from("classes")
      .select(`
        id,
        board_id,
        name,
        boards(name)
      `)
      .order("id");

    if (error) {
      console.error(error);
    } else {
      setClasses((data ?? []) as Class[]);
    }

    setLoading(false);
  }

  async function deleteClass(id: number) {
    const { error } = await supabase
      .from("classes")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    loadClasses();
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold">
            Classes
          </h1>

          <p className="text-gray-500">
            Manage Classes
          </p>
        </div>

        <Link
          href="/admin/classes/new"
          className="rounded-xl bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
        >
          + Add Class
        </Link>

      </div>

      {loading ? (
        <div className="rounded-xl bg-white p-8 text-center shadow">
          Loading classes...
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-4">

          {classes.map((cls) => (
            <div
              key={cls.id}
              className="rounded-xl bg-white p-6 shadow transition hover:shadow-xl"
            >
              <h2 className="text-2xl font-bold">
                {cls.name}
              </h2>

              <p className="mt-2 text-gray-600">
                <strong>Board:</strong>{" "}
               {cls.boards?.[0]?.name}
              </p>

              <p className="mt-1 text-gray-500">
                <strong>ID:</strong> {cls.id}
              </p>

              <div className="mt-5 flex gap-2">

                <Link
  href={`/admin/classes/${cls.id}/edit`}
  className="rounded bg-blue-600 px-3 py-2 text-white"
>
  Edit
</Link>

                <button
  onClick={() => deleteClass(cls.id)}
  className="rounded-lg bg-red-600 px-3 py-2 text-white hover:bg-red-700"
>
  Delete
</button>
              </div>

            </div>
          ))}

          {classes.length === 0 && (
            <div className="col-span-full rounded-xl bg-white p-8 text-center shadow">
              No classes found.
            </div>
          )}

        </div>
      )}
    </div>
  );
}