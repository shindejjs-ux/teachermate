"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  Board,
  getBoards,
  deleteBoard,
} from "@/lib/services/boards";
import BoardDialog from "@/components/boards/BoardDialog";

export default function BoardTable() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [selectedBoard, setSelectedBoard] =
    useState<Board | undefined>();

  async function loadBoards() {
    try {
      setLoading(true);

      const data = await getBoards();

      setBoards(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadBoards();
  }, []);

  async function handleDelete(board: Board) {
    const ok = window.confirm(
      `Delete "${board.name}"?`
    );

    if (!ok) return;

    try {
      await deleteBoard(board.id);
      loadBoards();
    } catch (error) {
      console.error(error);
      alert("Unable to delete board.");
    }
  }

  const filteredBoards = boards.filter(
    (board) =>
      board.name
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      board.code
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <>
      <div className="rounded-xl bg-white shadow">

        <div className="flex flex-col gap-4 border-b p-6 md:flex-row md:items-center md:justify-between">

          <input
            type="text"
            placeholder="Search board..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-lg border px-4 py-2 md:w-80"
          />

          <button
            onClick={() => {
              setSelectedBoard(undefined);
              setOpen(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white"
          >
            <Plus size={18} />

            Add Board
          </button>

        </div>

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-6 py-3 text-left">
                ID
              </th>

              <th className="px-6 py-3 text-left">
                Name
              </th>

              <th className="px-6 py-3 text-left">
                Code
              </th>

              <th className="px-6 py-3 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {loading ? (
              <tr>

                <td
                  colSpan={4}
                  className="p-6 text-center"
                >
                  Loading...
                </td>

              </tr>
            ) : filteredBoards.length === 0 ? (
              <tr>

                <td
                  colSpan={4}
                  className="p-6 text-center"
                >
                  No boards found.
                </td>

              </tr>
            ) : (
              filteredBoards.map((board) => (
                <tr
                  key={board.id}
                  className="border-t hover:bg-slate-50"
                >
                  <td className="px-6 py-4">
                    {board.id}
                  </td>

                  <td className="px-6 py-4">
                    {board.name}
                  </td>

                  <td className="px-6 py-4">
                    {board.code}
                  </td>

                  <td className="px-6 py-4">

                    <div className="flex justify-center gap-4">

                      <button
                        onClick={() => {
                          setSelectedBoard(board);
                          setOpen(true);
                        }}
                        className="text-blue-600"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(board)
                        }
                        className="text-red-600"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>
              ))
            )}

          </tbody>

        </table>

      </div>

      {open && (
        <BoardDialog
          board={selectedBoard}
          onClose={() => setOpen(false)}
          onSuccess={loadBoards}
        />
      )}
    </>
  );
}