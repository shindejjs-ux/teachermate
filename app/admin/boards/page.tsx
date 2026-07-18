"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function BoardsPage() {
  const [boards, setBoards] = useState<any[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    loadBoards();
  }, []);

  async function loadBoards() {
    const { data } = await supabase
      .from("boards")
      .select("*")
      .order("id");

    setBoards(data || []);
  }

  async function addBoard() {
    if (!name.trim()) return;

    const { error } = await supabase
      .from("boards")
      .insert([{ name }]);

    if (error) {
      alert(error.message);
      return;
    }

    setName("");
    loadBoards();
  }

  return (
    <div className="max-w-5xl mx-auto p-6">

      <h1 className="text-4xl font-bold text-indigo-700 mb-8">
        Boards Manager
      </h1>

      <div className="flex gap-4 mb-8">
        <input
          className="border rounded-xl p-3 flex-1"
          placeholder="Board Name (CBSE, ICSE...)"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button
          onClick={addBoard}
          className="bg-indigo-600 text-white px-6 rounded-xl"
        >
          Add
        </button>
      </div>

      <table className="w-full border bg-white rounded-xl shadow">
        <thead className="bg-indigo-100">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Board</th>
          </tr>
        </thead>

        <tbody>
          {boards.map((board) => (
            <tr key={board.id} className="border-t">
              <td className="p-3">{board.id}</td>
              <td className="p-3">{board.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}