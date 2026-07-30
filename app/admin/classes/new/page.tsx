"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-browser";

type Board = {
  id: number;
  name: string;
};

export default function NewClassPage() {
  const router = useRouter();

  const [boards, setBoards] = useState<Board[]>([]);
  const [boardId, setBoardId] = useState(1);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBoards();
  }, []);

  async function loadBoards() {
    const { data, error } = await supabase
      .from("boards")
      .select("id, name")
      .order("id");

    if (error) {
      console.error(error);
      return;
    }

    setBoards(data ?? []);

    if (data && data.length > 0) {
      setBoardId(data[0].id);
    }
  }

  async function saveClass() {
    if (!name.trim()) {
      alert("Please enter class name.");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("classes")
      .insert({
        board_id: boardId,
        name: name.trim(),
      });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/admin/classes");
  }

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-3xl font-bold">Add Class</h1>

      <div>
        <label className="mb-2 block">Board</label>

        <select
          value={boardId}
          onChange={(e) => setBoardId(Number(e.target.value))}
          className="w-full rounded-lg border p-3"
        >
          {boards.map((board) => (
            <option key={board.id} value={board.id}>
              {board.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block">Class Name</label>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Class 9"
          className="w-full rounded-lg border p-3"
        />
      </div>

      <button
        onClick={saveClass}
        disabled={loading}
        className="rounded-lg bg-indigo-600 px-6 py-3 text-white"
      >
        {loading ? "Saving..." : "Save Class"}
      </button>
    </div>
  );
}