 "use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Student = {
  id: number;
  roll_no: number;
  name: string;
};

export default function MarksPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [marks, setMarks] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);

  const [className, setClassName] = useState("9");
  const [section, setSection] = useState("A");
  const [exam, setExam] = useState("Periodic Test 1");
  const [subject, setSubject] = useState("Mathematics");
  const [maxMarks, setMaxMarks] = useState(40);

  useEffect(() => {
    loadStudents();
  }, [className, section]);

  async function loadStudents() {
    setLoading(true);

    const { data } = await supabase
      .from("students")
      .select("*")
      .eq("class_name", className)
      .eq("section", section)
      .order("roll_no");

    setStudents(data || []);

    const obj: Record<number, number> = {};

    data?.forEach((s) => {
      obj[s.id] = 0;
    });

    setMarks(obj);

    setLoading(false);
  }

  async function saveMarks() {
    const rows = students.map((student) => ({
      student_id: student.id,
      exam_name: exam,
      subject,
      marks: Number(marks[student.id]),
      max_marks: maxMarks,
    }));

    const { error } = await supabase
      .from("marks")
      .insert(rows);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Marks Saved Successfully");
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="bg-purple-700 text-white p-8">
        <h1 className="text-4xl font-bold">
          📊 Marks Management
        </h1>
      </div>

      <div className="max-w-7xl mx-auto p-8">

        <div className="bg-white rounded-xl shadow p-6 mb-6">

          <div className="grid md:grid-cols-5 gap-4">

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
              value={exam}
              onChange={(e)=>setExam(e.target.value)}
              className="border rounded-lg p-3"
            />

            <input
              type="number"
              value={maxMarks}
              onChange={(e)=>setMaxMarks(Number(e.target.value))}
              className="border rounded-lg p-3"
            />

          </div>

        </div>

        <div className="bg-white rounded-xl shadow">

          <table className="w-full">

            <thead className="bg-purple-600 text-white">

              <tr>
                <th className="p-4">Roll</th>
                <th>Name</th>
                <th>Marks</th>
                <th>Grade</th>
                <th>%</th>
              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td colSpan={5} className="text-center p-8">
                    Loading...
                  </td>
                </tr>

              ) : (

                students.map((student)=>(

                  <tr
                    key={student.id}
                    className="border-b"
                  >

                    <td className="p-4">
                      {student.roll_no}
                    </td>

                    <td>
                      {student.name}
                    </td>

                    <td>

                      <input
                        type="number"
                        value={marks[student.id]}
                        max={maxMarks}
                        min={0}
                        onChange={(e)=>
                          setMarks({
                            ...marks,
                            [student.id]: Number(e.target.value)
                          })
                        }
                        className="border rounded-lg p-2 w-24"
                      />

                    </td>

                    <td>
                      {marks[student.id] >= 90 ? "A1" :
                       marks[student.id] >= 80 ? "A2" :
                       marks[student.id] >= 70 ? "B1" :
                       marks[student.id] >= 60 ? "B2" :
                       marks[student.id] >= 50 ? "C1" :
                       marks[student.id] >= 40 ? "C2" :
                       marks[student.id] >= 33 ? "D" : "E"}
                    </td>

                    <td>
                      {((marks[student.id] || 0) / maxMarks * 100).toFixed(1)}%
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        <button
          onClick={saveMarks}
          className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-bold"
        >
          Save Marks
        </button>

      </div>

    </div>
  );
} 