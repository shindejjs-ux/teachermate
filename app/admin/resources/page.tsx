"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Item = {
  id: number;
  name?: string;
  title?: string;
};

export default function AdminResources() {
  const [classes, setClasses] = useState<Item[]>([]);
  const [subjects, setSubjects] = useState<Item[]>([]);
  const [books, setBooks] = useState<Item[]>([]);
  const [chapters, setChapters] = useState<Item[]>([]);

  const [classId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [bookId, setBookId] = useState("");
  const [chapterId, setChapterId] = useState("");

  const [title, setTitle] = useState("");
  const [resourceType, setResourceType] = useState("pdf");
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    loadClasses();
  }, []);

  useEffect(() => {
    if (classId) loadSubjects();
  }, [classId]);

  useEffect(() => {
    if (subjectId) loadBooks();
  }, [subjectId]);

  useEffect(() => {
    if (bookId) loadChapters();
  }, [bookId]);

  async function loadClasses() {
    const { data } = await supabase
      .from("classes")
      .select("id,name")
      .order("id");

    setClasses(data || []);
  }

  async function loadSubjects() {
    const { data } = await supabase
      .from("subjects")
      .select("id,name")
      .eq("class_id", classId)
      .order("id");

    setSubjects(data || []);
  }

  async function loadBooks() {
    const { data } = await supabase
      .from("books")
      .select("id,title")
      .eq("subject_id", subjectId)
      .order("id");

    setBooks(data || []);
  }

  async function loadChapters() {
    const { data } = await supabase
      .from("chapters")
      .select("id,title")
      .eq("book_id", bookId)
      .order("chapter_no");

    setChapters(data || []);
  }

  async function saveResource() {
    const { error } = await supabase.from("resources").insert({
      chapter_id: Number(chapterId),
      title,
      resource_type: resourceType,
      file_url: fileUrl,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Resource Added Successfully!");

    setTitle("");
    setFileUrl("");
  }

  return (
    <div className="max-w-3xl mx-auto p-8">

      <h1 className="text-4xl font-bold text-indigo-700 mb-8">
        Add Resource
      </h1>

      <div className="grid gap-4">

        <select
          value={classId}
          onChange={(e) => setClassId(e.target.value)}
          className="border rounded-lg p-3"
        >
          <option value="">Select Class</option>
          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          className="border rounded-lg p-3"
        >
          <option value="">Select Subject</option>
          {subjects.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <select
          value={bookId}
          onChange={(e) => setBookId(e.target.value)}
          className="border rounded-lg p-3"
        >
          <option value="">Select Book</option>
          {books.map((b) => (
            <option key={b.id} value={b.id}>
              {b.title}
            </option>
          ))}
        </select>

        <select
          value={chapterId}
          onChange={(e) => setChapterId(e.target.value)}
          className="border rounded-lg p-3"
        >
          <option value="">Select Chapter</option>
          {chapters.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>

        <input
          className="border rounded-lg p-3"
          placeholder="Resource Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          value={resourceType}
          onChange={(e) => setResourceType(e.target.value)}
          className="border rounded-lg p-3"
        >
          <option value="pdf">PDF</option>
          <option value="worksheet">Worksheet</option>
          <option value="notes">Notes</option>
          <option value="lesson_plan">Lesson Plan</option>
          <option value="video">Video</option>
        </select>

        <input
          className="border rounded-lg p-3"
          placeholder="/pdfs/class9/english/ch1.pdf"
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
        />

        <button
          onClick={saveResource}
          className="bg-indigo-600 text-white rounded-lg p-3 hover:bg-indigo-700"
        >
          Save Resource
        </button>

      </div>
    </div>
  );
}