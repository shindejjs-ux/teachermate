"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function ChapterPage() {
  const params = useParams();
  const chapterId = params.chapter;

  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResources();
  }, []);

  async function loadResources() {
    setLoading(true);

    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .eq("chapter_id", Number(chapterId))
      .order("id");

    if (error) {
      console.error(error);
    } else {
      setResources(data || []);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-3xl font-bold text-indigo-700 mb-8">
        Chapter Resources
      </h1>

      {loading ? (
        <div className="text-center text-lg font-semibold">
          Loading Resources...
        </div>
      ) : resources.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-xl font-bold text-red-600">
            No Resources Available
          </h2>
          <p className="text-gray-500 mt-2">
            Resources will be added soon.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">

          {resources.map((resource) => (

            <div
              key={resource.id}
              className="bg-white rounded-xl shadow-lg p-6 flex justify-between items-center hover:shadow-xl transition"
            >

              <div>

                <h2 className="text-xl font-bold">
                  {resource.title}
                </h2>

                <p className="text-gray-500 capitalize">
                  {resource.resource_type}
                </p>

              </div>

              {resource.file_url ? (

                <a
                  href={resource.file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg"
                >
                  Open
                </a>

              ) : (

                <span className="bg-gray-300 text-gray-700 px-5 py-2 rounded-lg">
                  Coming Soon
                </span>

              )}

            </div>

          ))}

        </div>
      )}

    </div>
  );
}