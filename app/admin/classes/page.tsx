"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Board = {
  id: number;
  name: string;
};

type ClassItem = {
  id: number;
  name: string;
  board_id: number;
  // Supabase returns related rows as an array
  boards: {
    name: string;
  }[];
};

export default function ClassesPage() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [classes, setClasses] = useState<ClassItem[]>([]);

  const [boardId, setBoardId] = useState("");
  const [className, setClassName] = useState("");

  async function loadBoards() {
    const { data } = await supabase
      .from("boards")
      .select("*")
      .order("id");

    if (data) setBoards(data);
  }

  async function loadClasses() {
    const { data } = await supabase
      .from("classes")
      .select(`
        id,
        name,
        board_id,
        boards(name)
      `)
      .order("id");

    if (data) setClasses(data as ClassItem[]);
  }

  useEffect(() => {
    loadBoards();
    loadClasses();
  }, []);

  async function addClass() {
    if (!boardId || !className) {
      alert("Fill all fields");
      return;
    }

    const { error } = await supabase
      .from("classes")
      .insert({
        board_id: Number(boardId),
        name: className,
      });

    if (error) {
      alert(error.message);
      return;
    }

    setClassName("");
    setBoardId("");

    loadClasses();
  }

  async function deleteClass(id: number) {
    if (!confirm("Delete this class?")) return;

    await supabase
      .from("classes")
      .delete()
      .eq("id", id);

    loadClasses();
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Classes
        </h1>

        <p className="text-gray-500">
          Manage school classes.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">

        <select
          className="border rounded-lg p-3 w-full"
          value={boardId}
          onChange={(e)=>setBoardId(e.target.value)}
        >
          <option value="">Select Board</option>

          {boards.map((board)=>(
            <option key={board.id} value={board.id}>
              {board.name}
            </option>
          ))}

        </select>

        <input
          className="border rounded-lg p-3 w-full"
          placeholder="Class Name"
          value={className}
          onChange={(e)=>setClassName(e.target.value)}
        />

        <button
          onClick={addClass}
          className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
        >
          Add Class
        </button>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Board</th>
              <th className="p-4 text-left">Class</th>
              <th className="p-4 text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {classes.map((item)=>(

              <tr key={item.id} className="border-t">

                <td className="p-4">{item.id}</td>

                <td className="p-4">
                  {item.boards?.[0]?.name}
                </td>

                <td className="p-4">
                  {item.name}
                </td>

                <td className="p-4 text-center">

                  <button
                    onClick={()=>deleteClass(item.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}