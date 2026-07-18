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
  const chapterId = Number(params.id);

  const [chapter, setChapter] = useState<Chapter | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);

  useEffect(() => {
    if (!chapterId) return;

    loadChapter();
    loadResources();
  }, [chapterId]);

  async function loadChapter() {
    const { data, error } = await supabase
      .from("chapters")
      .select("id, chapter_no, chapter_name")
      .eq("id", chapterId)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setChapter(data);
  }

  async function loadResources() {
    const { data, error } = await supabase
      .from("resources")
      .select("*")
      .eq("chapter_id", chapterId)
      .order("id");

    if (error) {
      console.error(error);
      return;
    }

    setResources(data || []);
  }

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold text-indigo-700 mb-8">
        {chapter?.chapter_no}. {chapter?.chapter_name}
      </h1>

      {resources.length === 0 ? (
        <div className="bg-yellow-100 p-4 rounded-xl">
          No resources available.
        </div>
      ) : (
        <div className="space-y-8">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold mb-2">
                {resource.title}
              </h2>

              <p className="text-gray-500 mb-4">
                {resource.type}
              </p>

              <iframe
                src={resource.url}
                className="w-full h-[900px] rounded-xl border"
                allow="autoplay"
              />
            </div>
          ))}
        </div>
      )}

    </div>
  );
}