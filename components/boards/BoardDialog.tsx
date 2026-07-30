"use client";

import { useState } from "react";
import { Board, createBoard, updateBoard } from "@/lib/services/boards";

type BoardDialogProps = {
  board?: Board;
  onClose: () => void;
  onSuccess: () => void;
};

export default function BoardDialog({
  board,
  onClose,
  onSuccess,
}: BoardDialogProps) {
  const [name, setName] = useState(board?.name ?? "");
  const [code, setCode] = useState(board?.code ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      if (board) {
        await updateBoard(board.id, {
          name,
          code,
        });
      } else {
        await createBoard({
          name,
          code,
        });
      }

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="mb-6 text-2xl font-bold">
          {board ? "Edit Board" : "Add Board"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <div>
            <label className="mb-1 block text-sm font-medium">
              Board Name
            </label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-lg border p-3"
              placeholder="CBSE"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Board Code
            </label>

            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full rounded-lg border p-3"
              placeholder="CBSE"
              required
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}

          <div className="flex justify-end gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : board
                ? "Update"
                : "Save"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}