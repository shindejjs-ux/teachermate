"use client";
import { getPreviewUrl } from "@/lib/file-utils";
type Props = {
  open: boolean;
  url: string;
  title: string;
  onClose: () => void;
};

export default function PdfPreviewModal({
  open,
  url,
  title,
  onClose,
}: Props) {
  if (!open) return null;

  console.log("Original URL:", url);
  console.log("Preview URL:", getPreviewUrl(url));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="flex h-[90vh] w-[95vw] flex-col rounded-xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="text-xl font-bold">{title}</h2>

          <button
            onClick={onClose}
            className="rounded-lg bg-red-600 px-4 py-2 text-white"
          >
            Close
          </button>
        </div>

        <iframe
          src={getPreviewUrl(url)}
          title={title}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}