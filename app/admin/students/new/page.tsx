"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase-browser";

export default function AddStudentPage() {
  const router = useRouter();

  const [student, setStudent] = useState({
    admission_no: "",
    roll_no: "",
    full_name: "",
    gender: "Male",
    dob: "",
    class_id: "",
    section: "",
    father_name: "",
    mother_name: "",
    mobile: "",
    email: "",
    address: "",
  });

  async function saveStudent() {
    const { error } = await supabase
      .from("students")
      .insert({
        admission_no: student.admission_no,
        roll_no: Number(student.roll_no),
        full_name: student.full_name,
        gender: student.gender,
        dob: student.dob,
        class_id: Number(student.class_id),
        section: student.section,
        father_name: student.father_name,
        mother_name: student.mother_name,
        mobile: student.mobile,
        email: student.email,
        address: student.address,
        status: "Active",
      });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Student Added Successfully");
    router.push("/admin/students");
  }

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow p-8">

      <h1 className="text-4xl font-bold mb-8">
        Student Admission
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <input
          placeholder="Admission No"
          className="border p-3 rounded"
          onChange={(e)=>setStudent({...student,admission_no:e.target.value})}
        />

        <input
          placeholder="Roll No"
          className="border p-3 rounded"
          onChange={(e)=>setStudent({...student,roll_no:e.target.value})}
        />

        <input
          placeholder="Student Name"
          className="border p-3 rounded"
          onChange={(e)=>setStudent({...student,full_name:e.target.value})}
        />

        <select
          className="border p-3 rounded"
          onChange={(e)=>setStudent({...student,gender:e.target.value})}
        >
          <option>Male</option>
          <option>Female</option>
        </select>

        <input
          type="date"
          className="border p-3 rounded"
          onChange={(e)=>setStudent({...student,dob:e.target.value})}
        />

        <input
          placeholder="Class ID"
          className="border p-3 rounded"
          onChange={(e)=>setStudent({...student,class_id:e.target.value})}
        />

        <input
          placeholder="Section"
          className="border p-3 rounded"
          onChange={(e)=>setStudent({...student,section:e.target.value})}
        />

        <input
          placeholder="Father Name"
          className="border p-3 rounded"
          onChange={(e)=>setStudent({...student,father_name:e.target.value})}
        />

        <input
          placeholder="Mother Name"
          className="border p-3 rounded"
          onChange={(e)=>setStudent({...student,mother_name:e.target.value})}
        />

        <input
          placeholder="Mobile"
          className="border p-3 rounded"
          onChange={(e)=>setStudent({...student,mobile:e.target.value})}
        />

        <input
          placeholder="Email"
          className="border p-3 rounded"
          onChange={(e)=>setStudent({...student,email:e.target.value})}
        />

        <textarea
          placeholder="Address"
          className="border p-3 rounded md:col-span-2"
          rows={4}
          onChange={(e)=>setStudent({...student,address:e.target.value})}
        />

      </div>

      <button
        onClick={saveStudent}
        className="mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl"
      >
        Save Student
      </button>

    </div>
  );
}