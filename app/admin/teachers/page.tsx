"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

type Teacher = {
  id: string;
  employee_code: string;
  teacher_name: string;
  email: string;
  mobile: string;
  designation: string;
  department: string;
  status: string;
};

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadTeachers();
  }, []);

  async function loadTeachers() {
    const { data, error } = await supabase
      .from("teachers")
      .select("*")
      .order("teacher_name");

    if (!error) {
      setTeachers(data || []);
    }
  }

  const filtered = teachers.filter((t) =>
    (t.teacher_name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">
          Teachers
        </h1>

        <Link
  href="/admin/teachers/new"
  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-3 rounded-xl font-semibold"
>
  + Add Teacher
</Link>
      </div>

      <input
        placeholder="Search teacher..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="border rounded-xl p-3 w-full"
      />

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">Code</th>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Mobile</th>
              <th className="p-4 text-left">Designation</th>
              <th className="p-4 text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            {filtered.map((teacher)=>(

              <tr
                key={teacher.id}
                className="border-t hover:bg-slate-50"
              >

                <td className="p-4">{teacher.employee_code}</td>

                <td className="p-4 font-semibold">
                  {teacher.teacher_name}
                </td>

                <td className="p-4">{teacher.email}</td>

                <td className="p-4">{teacher.mobile}</td>

                <td className="p-4">{teacher.designation}</td>

                <td className="p-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                    {teacher.status || "Active"}
                  </span>
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}