"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

type Homework = {
  id: number;
  class_name: string;
  section: string;
  subject: string;
  chapter: string;
  homework: string;
  due_date: string;
};

export default function HomeworkPage() {
  const [homeworks, setHomeworks] = useState<Homework[]>([]);
  const [loading, setLoading] = useState(true);

  const [className, setClassName] = useState("9");
  const [section, setSection] = useState("A");
  const [subject, setSubject] = useState("Mathematics");
  const [chapter, setChapter] = useState("");
  const [homework, setHomework] = useState("");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    loadHomework();
  }, []);

  async function loadHomework() {
    setLoading(true);

    const { data } = await supabase
      .from("homework")
      .select("*")
      .order("created_at", { ascending: false });

    setHomeworks(data || []);
    setLoading(false);
  }

  async function saveHomework() {
    const { error } = await supabase
      .from("homework")
      .insert({
        class_name: className,
        section,
        subject,
        chapter,
        homework,
        due_date: dueDate,
      });

    if (error) {
      alert(error.message);
      return;
    }

    setChapter("");
    setHomework("");
    setDueDate("");

    loadHomework();

    alert("Homework Added Successfully");
  }

  async function deleteHomework(id: number) {
    await supabase
      .from("homework")
      .delete()
      .eq("id", id);

    loadHomework();
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="bg-orange-700 text-white p-8">
        <h1 className="text-4xl font-bold">
          📚 Homework Management
        </h1>
      </div>

      <div className="max-w-7xl mx-auto p-8">

        <div className="bg-white rounded-xl shadow p-6 mb-8">

          <div className="grid md:grid-cols-3 gap-4">

            <select
              value={className}
              onChange={(e)=>setClassName(e.target.value)}
              className="border rounded-lg p-3"
            >
              {[...Array(12)].map((_,i)=>(
                <option key={i}>{i+1}</option>
              ))}
            </select>

            <select
              value={section}
              onChange={(e)=>setSection(e.target.value)}
              className="border rounded-lg p-3"
            >
              <option>A</option>
              <option>B</option>
              <option>C</option>
              <option>D</option>
            </select>

            <input
              value={subject}
              onChange={(e)=>setSubject(e.target.value)}
              className="border rounded-lg p-3"
            />

            <input
              placeholder="Chapter"
              value={chapter}
              onChange={(e)=>setChapter(e.target.value)}
              className="border rounded-lg p-3"
            />

            <input
              type="date"
              value={dueDate}
              onChange={(e)=>setDueDate(e.target.value)}
              className="border rounded-lg p-3"
            />

          </div>

          <textarea
            rows={5}
            placeholder="Homework"
            value={homework}
            onChange={(e)=>setHomework(e.target.value)}
            className="border rounded-lg p-3 w-full mt-4"
          />

          <button
            onClick={saveHomework}
            className="mt-5 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-xl font-bold"
          >
            Save Homework
          </button>

        </div>

        <div className="bg-white rounded-xl shadow">

          <table className="w-full">

            <thead className="bg-orange-600 text-white">

              <tr>
                <th className="p-4">Class</th>
                <th>Subject</th>
                <th>Chapter</th>
                <th>Due Date</th>
                <th>Homework</th>
                <th></th>
              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td colSpan={6} className="text-center p-8">
                    Loading...
                  </td>
                </tr>

              ) : (

                homeworks.map((hw)=>(

                  <tr
                    key={hw.id}
                    className="border-b"
                  >

                    <td className="p-4">
                      {hw.class_name}-{hw.section}
                    </td>

                    <td>{hw.subject}</td>

                    <td>{hw.chapter}</td>

                    <td>{hw.due_date}</td>

                    <td>{hw.homework}</td>

                    <td>

                      <button
                        onClick={()=>deleteHomework(hw.id)}
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