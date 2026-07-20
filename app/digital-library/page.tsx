"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type ClassItem = {
  id: number;
  name: string;
};

export default function DigitalLibrary() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [filteredClasses, setFilteredClasses] = useState<ClassItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadClasses();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredClasses(classes);
      return;
    }

    const filtered = classes.filter((cls) =>
      cls.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredClasses(filtered);
  }, [search, classes]);

  async function loadClasses() {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("classes")
      .select("id,name")
      .order("id");

    if (error) {
      console.error(error);
      setError("Unable to load classes.");
      setLoading(false);
      return;
    }

    setClasses(data || []);
    setFilteredClasses(data || []);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-indigo-700 text-white py-8 px-8 shadow">
        <h1 className="text-4xl font-bold">📚 Digital Library</h1>
        <p className="mt-2 text-indigo-100">
          Access textbooks, worksheets, lesson plans and study resources.
        </p>
      </div>

      <div className="p-8">

        {/* Search */}
        <input
          type="text"
          placeholder="Search Class..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 mb-8 rounded-lg border p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        {loading && (
          <div className="text-center text-lg font-semibold text-indigo-700">
            Loading Digital Library...
          </div>
        )}

        {!loading && error && (
          <div className="bg-red-100 border border-red-300 rounded-xl p-6 text-red-700">
            <p>{error}</p>

            <button
              onClick={loadClasses}
              className="mt-4 bg-red-600 text-white px-5 py-2 rounded-lg"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && filteredClasses.length === 0 && (
          <div className="bg-white rounded-xl shadow p-10 text-center">
            <h2 className="text-2xl font-bold">No Classes Found</h2>
            <p className="text-gray-500 mt-2">
              Try another search keyword.
            </p>
          </div>
        )}

        {!loading && !error && filteredClasses.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {filteredClasses.map((cls) => (

              <Link
                key={cls.id}
                href={`/digital-library/${cls.id}`}
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer">

                  <div className="text-6xl mb-5 text-center">
                    🎓
                  </div>

                  <h2 className="text-2xl font-bold text-center text-gray-800">
                    {cls.name}
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