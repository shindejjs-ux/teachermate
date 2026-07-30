"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase-browser";

type Board = {
  id: number;
  name: string;
};

export default function EditClassPage() {
  const router = useRouter();
  const params = useParams();

  const id = Number(params.id);

  const [boards, setBoards] = useState<Board[]>([]);
  const [boardId, setBoardId] = useState(1);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadBoards();
    loadClass();
  }, []);

  async function loadBoards() {
    const { data } = await supabase
      .from("boards")
      .select("id,name")
      .order("id");

    setBoards(data || []);
  }

  async function loadClass() {
    const { data } = await supabase
      .from("classes")
      .select("*")
      .eq("id", id)
      .single();

    if (data) {
      setName(data.name);
      setBoardId(data.board_id);
    }
  }

  async function updateClass() {
    setLoading(true);

    const { error } = await supabase
      .from("classes")
      .update({
        board_id: boardId,
        name,
      })
      .eq("id", id);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/admin/classes");
  }

  return (
    <div className="max-w-xl space-y-6">
      <h1 className="text-3xl font-bold">
        Edit Class
      </h1>

      <div>
        <label>Board</label>

        <select
          value={boardId}
          onChange={(e) =>
            setBoardId(Number(e.target.value))
          }
          className="w-full rounded border p-3"
        >
          {boards.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label>Class Name</label>

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          className="w-full rounded border p-3"
        />
      </div>

      <button
        onClick={updateClass}
        disabled={loading}
        className="rounded bg-indigo-600 px-6 py-3 text-white"
      >
        {loading ? "Updating..." : "Update Class"}
      </button>
    </div>
  );
}