"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ResourcesPage() {
  const [resources, setResources] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResources();
  }, []);

  async function loadResources() {
    setLoading(true);

    const { data, error } = await supabase
      .from("resources")
      .select(`
        *,
        chapters(title, chapter_no)
      `)
      .order("chapter_id");

    if (!error) {
      setResources(data || []);
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <h1 className="text-4xl font-bold mb-8">
        Manage Resources
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="w-full bg-white shadow rounded-lg overflow-hidden">

          <thead className="bg-indigo-600 text-white">

            <tr>
              <th className="p-3 text-left">Chapter</th>
              <th className="p-3 text-left">Resource</th>
              <th className="p-3 text-left">Link</th>
            </tr>

          </thead>

          <tbody>

            {resources.map((item) => (

              <tr key={item.id} className="border-b">

                <td className="p-3">
                  Chapter {item.chapters.chapter_no}
                  <br />
                  <span className="text-sm text-gray-500">
                    {item.chapters.title}
                  </span>
                </td>

                <td className="p-3">
                  {item.title}
                </td>

                <td className="p-3">
                  {item.file_url ? (
                    <a
                      href={item.file_url}
                      target="_blank"
                      className="text-blue-600 underline"
                    >
                      Open
                    </a>
                  ) : (
                    <span className="text-red-500">
                      Not Added
                    </span>
                  )}
                </td>

              </tr>

            ))}

          </tbody>

        </table>
      )}

    </div>
  );
}