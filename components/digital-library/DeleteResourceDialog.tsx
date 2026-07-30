"use client";

import { supabase } from "@/lib/supabase-browser";
import type { Resource } from "./ResourceTable";

type Props = {
  resource: Resource | null;
  onClose: () => void;
  onSuccess: () => void;
};

export default function DeleteResourceDialog({
  resource,
  onClose,
  onSuccess,
}: Props) {
  if (!resource) return null;

  async function deleteResource() {
    const { error } = await supabase
      .from("resources")
      .delete()
      .eq("id", resource.id);

    if (error) {
      alert(error.message);
      return;
    }

    onSuccess();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        <h2 className="text-2xl font-bold text-red-600">
          Delete Resource
        </h2>

        <p className="mt-4">
          Are you sure you want to delete:
        </p>

        <p className="mt-2 font-semibold">
          {resource.title}
        </p>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={deleteResource}
            className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Delete
          </button>

        </div>

      </div>
    </div>
  );
}