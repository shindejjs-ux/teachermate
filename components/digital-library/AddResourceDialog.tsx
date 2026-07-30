
"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-browser";
import FileUpload from "@/components/digital-library/FileUpload";

type Props = {
  chapterId: string;
  onSuccess: () => void;
};

export default function AddResourceDialog({
  chapterId,
  onSuccess,
}: Props) {
  const [title, setTitle] = useState("");
  const [resourceType, setResourceType] = useState("pdf");
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function saveResource() {
    if (!chapterId) {
      alert("Please select a chapter first.");
      return;
    }

    if (!title.trim()) {
      alert("Please enter resource title.");
      return;
    }

    if (!fileUrl.trim()) {
      alert("Please enter file URL.");
      return;
    }

    try {
      setLoading(true);

      const { error } = await supabase
        .from("resources")
        .insert({
          chapter_id: Number(chapterId),
          title: title.trim(),
          resource_type: resourceType,
          file_url: fileUrl.trim(),
        });

      if (error) throw error;

      setTitle("");
      setResourceType("pdf");
      setFileUrl("");

      onSuccess();

      alert("✅ Resource added successfully.");
    } catch (err: any) {
      alert(err.message || "Unable to save resource.");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setTitle("");
    setResourceType("pdf");
    setFileUrl("");
  }

  return (
    <div className="rounded-xl bg-white shadow p-6">

      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Add New Resource
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Add PDFs, videos, notes, worksheets and lesson plans.
        </p>
      </div>

      <div className="space-y-5">

        <div>
          <label className="mb-2 block text-sm font-medium">
            Resource Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Chapter 1 Notes"
            className="w-full rounded-lg border p-3 focus:border-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Resource Type
          </label>

          <select
            value={resourceType}
            onChange={(e) => setResourceType(e.target.value)}
            className="w-full rounded-lg border p-3 focus:border-indigo-500 focus:outline-none"
          >
            <option value="pdf">📄 PDF</option>
            <option value="video">🎥 Video</option>
            <option value="notes">📚 Notes</option>
            <option value="worksheet">📝 Worksheet</option>
            <option value="lesson_plan">📋 Lesson Plan</option>
          </select>
        </div>

        <div>
          <FileUpload
            onUploaded={(url) => setFileUrl(url)}
          />
<FileUpload
  onUploaded={(url) => setFileUrl(url)}
/>

<input
  className="rounded-lg border p-3"
  value={fileUrl}
  readOnly
/>
          

          <p className="mt-2 text-xs text-slate-500">
            Supports local PDFs, Google Drive links and external URLs.
          </p>
        </div>

        <div className="flex gap-3">

          <button
            type="button"
            onClick={saveResource}
            disabled={loading}
            className="rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Resource"}
          </button>

          <button
            type="button"
            onClick={resetForm}
            disabled={loading}
            className="rounded-lg border px-6 py-3 hover:bg-slate-100"
          >
            Reset
          </button>

        </div>

      </div>

    </div>
  );
}