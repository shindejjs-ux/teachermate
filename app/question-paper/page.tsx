"use client";

import { useState } from "react";
import jsPDF from "jspdf";
export default function QuestionPaperPage() {function downloadPDF(){

  const doc = new jsPDF();


  doc.setFontSize(16);

  doc.text(
    "THE ADITYA BIRLA PUBLIC SCHOOL, RENUKOOT",
    10,
    20
  );


  doc.setFontSize(12);


  const lines =
    doc.splitTextToSize(
      paper,
      180
    );


  doc.text(
    lines,
    10,
    35
  );


  doc.save(
    "CBSE_Question_Paper.pdf"
  );

}
  const [className, setClassName] = useState("");
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");
  const [marks, setMarks] = useState("40");
  const [difficulty, setDifficulty] = useState("Medium");

  const [paper, setPaper] = useState("");
  const [loading, setLoading] = useState(false);

  async function generatePaper() {
    if (!className || !subject || !chapter) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/question-paper", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          className,
          subject,
          chapter,
          marks,
          difficulty,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setPaper(data.paper);
      } else {
        alert("Generation failed.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }

    setLoading(false);
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold text-slate-800">
          📝 AI Question Paper Generator
        </h1>

        <p className="text-slate-500 mt-2">
          Generate CBSE Question Papers instantly.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow p-6 space-y-5">

        <div className="grid md:grid-cols-2 gap-5">

          <select
            className="border rounded-xl p-3"
            value={className}
            onChange={(e)=>setClassName(e.target.value)}
          >
            <option value="">Select Class</option>
            <option>Class 6</option>
            <option>Class 7</option>
            <option>Class 8</option>
            <option>Class 9</option>
            <option>Class 10</option>
            <option>Class 11</option>
            <option>Class 12</option>
          </select>

          <select
            className="border rounded-xl p-3"
            value={subject}
            onChange={(e)=>setSubject(e.target.value)}
          >
            <option value="">Select Subject</option>
            <option>Mathematics</option>
            <option>Physics</option>
            <option>Chemistry</option>
            <option>Biology</option>
            <option>English</option>
          </select>

          <input
            className="border rounded-xl p-3"
            placeholder="Chapter"
            value={chapter}
            onChange={(e)=>setChapter(e.target.value)}
          />

          <select
            className="border rounded-xl p-3"
            value={marks}
            onChange={(e)=>setMarks(e.target.value)}
          >
            <option>20</option>
            <option>40</option>
            <option>50</option>
            <option>80</option>
          </select>

          <select
            className="border rounded-xl p-3"
            value={difficulty}
            onChange={(e)=>setDifficulty(e.target.value)}
          >
            <option>Easy</option>
            <option>Medium</option>
            <option>Hard</option>
          </select>

        </div>

        <button
          onClick={generatePaper}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl"
        >
          {loading ? "Generating..." : "Generate Question Paper"}
        </button>

      </div>

      {paper && (
        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-2xl font-bold mb-4">
            Generated Question Paper
          </h2>

          <pre className="whitespace-pre-wrap">
 {paper}
</pre>


<button
onClick={downloadPDF}
className="
mt-6
bg-green-600
hover:bg-green-700
text-white
px-6
py-3
rounded-xl
"
>
Download PDF
</button>

        </div>
      )}

    </div>
  );
}