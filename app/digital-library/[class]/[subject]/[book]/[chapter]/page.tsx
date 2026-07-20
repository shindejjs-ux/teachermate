"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

type Resource = {
  id: number;
  title: string;
  resource_type: string;
  file_url: string | null;
};

function getResourceUI(type: string) {
  switch (type.toLowerCase()) {
    case "pdf":
    case "textbook":
      return {
        icon: "📘",
        color: "bg-blue-100 text-blue-700",
      };

    case "worksheet":
      return {
        icon: "📝",
        color: "bg-green-100 text-green-700",
      };

    case "lesson_plan":
      return {
        icon: "📋",
        color: "bg-purple-100 text-purple-700",
      };

    case "notes":
      return {
        icon: "📒",
        color: "bg-yellow-100 text-yellow-700",
      };

    case "video":
      return {
        icon: "🎥",
        color: "bg-red-100 text-red-700",
      };

    case "ppt":
      return {
        icon: "📊",
        color: "bg-orange-100 text-orange-700",
      };

    default:
      return {
        icon: "📄",
        color: "bg-gray-100 text-gray-700",
      };
  }
}
function getFileUrl(resource: Resource, chapterId: number) {
  if (resource.file_url && resource.file_url.trim() !== "") {
    return resource.file_url;
  }

  // Fallback to local PDF
  return `/pdfs/class9/mathematics/ch${chapterId}.pdf`;
}
export default function ChapterPage() {
  const params = useParams();
  const router = useRouter();

  const chapterId = Number(params.chapter);

  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (chapterId) {
      loadResources();
    }
  }, [chapterId]);

  async function loadResources() {
    try {
      setLoading(true);
      setErrorMessage("");

      const { data, error } = await supabase
        .from("resources")
        .select("id,title,resource_type,file_url")
        .eq("chapter_id", chapterId)
        .order("id");

      if (error) throw error;

      setResources(data || []);
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to load resources. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
  <div className="min-h-screen bg-gray-100">

    {/* Header */}
    <div className="bg-gradient-to-r from-indigo-700 to-blue-700 text-white p-8 shadow-lg">

      <button
        onClick={() => router.back()}
        className="bg-white text-indigo-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100"
      >
        ← Back
      </button>

      <div className="mt-6">

        <h1 className="text-4xl font-bold">
          📚 Chapter Resources
        </h1>

        <p className="text-indigo-100 mt-2">
          Read PDFs, Notes, Worksheets and Videos
        </p>

      </div>

    </div>

    <div className="p-8">

      {/* Statistics */}

      {!loading && !errorMessage && (

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-xl shadow p-6 text-center">

            <div className="text-5xl">📚</div>

            <h2 className="text-3xl font-bold mt-3">
              {resources.length}
            </h2>

            <p className="text-gray-500">
              Total Resources
            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">

            <div className="text-5xl">📘</div>

            <h2 className="text-3xl font-bold mt-3">
              PDF
            </h2>

            <p className="text-gray-500">
              Main Book
            </p>

          </div>

          <div className="bg-white rounded-xl shadow p-6 text-center">

            <div className="text-5xl">🎯</div>

            <h2 className="text-3xl font-bold mt-3">
              Ready
            </h2>

            <p className="text-gray-500">
              Learning Status
            </p>

          </div>

        </div>

      )}

      {loading && (

        <div className="bg-white rounded-xl shadow p-10 text-center">

          <p className="text-lg font-semibold text-indigo-700">
            Loading Resources...
          </p>

        </div>

      )}

      {!loading && errorMessage && (

        <div className="bg-red-100 border border-red-300 rounded-xl p-6">

          <p className="text-red-700">
            {errorMessage}
          </p>

          <button
            onClick={loadResources}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
          >
            Retry
          </button>

        </div>

      )}

      {!loading && !errorMessage && resources.length === 0 && (

        <div className="bg-white rounded-xl shadow p-10 text-center">

          <h2 className="text-2xl font-bold">
            No Resources Available
          </h2>

          <p className="text-gray-500 mt-2">
            Resources will be uploaded soon.
          </p>

        </div>

      )}

      {!loading && !errorMessage && resources.length > 0 && (

        <div className="grid gap-6">

          {resources.map((resource) => {

            const ui = getResourceUI(resource.resource_type);

            return (

              <div
                key={resource.id}
                className="bg-white rounded-2xl border shadow-md hover:shadow-xl transition-all duration-300 p-6"
              >

                <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

                  <div className="flex items-center gap-5">

                    <div className="text-6xl">

                      {ui.icon}

                    </div>

                    <div>

                      <h2 className="text-2xl font-bold text-gray-800">

                        {resource.title}

                      </h2>

                      <span
                        className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-semibold ${ui.color}`}
                      >

                        {resource.resource_type}

                      </span>

                    </div>

                  </div>

                  <div className="flex gap-3">

                    <Link
                      href={`/pdf-viewer?file=${encodeURIComponent(
                        getFileUrl(resource, chapterId)
                      )}`}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold"
                    >
                      📖 Read
                    </Link>

                    <a
                      href={getFileUrl(resource, chapterId)}
                      download
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
                    >
                      ⬇ Download
                    </a>

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      )}

    </div>

  </div>
);
}