import { Suspense } from "react";
import PdfViewerClient from "../../components/pdfs/PdfViewerClient";

export default function PdfViewerPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-lg font-medium">Loading PDF...</div>
        </div>
      }
    >
      <PdfViewerClient />
    </Suspense>
  );
}