"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-browser";

type Resource = {
  id: number;
  title: string;
  resource_type: string;
  file_url: string | null;
  display_order: number | null;
  is_active: boolean | null;
};

type Chapter = {
  id: number;
  title: string;
  chapter_no: number;
};

export default function ChapterPage() {
  const params = useParams();
  const router = useRouter();

  const classId = Number(params.class);
  const subjectId = Number(params.subject);
  const bookId = Number(params.book);
  const chapterId = Number(params.chapter);

  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadChapter() {
      setLoading(true);

      const [{ data: chapterData }, { data: resourceData }] =
        await Promise.all([
          supabase
            .from("chapters")
            .select("id, title, chapter_no")
            .eq("id", chapterId)
            .eq("book_id", bookId)
            .maybeSingle(),

          supabase
            .from("resources")
            .select(
              "id, title, resource_type, file_url, display_order, is_active"
            )
            .eq("chapter_id", chapterId)
            .eq("is_active", true)
            .not("file_url", "is", null)
            .order("display_order", { ascending: true })
            .order("id", { ascending: true }),
        ]);

      if (cancelled) return;

      setChapter(chapterData ?? null);
      setResources((resourceData ?? []) as Resource[]);
      setLoading(false);
    }

    loadChapter();

    return () => {
      cancelled = true;
    };
  }, [bookId, chapterId]);

  const pdfResources = useMemo(() => {
    return resources.filter((resource) => {
      const type = resource.resource_type?.toLowerCase() ?? "";

      return (
        resource.file_url &&
        (type.includes("pdf") ||
          type.includes("textbook") ||
          resource.file_url.toLowerCase().endsWith(".pdf"))
      );
    });
  }, [resources]);

  function openPdf(url: string) {
    const viewerUrl = `/pdf-viewer?url=${encodeURIComponent(url)}`;
    router.push(viewerUrl);
  }

  function downloadPdf(url: string) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-xl font-semibold text-slate-600">
          Loading chapter...
        </div>
      </div>
    );
  }

  if (!chapter) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
          <div className="text-6xl mb-5">📚</div>

          <h1 className="text-3xl font-bold text-slate-800">
            Chapter Not Found
          </h1>

          <button
            onClick={() => router.back()}
            className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 text-white font-semibold hover:bg-indigo-700"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-linear-to-r from-indigo-700 to-blue-700 text-white">
        <div className="mx-auto max-w-7xl px-6 py-10 md:px-8">
          <button
            onClick={() => router.back()}
            className="rounded-lg bg-white/20 px-5 py-2 hover:bg-white/30"
          >
            ← Back
          </button>

          <p className="mt-8 text-indigo-200 text-lg">
            Chapter {chapter.chapter_no}
          </p>

          <h1 className="mt-2 text-4xl font-bold md:text-5xl">
            {chapter.title}
          </h1>

          <p className="mt-3 text-xl text-indigo-100">
            Digital Learning Hub
          </p>
        </div>
      </div>

      {/* Resources */}
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-8">
        {pdfResources.length === 0 ? (
          <div className="rounded-2xl bg-white p-12 text-center shadow-lg">
            <div className="text-7xl mb-6">📂</div>

            <h2 className="text-3xl font-bold text-slate-800">
              No PDF Available
            </h2>

            <p className="mt-4 text-slate-500">
              No active PDF resource has been linked to this chapter.
            </p>
          </div>
        ) : (
          <>
            <h2 className="mb-8 text-3xl font-bold text-slate-800">
              Chapter Resources
            </h2>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {pdfResources.map((resource) => (
                <div
                  key={resource.id}
                  className="overflow-hidden rounded-2xl bg-white shadow-lg"
                >
                  <div className="bg-blue-600 p-8 text-white">
                    <div className="text-6xl">📘</div>

                    <h3 className="mt-5 text-2xl font-bold">
                      {resource.title}
                    </h3>

                    <p className="mt-2 text-blue-100">
                      {resource.resource_type}
                    </p>
                  </div>

                  <div className="p-6">
                    <button
                      onClick={() => openPdf(resource.file_url!)}
                      className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700"
                    >
                      📖 Open PDF
                    </button>

                    <button
                      onClick={() => downloadPdf(resource.file_url!)}
                      className="mt-3 w-full rounded-xl bg-green-600 py-3 font-semibold text-white hover:bg-green-700"
                    >
                      ⬇ Download PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* All resources */}
        {resources.length > 0 && (
          <div className="mt-12 rounded-2xl bg-white p-8 shadow-lg">
            <h2 className="mb-6 text-2xl font-bold text-slate-800">
              All Chapter Resources
            </h2>

            <div className="space-y-3">
              {resources.map((resource) => (
                <div
                  key={resource.id}
                  className="flex flex-col gap-4 rounded-xl border p-5 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <h3 className="font-bold text-lg text-slate-800">
                      {resource.title}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {resource.resource_type}
                    </p>
                  </div>

                  {resource.file_url && (
                    <button
                      onClick={() => openPdf(resource.file_url!)}
                      className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700"
                    >
                      Open
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}