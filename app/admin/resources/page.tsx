"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

type ClassRecord = {
  id: number;
  name: string;
};

type SubjectRecord = {
  id: number;
  name: string;
};

type BookRecord = {
  id: number;
  title: string;
};

type ChapterRecord = {
  id: number;
  chapter_no: number;
  title: string;
};

type ResourceRecord = {
  id: number;
  chapter_id: number | null;
  title: string;
  resource_type: string;
  file_url: string | null;
  storage_type: string | null;
  file_size: number | null;
  display_order: number | null;
  is_active: boolean | null;
};

const RESOURCE_TYPES = [
  { value: "pdf", label: "PDF" },
  { value: "chapter_pdf", label: "Chapter PDF" },
  { value: "notes", label: "Notes" },
  { value: "worksheet", label: "Worksheet" },
  { value: "ppt", label: "PPT" },
  { value: "video", label: "Video" },
  { value: "question_bank", label: "Question Bank" },
  { value: "lesson_plan", label: "Lesson Plan" },
];

export default function AdminResourcesPage() {
  const [classes, setClasses] = useState<ClassRecord[]>([]);
  const [subjects, setSubjects] = useState<SubjectRecord[]>([]);
  const [books, setBooks] = useState<BookRecord[]>([]);
  const [chapters, setChapters] = useState<ChapterRecord[]>([]);
  const [resources, setResources] = useState<ResourceRecord[]>([]);

  const [classId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [bookId, setBookId] = useState("");
  const [chapterId, setChapterId] = useState("");

  const [resourceType, setResourceType] = useState("pdf");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingResources, setLoadingResources] = useState(true);

  useEffect(() => {
    loadClasses();
    loadResources();
  }, []);

  useEffect(() => {
    if (!classId) {
      setSubjects([]);
      setSubjectId("");
      return;
    }

    loadSubjects(Number(classId));
  }, [classId]);

  useEffect(() => {
    if (!subjectId) {
      setBooks([]);
      setBookId("");
      return;
    }

    loadBooks(Number(subjectId));
  }, [subjectId]);

  useEffect(() => {
    if (!bookId) {
      setChapters([]);
      setChapterId("");
      return;
    }

    loadChapters(Number(bookId));
  }, [bookId]);

  useEffect(() => {
    if (!chapterId) return;

    const chapter = chapters.find(
      (item) => item.id === Number(chapterId)
    );

    if (!chapter) return;

    const typeName =
      RESOURCE_TYPES.find(
        (item) => item.value === resourceType
      )?.label ?? "Resource";

    setTitle(`${chapter.title} - ${typeName}`);
  }, [chapterId, resourceType, chapters]);

  async function loadClasses() {
    const { data, error } = await supabase
      .from("classes")
      .select("id,name")
      .order("id", { ascending: true });

    if (error) {
      console.error("Classes error:", error);
      return;
    }

    setClasses(data ?? []);
  }

  async function loadSubjects(selectedClassId: number) {
    setSubjectId("");
    setSubjects([]);
    setBooks([]);
    setChapters([]);

    const { data, error } = await supabase
      .from("subjects")
      .select("id,name")
      .eq("class_id", selectedClassId)
      .order("name", { ascending: true });

    if (error) {
      console.error("Subjects error:", error);
      return;
    }

    setSubjects(data ?? []);
  }

  async function loadBooks(selectedSubjectId: number) {
    setBookId("");
    setBooks([]);
    setChapters([]);

    const { data, error } = await supabase
      .from("books")
      .select("id,title")
      .eq("subject_id", selectedSubjectId)
      .order("title", { ascending: true });

    if (error) {
      console.error("Books error:", error);
      return;
    }

    setBooks(data ?? []);
  }

  async function loadChapters(selectedBookId: number) {
    setChapterId("");
    setChapters([]);

    const { data, error } = await supabase
      .from("chapters")
      .select("id,chapter_no,title")
      .eq("book_id", selectedBookId)
      .order("chapter_no", { ascending: true });

    if (error) {
      console.error("Chapters error:", error);
      return;
    }

    setChapters(data ?? []);
  }

  async function loadResources() {
    setLoadingResources(true);

    const { data, error } = await supabase
      .from("resources")
      .select(
        "id,chapter_id,title,resource_type,file_url,storage_type,file_size,display_order,is_active"
      )
      .order("id", { ascending: false });

    if (error) {
      console.error("Resources error:", error);
      setLoadingResources(false);
      return;
    }

    setResources(data ?? []);
    setLoadingResources(false);
  }

  function resetForm() {
    setClassId("");
    setSubjectId("");
    setBookId("");
    setChapterId("");
    setSubjects([]);
    setBooks([]);
    setChapters([]);
    setResourceType("pdf");
    setTitle("");
    setFile(null);
  }

  async function uploadResource() {
    if (!classId) {
      alert("Select Class");
      return;
    }

    if (!subjectId) {
      alert("Select Subject");
      return;
    }

    if (!bookId) {
      alert("Select Book");
      return;
    }

    if (!chapterId) {
      alert("Select Chapter");
      return;
    }

    if (!title.trim()) {
      alert("Enter Resource Title");
      return;
    }

    if (!file) {
      alert("Select PDF");
      return;
    }

    if (file.type !== "application/pdf") {
      alert("Please select a PDF file.");
      return;
    }

    setLoading(true);

    try {
      const extension = file.name
        .split(".")
        .pop()
        ?.toLowerCase() || "pdf";

      const safeFileName = file.name
        .replace(/\.[^/.]+$/, "")
        .replace(/[^a-zA-Z0-9-_]/g, "-")
        .replace(/-+/g, "-")
        .toLowerCase();

      const storagePath =
        `books/${bookId}/chapter-${chapterId}/${Date.now()}-${safeFileName}.${extension}`;

      const { error: uploadError } =
        await supabase.storage
          .from("textbooks")
          .upload(storagePath, file, {
            upsert: false,
            contentType: "application/pdf",
          });

      if (uploadError) {
        throw uploadError;
      }

      const {
        data: publicUrlData,
      } = supabase.storage
        .from("textbooks")
        .getPublicUrl(storagePath);

      const fileUrl = publicUrlData.publicUrl;

      const { data: lastResource, error: orderError } =
        await supabase
          .from("resources")
          .select("display_order")
          .eq("chapter_id", Number(chapterId))
          .order("display_order", {
            ascending: false,
          })
          .limit(1);

      if (orderError) {
        throw orderError;
      }

      const nextDisplayOrder =
        lastResource && lastResource.length > 0
          ? (lastResource[0].display_order ?? 0) + 1
          : 1;

      const { error: insertError } =
        await supabase
          .from("resources")
          .insert({
            chapter_id: Number(chapterId),
            title: title.trim(),
            resource_type: resourceType,
            file_url: fileUrl,
            storage_type: "supabase",
            file_size: file.size,
            display_order: nextDisplayOrder,
            is_active: true,
          });

      if (insertError) {
        throw insertError;
      }

      alert("Resource uploaded successfully.");

      resetForm();
      await loadResources();
    } catch (error) {
      console.error("Upload error:", error);

      const message =
        error instanceof Error
          ? error.message
          : "Failed to upload resource.";

      alert(message);
    } finally {
      setLoading(false);
    }
  }

  async function deleteResource(resource: ResourceRecord) {
    const confirmed = window.confirm(
      `Delete "${resource.title}"?`
    );

    if (!confirmed) return;

    setLoading(true);

    try {
      if (resource.file_url) {
        const marker =
          "/storage/v1/object/public/textbooks/";

        const markerIndex =
          resource.file_url.indexOf(marker);

        if (markerIndex !== -1) {
          const storagePath =
            resource.file_url.substring(
              markerIndex + marker.length
            );

          const { error: storageError } =
            await supabase.storage
              .from("textbooks")
              .remove([storagePath]);

          if (storageError) {
            console.warn(
              "Storage delete warning:",
              storageError
            );
          }
        }
      }

      const { error } = await supabase
        .from("resources")
        .delete()
        .eq("id", resource.id);

      if (error) {
        throw error;
      }

      await loadResources();
    } catch (error) {
      console.error("Delete error:", error);

      const message =
        error instanceof Error
          ? error.message
          : "Failed to delete resource.";

      alert(message);
    } finally {
      setLoading(false);
    }
  }

  const filteredResources = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return resources;

    return resources.filter((resource) =>
      resource.title
        ?.toLowerCase()
        .includes(query)
    );
  }, [resources, search]);

  const pdfCount = resources.filter(
    (resource) =>
      resource.resource_type === "pdf" ||
      resource.resource_type === "chapter_pdf"
  ).length;

  const activeCount = resources.filter(
    (resource) => resource.is_active !== false
  ).length;

  function formatFileSize(size: number | null) {
    if (!size) return "-";

    if (size < 1024) {
      return `${size} B`;
    }

    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="mx-auto max-w-7xl p-6 md:p-8">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            📚 Resource Manager
          </h1>

          <p className="mt-2 text-slate-500">
            Upload and manage TeacherMate learning resources.
          </p>
        </div>

        <div className="mb-8 grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-6 shadow">
            <div className="text-4xl">📚</div>
            <div className="mt-3 text-3xl font-bold">
              {resources.length}
            </div>
            <div className="text-slate-500">
              Total Resources
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <div className="text-4xl">📘</div>
            <div className="mt-3 text-3xl font-bold">
              {pdfCount}
            </div>
            <div className="text-slate-500">
              PDF Resources
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow">
            <div className="text-4xl">✅</div>
            <div className="mt-3 text-3xl font-bold">
              {activeCount}
            </div>
            <div className="text-slate-500">
              Active Resources
            </div>
          </div>

        </div>

        <div className="mb-8 rounded-2xl bg-white p-6 shadow">

          <h2 className="mb-6 text-2xl font-bold">
            Add New Resource
          </h2>

          <div className="grid gap-5 md:grid-cols-2">

            <select
              value={classId}
              onChange={(event) =>
                setClassId(event.target.value)
              }
              className="rounded-lg border p-3"
            >
              <option value="">
                Select Class
              </option>

              {classes.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </option>
              ))}
            </select>

            <select
              value={subjectId}
              onChange={(event) =>
                setSubjectId(event.target.value)
              }
              disabled={!classId}
              className="rounded-lg border p-3 disabled:bg-slate-100"
            >
              <option value="">
                Select Subject
              </option>

              {subjects.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.name}
                </option>
              ))}
            </select>

            <select
              value={bookId}
              onChange={(event) =>
                setBookId(event.target.value)
              }
              disabled={!subjectId}
              className="rounded-lg border p-3 disabled:bg-slate-100"
            >
              <option value="">
                Select Book
              </option>

              {books.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {item.title}
                </option>
              ))}
            </select>

            <select
              value={chapterId}
              onChange={(event) =>
                setChapterId(event.target.value)
              }
              disabled={!bookId}
              className="rounded-lg border p-3 disabled:bg-slate-100"
            >
              <option value="">
                Select Chapter
              </option>

              {chapters.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  Chapter {item.chapter_no} - {item.title}
                </option>
              ))}
            </select>

            <select
              value={resourceType}
              onChange={(event) =>
                setResourceType(event.target.value)
              }
              className="rounded-lg border p-3"
            >
              {RESOURCE_TYPES.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              placeholder="Resource Title"
              className="rounded-lg border p-3"
            />

            <div className="md:col-span-2">
              <label className="mb-2 block font-semibold">
                PDF File
              </label>

              <input
                type="file"
                accept="application/pdf,.pdf"
                onChange={(event) => {
                  const selectedFile =
                    event.target.files?.[0] ?? null;

                  setFile(selectedFile);
                }}
                className="block w-full rounded-lg border p-3"
              />

              {file && (
                <p className="mt-2 text-sm text-slate-500">
                  Selected:{" "}
                  <span className="font-medium">
                    {file.name}
                  </span>{" "}
                  ({formatFileSize(file.size)})
                </p>
              )}
            </div>

            <div className="flex gap-3 md:col-span-2">

              <button
                type="button"
                onClick={uploadResource}
                disabled={loading}
                className="rounded-lg bg-indigo-600 px-7 py-3 font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Uploading..."
                  : "Upload Resource"}
              </button>

              <button
                type="button"
                onClick={resetForm}
                disabled={loading}
                className="rounded-lg bg-slate-200 px-7 py-3 font-semibold text-slate-700 hover:bg-slate-300 disabled:opacity-50"
              >
                Clear
              </button>

            </div>

          </div>
        </div>

        <div className="rounded-2xl bg-white shadow">

          <div className="flex flex-col gap-4 border-b p-6 md:flex-row md:items-center md:justify-between">

            <h2 className="text-2xl font-bold">
              Existing Resources
            </h2>

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search resources..."
              className="rounded-lg border p-3 md:w-80"
            />

          </div>

          {loadingResources ? (
            <div className="p-12 text-center text-slate-500">
              Loading resources...
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-6xl">📂</div>

              <h3 className="mt-4 text-xl font-bold">
                No resources found
              </h3>

              <p className="mt-2 text-slate-500">
                Upload your first PDF above.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-slate-100">
                  <tr>
                    <th className="p-4 text-left">
                      Resource
                    </th>

                    <th className="p-4 text-left">
                      Type
                    </th>

                    <th className="p-4 text-left">
                      Size
                    </th>

                    <th className="p-4 text-center">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {filteredResources.map(
                    (resource) => (
                      <tr
                        key={resource.id}
                        className="border-t hover:bg-slate-50"
                      >

                        <td className="p-4">
                          <div className="font-semibold">
                            {resource.title}
                          </div>

                          <div className="mt-1 text-xs text-slate-400">
                            Resource ID: {resource.id}
                          </div>
                        </td>

                        <td className="p-4">
                          <span className="rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-700">
                            {resource.resource_type}
                          </span>
                        </td>

                        <td className="p-4 text-sm text-slate-500">
                          {formatFileSize(
                            resource.file_size
                          )}
                        </td>

                        <td className="p-4">
                          <div className="flex justify-center gap-2">

                            {resource.file_url && (
                              <>
                                <a
                                  href={resource.file_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="rounded bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                                >
                                  Preview
                                </a>

                                <a
                                  href={resource.file_url}
                                  download
                                  className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                >
                                  Download
                                </a>
                              </>
                            )}

                            <button
                              type="button"
                              onClick={() =>
                                deleteResource(resource)
                              }
                              disabled={loading}
                              className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
                            >
                              Delete
                            </button>

                          </div>
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}