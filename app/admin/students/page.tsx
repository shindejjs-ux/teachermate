"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

type Student = {
  id: number;
  roll_no: number;
  name: string;
  class_name: string;
  section: string;
};

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [roll, setRoll] = useState("");
  const [className, setClassName] = useState("9");
  const [section, setSection] = useState("A");

  useEffect(() => {
    loadStudents();
  }, []);

  async function loadStudents() {
    setLoading(true);

    const { data } = await supabase
      .from("students")
      .select("*")
      .order("roll_no");

    setStudents(data || []);
    setLoading(false);
  }

  async function addStudent() {
    if (!name || !roll) return;

    await supabase.from("students").insert({
      name,
      roll_no: Number(roll),
      class_name: className,
      section,
    });

    setName("");
    setRoll("");

    loadStudents();
  }

  async function deleteStudent(id: number) {
    await supabase.from("students").delete().eq("id", id);

    loadStudents();
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="bg-blue-700 text-white p-8">
        <h1 className="text-4xl font-bold">
          👨‍🎓 Student Management
        </h1>

        <p className="mt-2">
          Add and manage students.
        </p>
      </div>

      <div className="max-w-6xl mx-auto p-8">

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">

          <div className="grid md:grid-cols-4 gap-4">

            <input
              placeholder="Roll No"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              className="border rounded-lg p-3"
            />

            <input
              placeholder="Student Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-lg p-3"
            />

            <select
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="border rounded-lg p-3"
            >
              {[...Array(12)].map((_, i) => (
                <option key={i}>{i + 1}</option>
              ))}
            </select>

            <select
              value={section}
              onChange={(e) => setSection(e.target.value)}
              className="border rounded-lg p-3"
            >
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
            </select>

          </div>

          <button
            onClick={addStudent}
            className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-xl font-bold"
          >
            Add Student
          </button>

        </div>

        <div className="bg-white rounded-2xl shadow-lg">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">

              <tr>
                <th className="p-4">Roll</th>
                <th>Name</th>
                <th>Class</th>
                <th>Section</th>
                <th></th>
              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    Loading...
                  </td>
                </tr>

              ) : (

                students.map((s) => (

                  <tr
                    key={s.id}
                    className="border-b"
                  >

                    <td className="p-4">{s.roll_no}</td>
                    <td>{s.name}</td>
                    <td>{s.class_name}</td>
                    <td>{s.section}</td>

                    <td>

                      <button
                        onClick={() => deleteStudent(s.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}