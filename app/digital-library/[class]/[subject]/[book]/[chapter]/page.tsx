"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase-browser";

type Resource = {
  id: number;
  title: string;
  resource_type: string;
  file_url: string | null;
};

export default function ChapterPage() {
  const params = useParams();

  const classId = Number(params.class);
  const bookId = Number(params.book);
  const chapterId = Number(params.chapter);
  const folder = params.book;

  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
const [book, setBook] = useState<any>(null);
  useEffect(() => {
    loadResources();
  }, []);

  async function loadResources() {
    const { data: bookData } = await supabase
  .from("books")
  .select("storage_folder")
  .eq("id", bookId)
  .single();

setBook(bookData);
  }

function pdfUrl() {
  if (!book?.storage_folder) return "";

  const { data } = supabase.storage
    .from("library")
    .getPublicUrl(
      `class${classId}/${book.storage_folder}/ch${chapterId}.pdf`
    );

  return data.publicUrl;
}
  

  const cards = [
  {
    title: "Textbook PDF",
    icon: "📘",
    color: "bg-blue-600",
    href: `/pdf-viewer?url=${encodeURIComponent(pdfUrl())}`,
  },
  {
    title: "Download PDF",
    icon: "⬇",
    color: "bg-green-600",
    href: pdfUrl(),
  },
  {
    title: "Worksheet",
    icon: "📝",
    color: "bg-orange-600",
    href: "#",
  },
  {
    title: "Notes",
    icon: "📒",
    color: "bg-yellow-600",
    href: "#",
  },
  {
    title: "PPT",
    icon: "📊",
    color: "bg-purple-600",
    href: "#",
  },
  {
    title: "Video",
    icon: "🎥",
    color: "bg-red-600",
    href: "#",
  },
  {
    title: "Question Bank",
    icon: "❓",
    color: "bg-pink-600",
    href: "#",
  },
  {
    title: "Sample Paper",
    icon: "📄",
    color: "bg-indigo-600",
    href: "#",
  },
];

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="bg-gradient-to-r from-indigo-700 to-blue-700 text-white py-12">

        <div className="max-w-7xl mx-auto px-8">

          <h1 className="text-5xl font-bold">
            Chapter {chapterId}
          </h1>

          <p className="text-xl mt-3">
            Digital Learning Hub
          </p>

        </div>

      </div>

      <div className="max-w-7xl mx-auto p-8">

        {loading ? (
          <div className="text-center text-xl">
            Loading...
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

              {cards.map((card) => (

                <Link
                  key={card.title}
                  href={card.href}
                  target={card.title === "Download PDF" ? "_blank" : "_self"}
                >

                  <div
                    className={`${card.color} text-white rounded-2xl p-8 hover:scale-105 transition shadow-lg`}
                  >

                    <div className="text-6xl">
                      {card.icon}
                    </div>

                    <h2 className="mt-5 text-2xl font-bold">
                      {card.title}
                    </h2>

                  </div>

                </Link>

              ))}

            </div>

            <div className="mt-12 bg-white rounded-2xl shadow p-8">

              <h2 className="text-3xl font-bold mb-6">
                Chapter Resources
              </h2>

              {resources.length === 0 ? (
                <p>No resources uploaded.</p>
              ) : (
                <div className="space-y-4">

                  {resources.map((resource) => (

                    <div
                      key={resource.id}
                      className="border rounded-xl p-5 flex justify-between items-center"
                    >

                      <div>

                        <h3 className="font-bold text-lg">
                          {resource.title}
                        </h3>

                        <p className="text-slate-500">
                          {resource.resource_type}
                        </p>

                      </div>

                      <Link
                        href={
                          resource.file_url
  ? `/pdf-viewer?url=${encodeURIComponent(
      supabase.storage
        .from("library")
        .getPublicUrl(resource.file_url)
        .data.publicUrl
    )}`
  : `/pdf-viewer?url=${encodeURIComponent(pdfUrl())}`
                        }
                        className="bg-indigo-600 text-white px-5 py-3 rounded-lg"
                      >
                        Open
                      </Link>

                    </div>

                  ))}

                </div>
              )}

            </div>

          </>
        )}

      </div>

    </div>
  );
}