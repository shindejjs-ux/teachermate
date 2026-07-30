"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

type ClassItem = {
  id: number;
  name: string;
};

type Subject = {
  id: number;
  name: string;
  class_id: number;
  classes: {
    id: number;
    name: string;
  }[];
};
export default function SubjectsPage() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [classId, setClassId] = useState("");
  const [subjectName, setSubjectName] = useState("");

  useEffect(() => {
    loadClasses();
    loadSubjects();
  }, []);

  async function loadClasses() {
    const { data, error } = await supabase
      .from("classes")
      .select("*")
      .order("id");

    if (!error && data) {
      setClasses(data);
    }
  }

  async function loadSubjects() {
    const { data, error } = await supabase
      .from("subjects")
      .select(`
  id,
  name,
  class_id,
  classes!inner(
    id,
    name
  )
`)
      .order("id");

    if (!error && data) {
      setSubjects(data as Subject[]);
    }
  }

  async function addSubject() {
    if (!classId || !subjectName) {
      alert("Please fill all fields.");
      return;
    }

    const { error } = await supabase
      .from("subjects")
      .insert({
        class_id: Number(classId),
        name: subjectName,
      });

    if (error) {
      alert(error.message);
      return;
    }

    setClassId("");
    setSubjectName("");
    loadSubjects();
  }

  async function deleteSubject(id: number) {
    if (!confirm("Delete this subject?")) return;

    const { error } = await supabase
      .from("subjects")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    loadSubjects();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          Subjects
        </h1>

        <p className="text-gray-500 mt-2">
          Manage subjects for each class.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">

        <select
          className="border rounded-lg p-3 w-full"
          value={classId}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setClassId(e.target.value)}
        >
          <option value="">Select Class</option>

          {classes.map((item: ClassItem) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}

        </select>

        <input
          className="border rounded-lg p-3 w-full"
          placeholder="Subject Name"
          value={subjectName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSubjectName(e.target.value)}
        />

        <button
          onClick={addSubject}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl"
        >
          Add Subject
        </button>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">ID</th>
              <th className="p-4 text-left">Class</th>
              <th className="p-4 text-left">Subject</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>

            {subjects.map((item: Subject) => (
              <tr key={item.id} className="border-t">

                <td className="p-4">{item.id}</td>
                <td className="p-4">
                  {item.classes?.[0]?.name ?? "-"}
                </td>
                <td className="p-4">{item.name}</td>

                <td className="p-4 text-center">
                  <button
                    onClick={() => deleteSubject(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
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