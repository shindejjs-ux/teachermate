"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Pencil, Trash2, Plus, Search } from "lucide-react";

type ClassItem = {
  id: number;
  board_id: number;
  name: string;
};

export default function ClassesPage() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<ClassItem | null>(null);

  const [name, setName] = useState("");
  const [boardId, setBoardId] = useState(1);

  async function loadClasses() {
    setLoading(true);

    const { data, error } = await supabase
      .from("classes")
      .select("*")
      .order("id");

    if (!error) {
      setClasses(data || []);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadClasses();
  }, []);

  const filtered = useMemo(() => {
    return classes.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [classes, search]);

  function openAdd() {
    setEditing(null);
    setName("");
    setBoardId(1);
    setShowModal(true);
  }

  function openEdit(item: ClassItem) {
    setEditing(item);
    setName(item.name);
    setBoardId(item.board_id);
    setShowModal(true);
  }

  async function saveClass() {
    if (!name.trim()) {
      alert("Enter class name");
      return;
    }

    if (editing) {
      await supabase
        .from("classes")
        .update({
          name,
          board_id: boardId,
        })
        .eq("id", editing.id);
    } else {
      await supabase.from("classes").insert({
        name,
        board_id: boardId,
      });
    }

    setShowModal(false);
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
    <div className="min-h-screen bg-slate-100">

      <div className="bg-indigo-700 text-white p-8 shadow">

        <h1 className="text-4xl font-bold">
          Classes
        </h1>

        <p className="opacity-90 mt-2">
          Manage all CBSE Classes
        </p>

      </div>

      <div className="p-8">

        <div className="flex justify-between mb-6">

          <div className="relative w-96">

            <Search
              className="absolute left-3 top-3 text-gray-500"
              size={18}
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search class..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border bg-white"
            />

          </div>

          <button
            onClick={openAdd}
            className="bg-indigo-600 text-white px-5 py-3 rounded-xl flex gap-2 items-center"
          >
            <Plus size={18} />
            Add Class
          </button>

        </div>

        <div className="bg-white rounded-2xl shadow">

          <table className="w-full">

            <thead>

              <tr className="border-b bg-slate-50">

                <th className="p-4 text-left">ID</th>

                <th className="p-4 text-left">
                  Class
                </th>

                <th className="p-4 text-left">
                  Board
                </th>

                <th className="p-4 text-right">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {loading && (
                <tr>
                  <td
                    colSpan={4}
                    className="p-8 text-center"
                  >
                    Loading...
                  </td>
                </tr>
              )}

              {!loading &&
                filtered.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b hover:bg-slate-50"
                  >
                    <td className="p-4">{item.id}</td>

                    <td className="p-4 font-semibold">
                      {item.name}
                    </td>

                    <td className="p-4">
                      {item.board_id}
                    </td>

                    <td className="p-4">

                      <div className="flex justify-end gap-2">

                        <button
                          onClick={() => openEdit(item)}
                          className="p-2 rounded bg-blue-600 text-white"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => deleteClass(item.id)}
                          className="p-2 rounded bg-red-600 text-white"
                        >
                          <Trash2 size={16} />
                        </button>

                      </div>

                    </td>

                  </tr>
                ))}

            </tbody>

          </table>

        </div>

      </div>

      {showModal && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

          <div className="bg-white w-[420px] rounded-2xl p-6">

            <h2 className="text-2xl font-bold mb-6">

              {editing ? "Edit Class" : "Add Class"}

            </h2>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Class Name"
              className="border rounded-lg w-full p-3 mb-4"
            />

            <input
              type="number"
              value={boardId}
              onChange={(e) =>
                setBoardId(Number(e.target.value))
              }
              className="border rounded-lg w-full p-3 mb-6"
            />

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 border rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={saveClass}
                className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
              >
                Save
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}