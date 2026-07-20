"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Subject = {
  id: number;
  name: string;
};

export default function ClassPage() {
  const params = useParams();
  const router = useRouter();

  const classId = Number(params.class);

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (classId) {
      loadSubjects();
    }
  }, [classId]);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredSubjects(subjects);
      return;
    }

    setFilteredSubjects(
      subjects.filter((subject) =>
        subject.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, subjects]);

  async function loadSubjects() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("subjects")
      .select("id,name")
      .eq("class_id", classId)
      .order("id");

    if (error) {
      console.error(error);
      setError("Unable to load subjects.");
      setLoading(false);
      return;
    }

    setSubjects(data || []);
    setFilteredSubjects(data || []);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-indigo-700 text-white p-8 shadow">

        <button
          onClick={() => router.back()}
          className="mb-4 bg-white text-indigo-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-bold">
          📚 Class {classId}
        </h1>

        <p className="text-indigo-100 mt-2">
          Select a subject to continue.
        </p>

      </div>

      <div className="p-8">

        {/* Search */}
        <input
          type="text"
          placeholder="Search Subject..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 mb-8 rounded-lg border p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {loading && (
          <div className="text-center text-lg font-semibold text-indigo-700">
            Loading Subjects...
          </div>
        )}

        {!loading && error && (
          <div className="bg-red-100 border border-red-300 rounded-xl p-6">

            <p className="text-red-700">{error}</p>

            <button
              onClick={loadSubjects}
              className="mt-4 bg-red-600 text-white px-5 py-2 rounded-lg"
            >
              Retry
            </button>

          </div>
        )}

        {!loading && !error && filteredSubjects.length === 0 && (
          <div className="bg-white rounded-xl shadow p-10 text-center">

            <h2 className="text-2xl font-bold">
              No Subjects Found
            </h2>

            <p className="text-gray-500 mt-2">
              Try another search or add subjects in the Admin Panel.
            </p>

          </div>
        )}

        {!loading && !error && filteredSubjects.length > 0 && (

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {filteredSubjects.map((subject) => (

              <Link
                key={subject.id}
                href={`/digital-library/${classId}/${subject.id}`}
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 cursor-pointer">

                  <div className="text-6xl text-center mb-5">
                    📖
                  </div>

                  <h2 className="text-xl font-bold text-center text-gray-800">
                    {subject.name}
                  </h2>

                </div>
              </Link>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}