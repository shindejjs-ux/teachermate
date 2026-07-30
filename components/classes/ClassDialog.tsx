"use client";

import { useEffect, useState } from "react";
import {
  createClass,
  updateClass,
  SchoolClass,
} from "@/lib/services/classes";
import { getBoards, Board } from "@/lib/services/boards";

type Props = {
  schoolClass?: SchoolClass;
  onClose: () => void;
  onSuccess: () => void;
};

export default function ClassDialog({
  schoolClass,
  onClose,
  onSuccess,
}: Props) {
  const [boards, setBoards] = useState<Board[]>([]);
  const [boardId, setBoardId] = useState<number>(
    schoolClass?.board_id ?? 1
  );
  const [name, setName] = useState(
    schoolClass?.name ?? ""
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadBoards() {
      const data = await getBoards();
      setBoards(data);
    }

    loadBoards();
  }, []);

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      if (schoolClass) {
        await updateClass(schoolClass.id, {
          board_id: boardId,
          name,
        });
      } else {
        await createClass({
          board_id: boardId,
          name,
        });
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Unable to save class.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        <h2 className="mb-6 text-2xl font-bold">
          {schoolClass ? "Edit Class" : "Add Class"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>

            <label className="mb-2 block">
              Board
            </label>

            <select
              value={boardId}
              onChange={(e) =>
                setBoardId(Number(e.target.value))
              }
              className="w-full rounded-lg border p-3"
            >
              {boards.map((board) => (
                <option
                  key={board.id}
                  value={board.id}
                >
                  {board.name}
                </option>
              ))}
            </select>

          </div>

          <div>

            <label className="mb-2 block">
              Class Name
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Class 9"
              className="w-full rounded-lg border p-3"
              required
            />

          </div>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              {loading
                ? "Saving..."
                : "Save"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}