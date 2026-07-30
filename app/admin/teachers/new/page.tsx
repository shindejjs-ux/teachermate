"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase-browser";
import { useRouter } from "next/navigation";

export default function AddTeacherPage() {

  const router = useRouter();

  const [teacher, setTeacher] = useState({
    employee_code: "",
    teacher_name: "",
    email: "",
    mobile: "",
    designation: "",
    department: "",
    qualification: "",
    experience: "",
  });

  async function saveTeacher() {

    const { error } = await supabase
      .from("teachers")
      .insert({
        employee_code: teacher.employee_code,
        teacher_name: teacher.teacher_name,
        email: teacher.email,
        mobile: teacher.mobile,
        designation: teacher.designation,
        department: teacher.department,
        qualification: teacher.qualification,
        experience: Number(teacher.experience),
        status: "Active",
      });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Teacher Added Successfully");

    router.push("/admin/teachers");
  }

  return (
    <div className="max-w-5xl mx-auto bg-white p-8 rounded-xl shadow">

      <h1 className="text-4xl font-bold mb-8">
        Add Teacher
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <input
          placeholder="Employee Code"
          className="border p-3 rounded"
          onChange={(e)=>setTeacher({...teacher,employee_code:e.target.value})}
        />

        <input
          placeholder="Teacher Name"
          className="border p-3 rounded"
          onChange={(e)=>setTeacher({...teacher,teacher_name:e.target.value})}
        />

        <input
          placeholder="Email"
          className="border p-3 rounded"
          onChange={(e)=>setTeacher({...teacher,email:e.target.value})}
        />

        <input
          placeholder="Mobile"
          className="border p-3 rounded"
          onChange={(e)=>setTeacher({...teacher,mobile:e.target.value})}
        />

        <input
          placeholder="Designation"
          className="border p-3 rounded"
          onChange={(e)=>setTeacher({...teacher,designation:e.target.value})}
        />

        <input
          placeholder="Department"
          className="border p-3 rounded"
          onChange={(e)=>setTeacher({...teacher,department:e.target.value})}
        />

        <input
          placeholder="Qualification"
          className="border p-3 rounded"
          onChange={(e)=>setTeacher({...teacher,qualification:e.target.value})}
        />

        <input
          placeholder="Experience (Years)"
          className="border p-3 rounded"
          onChange={(e)=>setTeacher({...teacher,experience:e.target.value})}
        />

      </div>

      <button
        onClick={saveTeacher}
        className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl"
      >
        Save Teacher
      </button>

    </div>
  );
}