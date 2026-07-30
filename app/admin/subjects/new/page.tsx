"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-browser";

type SchoolClass = {
  id: number;
  name: string;
};

export default function NewSubjectPage() {
  const router = useRouter();

  const [classes, setClasses] = useState<SchoolClass[]>([]);
  const [classId, setClassId] = useState<number>(1);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadClasses();
  }, []);

  async function loadClasses() {
    const { data, error } = await supabase
      .from("classes")
      .select("id,name")
      .order("id");

    if (error) {
      console.error(error);
      return;
    }

    setClasses(data ?? []);

    if (data && data.length > 0) {
      setClassId(data[0].id);
    }
  }

  async function saveSubject() {
    if (!name.trim()) {
      alert("Please enter subject name.");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("subjects")
      .insert({
        class_id: classId,
        name: name.trim(),
      });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/admin/subjects");
  }

  return (
    <div className="max-w-xl space-y-6">

      <h1 className="text-3xl font-bold">
        Add Subject
      </h1>

      <div>

        <label className="mb-2 block">
          Class
        </label>

        <select
          value={classId}
          onChange={(e) =>
            setClassId(Number(e.target.value))
          }
          className="w-full rounded-lg border p-3"
        >
          {classes.map((cls) => (
            <option key={cls.id} value={cls.id}>
              {cls.name}
            </option>
          ))}
        </select>

      </div>

      <div>

        <label className="mb-2 block">
          Subject Name
        </label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Mathematics"
          className="w-full rounded-lg border p-3"
        />

      </div>

      <button
        onClick={saveSubject}
        disabled={loading}
        className="rounded-lg bg-indigo-600 px-6 py-3 text-white"
      >
        {loading ? "Saving..." : "Save Subject"}
      </button>

    </div>
  );
}