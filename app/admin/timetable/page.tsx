"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

type Timetable = {
  id: number;
  class_name: string;
  section: string;
  day_name: string;
  period_no: number;
  start_time: string;
  end_time: string;
  subject: string;
  teacher: string;
  room_no: string;
};

export default function TimetablePage() {
  const [rows, setRows] = useState<Timetable[]>([]);

  const [form, setForm] = useState({
    class_name: "9",
    section: "A",
    day_name: "Monday",
    period_no: 1,
    start_time: "",
    end_time: "",
    subject: "",
    teacher: "",
    room_no: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const { data } = await supabase
      .from("timetable")
      .select("*")
      .order("day_name")
      .order("period_no");

    setRows(data || []);
  }

  async function save() {
    const { error } = await supabase
      .from("timetable")
      .insert(form);

    if (error) {
      alert(error.message);
      return;
    }

    loadData();
  }

  async function remove(id: number) {
    await supabase
      .from("timetable")
      .delete()
      .eq("id", id);

    loadData();
  }

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="bg-blue-700 text-white p-8">
        <h1 className="text-4xl font-bold">📅 Timetable Management</h1>
      </div>

      <div className="max-w-7xl mx-auto p-8">

        <div className="bg-white rounded-xl shadow p-6 mb-8">

          <div className="grid lg:grid-cols-3 gap-4">

            <input placeholder="Class"
              className="border p-3 rounded"
              value={form.class_name}
              onChange={(e)=>setForm({...form,class_name:e.target.value})}/>

            <input placeholder="Section"
              className="border p-3 rounded"
              value={form.section}
              onChange={(e)=>setForm({...form,section:e.target.value})}/>

            <select
              className="border p-3 rounded"
              value={form.day_name}
              onChange={(e)=>setForm({...form,day_name:e.target.value})}
            >
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
              <option>Saturday</option>
            </select>

            <input type="number"
              className="border p-3 rounded"
              placeholder="Period"
              value={form.period_no}
              onChange={(e)=>setForm({...form,period_no:Number(e.target.value)})}/>

            <input type="time"
              className="border p-3 rounded"
              value={form.start_time}
              onChange={(e)=>setForm({...form,start_time:e.target.value})}/>

            <input type="time"
              className="border p-3 rounded"
              value={form.end_time}
              onChange={(e)=>setForm({...form,end_time:e.target.value})}/>

            <input placeholder="Subject"
              className="border p-3 rounded"
              value={form.subject}
              onChange={(e)=>setForm({...form,subject:e.target.value})}/>

            <input placeholder="Teacher"
              className="border p-3 rounded"
              value={form.teacher}
              onChange={(e)=>setForm({...form,teacher:e.target.value})}/>

            <input placeholder="Room"
              className="border p-3 rounded"
              value={form.room_no}
              onChange={(e)=>setForm({...form,room_no:e.target.value})}/>

          </div>

          <button
            onClick={save}
            className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-xl"
          >
            Save Timetable
          </button>

        </div>

        <div className="bg-white rounded-xl shadow overflow-auto">

          <table className="w-full">

            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3">Day</th>
                <th>Class</th>
                <th>Period</th>
                <th>Time</th>
                <th>Subject</th>
                <th>Teacher</th>
                <th>Room</th>
                <th></th>
              </tr>
            </thead>

            <tbody>

              {rows.map((row)=>(
                <tr key={row.id} className="border-b">

                  <td className="p-3">{row.day_name}</td>
                  <td>{row.class_name}-{row.section}</td>
                  <td>{row.period_no}</td>
                  <td>{row.start_time} - {row.end_time}</td>
                  <td>{row.subject}</td>
                  <td>{row.teacher}</td>
                  <td>{row.room_no}</td>

                  <td>
                    <button
                      onClick={()=>remove(row.id)}
                      className="bg-red-600 text-white px-3 py-2 rounded"
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