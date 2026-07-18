"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ClassPage() {
  const { class: className } = useParams();

  const [subjects, setSubjects] = useState<any[]>([]);

  useEffect(() => {
    loadSubjects();
  }, []);

  async function loadSubjects() {
    const { data, error } = await supabase
      .from("subjects")
      .select("id, name")
      .order("id");

    if (error) {
      console.error(error);
      return;
    }

    setSubjects(data || []);
    console.log(data);
  }

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-indigo-700 mb-8 capitalize">
        {String(className).replace("-", " ")}
      </h1>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
        {subjects.map((subject) => (
          <Link
            key={subject.id}
            href={`/digital-library/${className}/${subject.id}`}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl hover:scale-105 transition">
              <div className="text-5xl mb-4">📖</div>

              <h2 className="text-xl font-bold">
                {subject.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}