"use client";

import { useState } from "react";

export type Question = {
  id: number;
  question: string;
  marks: number;
  difficulty: string;
  question_type: string;
  blooms_level: string;
  competency: boolean;
};

type Props = {
  questions: Question[];
  onEdit: (question: Question) => void;
  onDelete: (id: number) => void;
};

export default function QuestionTable({
  questions,
  onEdit,
  onDelete,
}: Props) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  async function deleteQuestion(id: number) {
    if (!confirm("Are you sure you want to delete this question?")) {
      return;
    }

    try {
      setDeletingId(id);

      const res = await fetch(`/api/question-bank/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        onDelete(id);
      } else {
        alert(data.error || "Failed to delete question.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setDeletingId(null);
    }
  }

  if (questions.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-500">
        No questions found.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow overflow-x-auto">

      <table className="min-w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="px-4 py-3 text-left">Question</th>

            <th className="px-4 py-3">Type</th>

            <th className="px-4 py-3">Marks</th>

            <th className="px-4 py-3">Difficulty</th>

            <th className="px-4 py-3">Bloom</th>

            <th className="px-4 py-3">Competency</th>

            <th className="px-4 py-3">Actions</th>

          </tr>

        </thead>

        <tbody>

          {questions.map((q) => (

            <tr
              key={q.id}
              className="border-t hover:bg-slate-50"
            >

              <td className="px-4 py-3 max-w-lg">
                <div className="line-clamp-2">
                  {q.question}
                </div>
              </td>

              <td className="text-center">
                {q.question_type}
              </td>

              <td className="text-center">
                {q.marks}
              </td>

              <td className="text-center">

                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium
                    ${
                      q.difficulty === "Hard"
                        ? "bg-red-100 text-red-700"
                        : q.difficulty === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                >
                  {q.difficulty}
                </span>

              </td>

              <td className="text-center">
                {q.blooms_level}
              </td>

              <td className="text-center text-xl">
                {q.competency ? "✅" : "—"}
              </td>

              <td className="text-center space-x-2">

                <button
                  onClick={() => onEdit(q)}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteQuestion(q.id)}
                  disabled={deletingId === q.id}
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white rounded-lg"
                >
                  {deletingId === q.id
                    ? "Deleting..."
                    : "Delete"}
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}