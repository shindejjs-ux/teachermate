"use client";

import { importClasses } from "@/lib/importers/classes";
import { importBooks } from "@/lib/importers/books";
import { importBookTypes } from "@/lib/importers/bookTypes";
import { importSubjects } from "@/lib/importers/subjects";

export default function MasterDataPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Master Data Import
        </h1>

        <p className="mt-2 text-slate-500">
          Import complete CBSE 2026–27 academic database.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

        {/* Classes */}
        <button
          onClick={async () => {
            const result = await importClasses();
            alert(result.message);
          }}
          className="rounded-xl bg-indigo-600 p-6 text-white hover:bg-indigo-700"
        >
          📚 Import Classes
        </button>

        {/* Subjects */}
        <button
          onClick={async () => {
            const result = await importSubjects();
            alert(result.message);
          }}
          className="rounded-xl bg-green-600 p-6 text-white hover:bg-green-700"
        >
          📖 Import Subjects
        </button>

        {/* Book Types */}
        <button
          onClick={async () => {
            const result = await importBookTypes();
            alert(result.message);
          }}
          className="rounded-xl bg-purple-600 p-6 text-white hover:bg-purple-700"
        >
          📘 Import Book Types
        </button>

        {/* Books */}
       <button
  onClick={async () => {
    const result = await importBooks();
    alert(result.message);
  }}
  className="rounded-xl bg-orange-600 p-6 text-white hover:bg-orange-700"
>
  📚 Import Books
</button>

        {/* Chapters */}
        <button
          className="rounded-xl bg-pink-600 p-6 text-white hover:bg-pink-700"
        >
          📑 Import Chapters
        </button>

        {/* Resources */}
        <button
          className="rounded-xl bg-cyan-600 p-6 text-white hover:bg-cyan-700"
        >
          📄 Import Resources
        </button>

      </div>
    </div>
  );
}