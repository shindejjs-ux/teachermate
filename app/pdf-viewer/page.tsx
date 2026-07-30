"use client";

import { useSearchParams } from "next/navigation";

export default function PdfViewer() {
  const params = useSearchParams();

  const url = params.get("url");

  if (!url) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-3xl font-bold">
          PDF Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-slate-900">

      <iframe
        src={url}
        className="w-full h-full"
        title="PDF Viewer"
      />

    </div>
  );
}