"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Chapter {
  id: number;
  chapter_no: number;
  chapter_name: string;
}

interface Resource {
  id: number;
  type: string;
  title: string;
  url: string;
}

export default function ChapterPage() {
  const params = useParams();
  const id = Number(params.id);

  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    if (id) {
      loadChapter();
      loadResources();
    }
  }, [id]);

  async function loadChapter() {
    const { data, error } = await supabase
      .from("chapters")
      .select("*")
      .eq("id", id)
      .single();

    console.log("Chapter:", data, error);

    if (data) setChapter(data);
  }

  async function loadResources() {
    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .eq("chapter_id", id);

    console.log("Resources:", data, error);

    setResources(data || []);
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        {chapter?.chapter_no}. {chapter?.chapter_name}
      </h1>

      {resources.length === 0 ? (
        <p>No resources found.</p>
      ) : (
        resources.map((item) => (
          <div key={item.id} className="mb-8">
            <h2 className="text-xl font-bold">{item.title}</h2>
            <p>{item.type}</p>

            <iframe
              src={item.url}
              width="100%"
              height="700"
              style={{ border: "1px solid #ddd" }}
            />
          </div>
        ))
      )}
    </div>
  );
}