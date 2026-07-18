"use client";

import { useState, useEffect } from "react";
import QuestionForm from "./QuestionForm";

type Props = {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  question: any;

  classes: any[];
  subjects: any[];
  books: any[];
  chapters: any[];
};

export default function EditQuestionModal({
  open,
  onClose,
  onSaved,
  question,
  classes,
  subjects,
  books,
  chapters,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<any>({});

  useEffect(() => {
    if (question) {
      setForm(question);
    }
  }, [question]);

  if (!open) return null;

  async function save() {
    setLoading(true);

    const res = await fetch(
      `/api/question-bank/${question.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();

    setLoading(false);

    if (data.success) {
      onSaved();
      onClose();
    } else {
      alert(data.error);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl p-8 w-[1100px] max-h-[95vh] overflow-auto">

        <h2 className="text-3xl font-bold mb-6">
          Edit Question
        </h2>

        <QuestionForm
          classes={classes}
          subjects={subjects}
          books={books}
          chapters={chapters}
          form={form}
          setForm={setForm}
        />

        <div className="flex justify-end gap-4 mt-8">

          <button
            onClick={onClose}
            className="border px-5 py-2 rounded-xl"
          >
            Cancel
          </button>

          <button
            onClick={save}
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-xl"
          >
            {loading ? "Saving..." : "Update Question"}
          </button>

        </div>

      </div>

    </div>
  );
}