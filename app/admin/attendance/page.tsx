"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

type Student = {
  id: number;
  roll_no: number;
  name: string;
};

export default function AttendancePage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Record<number, string>>({});
  const [loading, setLoading] = useState(true);

  const [className, setClassName] = useState("9");
  const [section, setSection] = useState("A");
  const [date, setDate] = useState(
    new Date().toISOString().substring(0, 10)
  );

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

    const obj: Record<number, string> = {};

    data?.forEach((s) => {
      obj[s.id] = "Present";
    });

    setAttendance(obj);

    setLoading(false);
  }

  async function saveAttendance() {
    const rows = students.map((student) => ({
      student_id: student.id,
      date,
      status: attendance[student.id],
    }));

    const { error } = await supabase
      .from("attendance")
      .insert(rows);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Attendance Saved Successfully");
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="bg-green-700 text-white p-8">
        <h1 className="text-4xl font-bold">
          📅 Attendance Management
        </h1>
      </div>

      <div className="max-w-6xl mx-auto p-8">

        <div className="bg-white rounded-xl shadow p-6 mb-6">

          <div className="grid md:grid-cols-3 gap-4">

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

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded-lg p-3"
            />

          </div>

        </div>

        <div className="bg-white rounded-xl shadow">

          <table className="w-full">

            <thead className="bg-green-600 text-white">

              <tr>
                <th className="p-4">Roll</th>
                <th>Name</th>
                <th>Status</th>
              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td colSpan={3} className="p-8 text-center">
                    Loading...
                  </td>
                </tr>

              ) : (

                students.map((student) => (

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

                      <select
                        value={attendance[student.id]}
                        onChange={(e) =>
                          setAttendance({
                            ...attendance,
                            [student.id]: e.target.value,
                          })
                        }
                        className="border rounded-lg p-2"
                      >
                        <option>Present</option>
                        <option>Absent</option>
                        <option>Late</option>
                        <option>Leave</option>
                      </select>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        <button
          onClick={saveAttendance}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-xl font-bold"
        >
          Save Attendance
        </button>

      </div>

    </div>
  );
}