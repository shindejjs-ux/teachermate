"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";

type WorksheetQuestion = { number: number; text: string; marks: number };

export default function WorksheetsPage() {
  const [className, setClassName] = useState("Class IX");
  const [subject, setSubject] = useState("Mathematics");
  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("Mixed");
  const [questionCount, setQuestionCount] = useState("10");
  const [includeAnswers, setIncludeAnswers] = useState(false);
  const [worksheet, setWorksheet] = useState<WorksheetQuestion[]>([]);
  const [generatedTopic, setGeneratedTopic] = useState("");
  const [error, setError] = useState("");

  function generateWorksheet() {
    const cleanTopic = topic.trim();
    if (!cleanTopic) {
      setError("Enter a chapter or topic before generating the worksheet.");
      setWorksheet([]);
      return;
    }

    const count = Number(questionCount);
    if (!Number.isInteger(count) || count < 5 || count > 25) {
      setError("Choose between 5 and 25 questions.");
      return;
    }

    const prompts =
      difficulty === "Basic"
        ? [
            `Define ${cleanTopic} in your own words.`,
            `Write two important facts about ${cleanTopic}.`,
            `Give one example related to ${cleanTopic}.`,
            `Explain the key idea of ${cleanTopic} step by step.`,
            `Complete a short practice question on ${cleanTopic}.`,
          ]
        : difficulty === "Advanced"
        ? [
            `Solve a challenging application-based problem on ${cleanTopic}.`,
            `Justify your reasoning for a statement related to ${cleanTopic}.`,
            `Create and solve a real-life problem involving ${cleanTopic}.`,
            `Identify and correct a common misconception about ${cleanTopic}.`,
            `Solve a multi-step HOTS problem on ${cleanTopic}.`,
          ]
        : [
            `Explain the main concept of ${cleanTopic} with an example.`,
            `Solve a standard practice problem on ${cleanTopic}.`,
            `Apply ${cleanTopic} to a real-life situation.`,
            `Compare two methods or ideas used in ${cleanTopic}.`,
            `Solve an application-based/HOTS question on ${cleanTopic}.`,
          ];

    const questions = Array.from({ length: count }, (_, index) => ({
      number: index + 1,
      text: prompts[index % prompts.length],
      marks: index % 3 === 0 ? 1 : index % 3 === 1 ? 2 : 3,
    }));

    setWorksheet(questions);
    setGeneratedTopic(cleanTopic);
    setError("");
  }

  const totalMarks = worksheet.reduce((sum, question) => sum + question.marks, 0);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="min-w-0 flex-1 p-5 md:p-8">
        <div className="mx-auto max-w-5xl space-y-6">
          <header>
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">TeacherMate AI</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">Worksheet Generator</h1>
            <p className="mt-2 text-slate-600">Create a printable topic-based practice worksheet for your class.</p>
          </header>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block text-sm font-semibold text-slate-700">
                Class
                <select value={className} onChange={(e) => setClassName(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal">
                  {["Class I","Class II","Class III","Class IV","Class V","Class VI","Class VII","Class VIII","Class IX","Class X","Class XI","Class XII"].map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Subject
                <select value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal">
                  {["Mathematics","Science","English","Social Science","Physics","Chemistry","Biology","Computer Science","Hindi"].map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label className="block text-sm font-semibold text-slate-700 md:col-span-2">
                Chapter or topic
                <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Linear Equations in Two Variables" className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal" />
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Difficulty
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal">
                  <option>Basic</option><option>Mixed</option><option>Advanced</option>
                </select>
              </label>
              <label className="block text-sm font-semibold text-slate-700">
                Number of questions
                <select value={questionCount} onChange={(e) => setQuestionCount(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal">
                  {[5,10,15,20,25].map((n) => <option key={n} value={n}>{n} questions</option>)}
                </select>
              </label>
            </div>
            <label className="mt-5 flex items-center gap-3 text-sm text-slate-700">
              <input type="checkbox" checked={includeAnswers} onChange={(e) => setIncludeAnswers(e.target.checked)} className="h-4 w-4 rounded border-slate-300" />
              Include a teacher answer guide (prompts only; add verified subject-specific answers before distribution)
            </label>
            {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={generateWorksheet} className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">Generate worksheet</button>
              {worksheet.length > 0 && <button onClick={() => window.print()} className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50">Print / Save PDF</button>}
            </div>
            <p className="mt-4 text-xs text-slate-500">This version creates editable practice prompts locally; it does not call an AI model or guarantee curriculum-specific answer accuracy.</p>
          </section>

          {worksheet.length > 0 && (
            <section id="printable-worksheet" className="worksheet-print rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
              <div className="border-b border-slate-200 pb-5 text-center">
                <h2 className="text-xl font-bold text-slate-900">WORKSHEET</h2>
                <p className="mt-2 font-semibold">{subject} · {className}</p>
                <p className="mt-1 text-sm text-slate-600">Topic: {generatedTopic}</p>
                <div className="mt-4 flex flex-wrap justify-between gap-2 text-sm text-slate-600"><span>Name: ____________________</span><span>Date: ______________</span><span>Total marks: {totalMarks}</span></div>
              </div>
              <ol className="mt-6 list-decimal space-y-5 pl-6">
                {worksheet.map((question) => <li key={question.number} className="pl-1"><div className="flex items-start justify-between gap-4"><span>{question.text}</span><span className="whitespace-nowrap text-sm text-slate-500">[{question.marks} mark{question.marks > 1 ? "s" : ""}]</span></div>{includeAnswers && <p className="mt-2 text-sm text-slate-500">Teacher guide: Prepare and verify a subject-specific model answer for this prompt.</p>}<div className="mt-3 border-b border-dotted border-slate-300" /></li>)}
              </ol>
            </section>
          )}
        </div>
      </main>
      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          #printable-worksheet, #printable-worksheet * { visibility: visible; }
          #printable-worksheet { position: absolute; left: 0; top: 0; width: 100%; border: 0; box-shadow: none; }
          .worksheet-print { padding: 12mm !important; }
          @page { margin: 10mm; }
        }
      `}</style>
    </div>
  );
}
