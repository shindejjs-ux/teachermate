"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Teacher = {
  id: number;
  name: string;
  email: string;
  mobile: string;
  subject: string;
  designation: string;
};

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [subject, setSubject] = useState("");
  const [designation, setDesignation] = useState("");

  useEffect(() => {
    loadTeachers();
  }, []);

  async function loadTeachers() {
    const { data } = await supabase
      .from("teachers")
      .select("*")
      .order("id");

    setTeachers(data || []);
  }

  async function saveTeacher() {
    if (!name || !email) {
      alert("Please fill required fields.");
      return;
    }

    const { error } = await supabase
      .from("teachers")
      .insert({
        name,
        email,
        mobile,
        subject,
        designation,
      });

    if (error) {
      alert(error.message);
      return;
    }

    setName("");
    setEmail("");
    setMobile("");
    setSubject("");
    setDesignation("");

    loadTeachers();
  }

  async function deleteTeacher(id: number) {
    await supabase
      .from("teachers")
      .delete()
      .eq("id", id);

    loadTeachers();
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="bg-green-700 text-white p-8">
        <h1 className="text-4xl font-bold">
          👨‍🏫 Teacher Management
        </h1>
      </div>

      <div className="max-w-7xl mx-auto p-8">

        <div className="bg-white rounded-xl shadow p-6 mb-8">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

            <input
              placeholder="Teacher Name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="border rounded-lg p-3"
            />

            <input
              placeholder="Email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="border rounded-lg p-3"
            />

            <input
              placeholder="Mobile"
              value={mobile}
              onChange={(e)=>setMobile(e.target.value)}
              className="border rounded-lg p-3"
            />

            <input
              placeholder="Subject"
              value={subject}
              onChange={(e)=>setSubject(e.target.value)}
              className="border rounded-lg p-3"
            />

            <input
              placeholder="Designation"
              value={designation}
              onChange={(e)=>setDesignation(e.target.value)}
              className="border rounded-lg p-3"
            />

          </div>

          <button
            onClick={saveTeacher}
            className="mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold"
          >
            Save Teacher
          </button>

        </div>

        <div className="bg-white rounded-xl shadow overflow-auto">

          <table className="w-full">

            <thead className="bg-green-600 text-white">

              <tr>
                <th className="p-4">Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Subject</th>
                <th>Designation</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {teachers.map((teacher)=>(
                <tr key={teacher.id} className="border-b">

                  <td className="p-4">{teacher.name}</td>
                  <td>{teacher.email}</td>
                  <td>{teacher.mobile}</td>
                  <td>{teacher.subject}</td>
                  <td>{teacher.designation}</td>

                  <td>
                    <button
                      onClick={()=>deleteTeacher(teacher.id)}
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

    </div>
  );
}