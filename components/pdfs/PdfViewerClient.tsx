"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useMemo } from "react";

export default function PdfViewerClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const url = searchParams.get("url");

  const decodedUrl = useMemo(() => {
    if (!url) return "";

    try {
      return decodeURIComponent(url);
    } catch {
      return url;
    }
  }, [url]);

  if (!decodedUrl) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
          <div className="mb-4 text-6xl">📄</div>

          <h1 className="text-2xl font-bold text-slate-800">
            PDF Not Found
          </h1>

          <p className="mt-2 text-slate-500">
            The requested PDF could not be found.
          </p>

          <button
            onClick={() => router.back()}
            className="mt-6 rounded-lg bg-indigo-600 px-6 py-3 text-white transition hover:bg-indigo-700"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-slate-100">
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between gap-4 border-b bg-white px-4 py-3 shadow-sm md:px-5">
        <button
          onClick={() => router.back()}
          className="rounded-lg bg-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-300"
        >
          ← Back
        </button>

        <div className="flex items-center gap-2">
          <a
            href={decodedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-green-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-green-700 md:px-4"
          >
            <span className="hidden sm:inline">↗ Open in New Tab</span>
            <span className="sm:hidden">↗ Open</span>
          </a>

          <a
            href={decodedUrl}
            download
            className="rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-indigo-700 md:px-4"
          >
            <span className="hidden sm:inline">⬇ Download</span>
            <span className="sm:hidden">⬇</span>
          </a>
        </div>
      </header>

      {/* PDF Viewer */}
      <main className="min-h-0 flex-1 bg-slate-200">
        <iframe
          src={decodedUrl}
          title="TeacherMate PDF Viewer"
          className="h-full w-full border-0"
          loading="lazy"
        />
      </main>
    </div>
  );
}