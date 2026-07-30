"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";
import type { Resource } from "./ResourceTable";

type Props = {
  resource: Resource | null;
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditResourceDialog({
  resource,
  onClose,
  onSuccess,
}: Props) {
  const [title, setTitle] = useState("");
  const [resourceType, setResourceType] = useState("pdf");
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    if (!resource) return;

    setTitle(resource.title);
    setResourceType(resource.resource_type);
    setFileUrl(resource.file_url);
  }, [resource]);

  if (!resource) return null;

  async function updateResource() {
    const { error } = await supabase
      .from("resources")
      .update({
        title,
        resource_type: resourceType,
        file_url: fileUrl,
      })
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
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">

        <h2 className="mb-6 text-2xl font-bold">
          Edit Resource
        </h2>

        <div className="space-y-4">

          <input
            className="w-full rounded-lg border p-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            className="w-full rounded-lg border p-3"
            value={resourceType}
            onChange={(e) => setResourceType(e.target.value)}
          >
            <option value="pdf">PDF</option>
            <option value="video">Video</option>
            <option value="notes">Notes</option>
            <option value="worksheet">Worksheet</option>
            <option value="lesson_plan">Lesson Plan</option>
          </select>

          <input
            className="w-full rounded-lg border p-3"
            value={fileUrl}
            onChange={(e) => setFileUrl(e.target.value)}
          />

        </div>

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={updateResource}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
          >
            Save Changes
          </button>

        </div>

      </div>
    </div>
  );
}