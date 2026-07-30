"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-browser";

type Props = {
  resourceId: number;
};

export default function FileUpload({ resourceId }: Props) {
  const [uploading, setUploading] = useState(false);

  async function uploadFile(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);

    const fileName = `chapter-${resourceId}/${Date.now()}-${file.name}`;

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

    await supabase
      .from("resources")
      .update({
        file_url: data.publicUrl,
      })
      .eq("id", resourceId);

    alert("Upload Successful");

    setUploading(false);

    window.location.reload();
  }

  return (
    <input
      type="file"
      onChange={uploadFile}
      disabled={uploading}
    />
  );
}