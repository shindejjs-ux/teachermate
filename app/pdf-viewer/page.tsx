import { Suspense } from "react";

// Fallback inline PDF viewer placeholder to avoid missing module import.
const PdfViewerClient = () => {
  return <div className="p-6">PDF Viewer unavailable.</div>;
};

export default function PdfViewerPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading PDF Viewer...</div>}>
      <PdfViewerClient />
    </Suspense>
  );
}