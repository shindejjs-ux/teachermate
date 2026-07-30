"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-browser";

type Props = {
  onUploaded: (url: string) => void;
};

export default function FileUpload({ onUploaded }: Props) {
  const [uploading, setUploading] = useState(false);

  async function uploadFile(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);

    const fileName =
      `${Date.now()}-${file.name}`;

    const { error } = await supabase.storage
      .from("resources")
      .upload(fileName, file);

    if (error) {
      alert(error.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage
      .from("resources")
      .getPublicUrl(fileName);

    onUploaded(data.publicUrl);

    setUploading(false);
  }

  return (
    <div className="space-y-2">

      <label className="font-medium">
        Upload PDF
      </label>

      <input
        type="file"
        accept=".pdf"
        onChange={uploadFile}
        className="w-full rounded-lg border p-3"
      />

      {uploading && (
        <p className="text-indigo-600">
          Uploading...
        </p>
      )}

    </div>
  );
}