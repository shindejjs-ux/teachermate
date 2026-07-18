"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
export default function ChapterHub() {
  const [boards, setBoards] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [chapters, setChapters] = useState<any[]>([]);

  const [selectedBoard, setSelectedBoard] = useState<number | null>(null);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);

  useEffect(() => {
    loadBoards();
  }, []);

  async function loadBoards() {
    const { data } = await supabase.from("boards").select("*");
    setBoards(data || []);
  }

  async function loadClasses(boardId: number) {
    setSelectedBoard(boardId);
    const { data } = await supabase
      .from("classes")
      .select("*")
      .eq("board_id", boardId);

    setClasses(data || []);
    setSubjects([]);
    setChapters([]);
  }

  async function loadSubjects(classId: number) {
    setSelectedClass(classId);

    const { data } = await supabase
      .from("subjects")
      .select("*")
      .eq("class_id", classId);

    setSubjects(data || []);
    setChapters([]);
  }

  async function loadChapters(subjectId: number) {
  setSelectedSubject(subjectId);

  const { data: books } = await supabase
    .from("books")
    .select("id")
    .eq("subject_id", subjectId);

  if (!books || books.length === 0) {
    setChapters([]);
    return;
  }

  const { data } = await supabase
    .from("chapters")
    .select("*")
    .eq("book_id", books[0].id)
    .order("chapter_no");

  setChapters(data || []);
}
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-indigo-700 mb-8">
        Chapter Hub
      </h1>

      <div className="grid md:grid-cols-4 gap-6">

        <div>
          <h2 className="font-bold mb-3">Boards</h2>

          {boards.map((board) => (
            <button
              key={board.id}
              onClick={() => loadClasses(board.id)}
              className="block w-full mb-2 p-3 bg-indigo-100 rounded-lg"
            >
              {board.name}
            </button>
          ))}
        </div>

        <div>
          <h2 className="font-bold mb-3">Classes</h2>

          {classes.map((cls) => (
            <button
              key={cls.id}
              onClick={() => loadSubjects(cls.id)}
              className="block w-full mb-2 p-3 bg-blue-100 rounded-lg"
            >
              {cls.class_name}
            </button>
          ))}
        </div>

        <div>
          <h2 className="font-bold mb-3">Subjects</h2>

          {subjects.map((sub) => (
            <button
              key={sub.id}
              onClick={() => loadChapters(sub.id)}
              className="block w-full mb-2 p-3 bg-green-100 rounded-lg"
            >
              {sub.subject_name}
            </button>
          ))}
        </div>

        <div>
          <h2 className="font-bold mb-3">Chapters</h2>

          
          {chapters.map((chapter) => (
  <Link
    key={chapter.id}
    href={`/chapter-hub/${chapter.id}`}
  >
    <div className="mb-3 p-4 bg-purple-100 rounded-xl cursor-pointer hover:bg-purple-200 transition">
      <div className="font-semibold">
        {chapter.chapter_no}. {chapter.chapter_name}
      </div>
    </div>
  </Link>
))}
        </div>

      </div>
    </div>
  );
}