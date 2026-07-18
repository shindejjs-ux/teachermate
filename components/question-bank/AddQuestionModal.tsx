"use client";

import { useEffect, useState } from "react";

type Option = {
  id: number;
  name: string;
};

type Book = {
  id: number;
  title: string;
};

type Chapter = {
  id: number;
  title: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
};

export default function AddQuestionModal({
  open,
  onClose,
  onSaved,
}: Props) {
  const [classes, setClasses] = useState<Option[]>([]);
  const [subjects, setSubjects] = useState<Option[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [chapters, setChapters] = useState<Chapter[]>([]);

  const [form, setForm] = useState({
    class_id: "",
    subject_id: "",
    book_id: "",
    chapter_id: "",
    question: "",
    answer: "",
    marks: 1,
    difficulty: "Medium",
    question_type: "MCQ",
    blooms_level: "Remember",
    competency: false,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) return;

    loadDropdowns();
  }, [open]);

  async function loadDropdowns() {
    const [c, s, b, ch] = await Promise.all([
      fetch("/api/classes").then((r) => r.json()),
      fetch("/api/subjects").then((r) => r.json()),
      fetch("/api/books").then((r) => r.json()),
      fetch("/api/chapters").then((r) => r.json()),
    ]);

    setClasses(c.data || []);
    setSubjects(s.data || []);
    setBooks(b.data || []);
    setChapters(ch.data || []);
  }

  function updateField(name: string, value: any) {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function saveQuestion() {
    setLoading(true);

    const res = await fetch("/api/question-bank", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    setLoading(false);

    if (data.success) {
      alert("Question Saved");

      onSaved();

      onClose();
    } else {
      alert(data.error);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl p-8 w-full max-w-5xl max-h-[90vh] overflow-y-auto">

        <h2 className="text-3xl font-bold mb-6">
          Add Question
        </h2>

        <div className="grid md:grid-cols-2 gap-5">

          <select
            value={form.class_id}
            onChange={(e) =>
              updateField("class_id", e.target.value)
            }
            className="border rounded-xl p-3"
          >
            <option>Select Class</option>

            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={form.subject_id}
            onChange={(e) =>
              updateField("subject_id", e.target.value)
            }
            className="border rounded-xl p-3"
          >
            <option>Select Subject</option>

            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          <select
            value={form.book_id}
            onChange={(e) =>
              updateField("book_id", e.target.value)
            }
            className="border rounded-xl p-3"
          >
            <option>Select Book</option>

            {books.map((b) => (
              <option key={b.id} value={b.id}>
                {b.title}
              </option>
            ))}
          </select>

          <select
            value={form.chapter_id}
            onChange={(e) =>
              updateField("chapter_id", e.target.value)
            }
            className="border rounded-xl p-3"
          >
            <option>Select Chapter</option>

            {chapters.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>

        </div>

        <textarea
          className="border rounded-xl p-3 w-full mt-5"
          rows={5}
          placeholder="Question"
          value={form.question}
          onChange={(e) =>
            updateField("question", e.target.value)
          }
        />

        <textarea
          className="border rounded-xl p-3 w-full mt-5"
          rows={4}
          placeholder="Answer"
          value={form.answer}
          onChange={(e) =>
            updateField("answer", e.target.value)
          }
        />

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="border px-6 py-3 rounded-xl"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={saveQuestion}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
          >
            {loading ? "Saving..." : "Save Question"}
          </button>

        </div>

      </div>

    </div>
  );
}