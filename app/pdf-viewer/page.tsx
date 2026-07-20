"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function PDFViewerContent() {
  const searchParams = useSearchParams();

  const url = searchParams.get("url");

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">
        PDF Viewer
      </h1>

      {url ? (
        <iframe
          src={url}
          className="w-full h-[85vh] rounded-lg border"
          title="PDF Viewer"
        />
      ) : (
        <p className="text-red-600">
          PDF file not found
        </p>
      )}
    </div>
  );
}

export default function PDFViewerPage() {
  return (
    <Suspense fallback={
      <div className="p-8">
        Loading PDF Viewer...
      </div>
    }>
      <PDFViewerContent />
    </Suspense>
  );
}