"use client";

import { useMemo, useState } from "react";
import Sidebar from "@/components/layout/Sidebar";

type PaperQuestion = { id: number; section: string; prompt: string; marks: number; type: string };

const classOptions = ["Class 6","Class 7","Class 8","Class 9","Class 10","Class 11","Class 12"];
const subjectOptions: Record<string, string[]> = {
  "Class 6": ["Mathematics","Science","English","Social Science","Hindi"],
  "Class 7": ["Mathematics","Science","English","Social Science","Hindi"],
  "Class 8": ["Mathematics","Science","English","Social Science","Hindi"],
  "Class 9": ["Mathematics","Science","English","Social Science","Hindi"],
  "Class 10": ["Mathematics","Science","English","Social Science","Hindi"],
  "Class 11": ["Mathematics","Physics","Chemistry","Biology","English","Computer Science"],
  "Class 12": ["Mathematics","Physics","Chemistry","Biology","English","Computer Science"],
};

const examOptions = ["Periodic Test","Half Yearly","Annual Examination","Pre-Board","Practice Test"];
const markOptions = [20, 30, 40, 50, 60, 80];
const durations = ["45 minutes","1 hour","1 hour 30 minutes","2 hours","3 hours"];
const typeOptions = ["Mixed question types","MCQ and short answer","Short and long answer","Competency / case-based"];

function makePrompts(subject: string, topic: string, type: string, index: number): { section: string; prompt: string; type: string } {
  const cleanTopic = topic.trim();
  const subjectLabel = subject || "the selected subject";
  if (type === "MCQ and short answer") {
    const prompts = [
      `Choose the correct answer related to ${cleanTopic || subjectLabel}. (Add four options.)`,
      `State one key fact, definition, or property of ${cleanTopic || subjectLabel}.`,
      `Answer a short conceptual question on ${cleanTopic || subjectLabel}.`,
      `Solve or explain a basic application of ${cleanTopic || subjectLabel}.`,
    ];
    return { section: index % 2 === 0 ? "Section A" : "Section B", prompt: prompts[index % prompts.length], type: index % 2 === 0 ? "MCQ" : "Short answer" };
  }
  if (type === "Short and long answer") {
    const prompts = [
      `Explain an important concept or term from ${cleanTopic || subjectLabel}.`,
      `Solve a standard question on ${cleanTopic || subjectLabel}, showing the main steps.`,
      `Answer an application-based question on ${cleanTopic || subjectLabel} with reasoning.`,
      `Solve a multi-step or extended-response problem involving ${cleanTopic || subjectLabel}.`,
    ];
    return { section: index % 2 === 0 ? "Section A" : "Section B", prompt: prompts[index % prompts.length], type: index % 2 === 0 ? "Short answer" : "Long answer" };
  }
  if (type === "Competency / case-based") {
    const prompts = [
      `Competency question: interpret a real-world situation involving ${cleanTopic || subjectLabel} and answer the related sub-question.`,
      `Case-based question: use the given data or scenario about ${cleanTopic || subjectLabel} to justify your conclusion.`,
      `Application task: analyse a situation involving ${cleanTopic || subjectLabel} and show your reasoning.`,
      `HOTS question: compare two approaches to a problem involving ${cleanTopic || subjectLabel}.`,
    ];
    return { section: "Competency & Case-Based", prompt: prompts[index % prompts.length], type: index % 2 === 0 ? "Case-based" : "HOTS" };
  }
  const prompts = [
    `Select the correct answer for a concept from ${cleanTopic || subjectLabel}. (Provide four options.)`,
    `Define or state an important property of ${cleanTopic || subjectLabel}.`,
    `Solve a standard question based on ${cleanTopic || subjectLabel}, showing your working.`,
    `Explain an application of ${cleanTopic || subjectLabel} with a suitable example.`,
    `Solve an application-based / HOTS question on ${cleanTopic || subjectLabel}.`,
    `Case-based question: interpret a situation involving ${cleanTopic || subjectLabel} and answer the sub-questions.`,
  ];
  const idx = index % prompts.length;
  const section = idx === 0 ? "Section A" : idx <= 2 ? "Section B" : idx <= 4 ? "Section C" : "Section D";
  const qType = idx === 0 ? "MCQ" : idx === 1 ? "Very short answer" : idx === 2 ? "Short answer" : idx === 3 ? "Application" : idx === 4 ? "HOTS" : "Case-based";
  return { section, prompt: prompts[idx], type: qType };
}

export default function ExamPaperPage() {
  const [selectedClass, setSelectedClass] = useState("Class 9");
  const [subject, setSubject] = useState("Mathematics");
  const [examType, setExamType] = useState("Periodic Test");
  const [marks, setMarks] = useState("40");
  const [duration, setDuration] = useState("1 hour 30 minutes");
  const [topic, setTopic] = useState("");
  const [questionCount, setQuestionCount] = useState("15");
  const [questionStyle, setQuestionStyle] = useState("Mixed question types");
  const [schoolName, setSchoolName] = useState("THE ADITYA BIRLA PUBLIC SCHOOL");
  const [instructions, setInstructions] = useState("All questions are compulsory. Show necessary working and write answers with appropriate units.");
  const [paper, setPaper] = useState<PaperQuestion[]>([]);
  const [paperTitle, setPaperTitle] = useState("");
  const [error, setError] = useState("");

  const totalMarks = useMemo(() => paper.reduce((sum, q) => sum + q.marks, 0), [paper]);

  function generatePaper() {
    const maxMarks = Number(marks);
    const count = Number(questionCount);
    if (!subject.trim()) return setError("Enter or select a subject.");
    if (!Number.isInteger(maxMarks) || maxMarks < 1) return setError("Maximum marks must be a positive number.");
    if (!Number.isInteger(count) || count < 1 || count > 40) return setError("Choose between 1 and 40 questions.");
    if (maxMarks < count) return setError("Maximum marks must be at least equal to the number of questions.");
    const questions = Array.from({ length: count }, (_, index) => {
      const baseMarks = Math.floor(maxMarks / count);
      const extra = index < maxMarks % count ? 1 : 0;
      const prompt = makePrompts(subject.trim(), topic, questionStyle, index);
      return { id: index + 1, section: prompt.section, prompt: prompt.prompt, marks: baseMarks + extra, type: prompt.type };
    });
    setPaper(questions);
    setPaperTitle(`${examType} – ${selectedClass} ${subject.trim()}`);
    setError("");
  }

  function updateQuestion(id: number, field: "prompt" | "marks", value: string) {
    setPaper((current) => current.map((q) => q.id === id ? {
      ...q,
      [field]: field === "marks" ? Math.max(1, Number(value) || 1) : value,
    } : q));
  }

  function printPaper() {
    if (!paper.length) return;
    window.print();
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="min-w-0 flex-1 p-5 md:p-8">
        <div className="mx-auto max-w-6xl space-y-6">
          <header>
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">TeacherMate AI · Assessment Studio</p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">Question Paper Generator</h1>
            <p className="mt-2 text-slate-600">Configure an exam paper, edit questions, and print a classroom-ready draft.</p>
          </header>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-7">
            <h2 className="text-lg font-bold text-slate-900">Paper settings</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <label className="text-sm font-semibold text-slate-700">Class
                <select value={selectedClass} onChange={(e) => { setSelectedClass(e.target.value); const options = subjectOptions[e.target.value] || []; if (!options.includes(subject)) setSubject(options[0] || ""); }} className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal">
                  {classOptions.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label className="text-sm font-semibold text-slate-700">Subject
                <select value={subject} onChange={(e) => setSubject(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal">
                  {(subjectOptions[selectedClass] || ["Mathematics"]).map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label className="text-sm font-semibold text-slate-700">Exam type
                <select value={examType} onChange={(e) => setExamType(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal">
                  {examOptions.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label className="text-sm font-semibold text-slate-700">Maximum marks
                <select value={marks} onChange={(e) => setMarks(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal">
                  {markOptions.map((item) => <option key={item} value={item}>{item} marks</option>)}
                </select>
              </label>
              <label className="text-sm font-semibold text-slate-700">Duration
                <select value={duration} onChange={(e) => setDuration(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal">
                  {durations.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label className="text-sm font-semibold text-slate-700">Number of questions
                <select value={questionCount} onChange={(e) => setQuestionCount(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal">
                  {[5,10,15,20,25,30,40].map((item) => <option key={item} value={item}>{item} questions</option>)}
                </select>
              </label>
              <label className="text-sm font-semibold text-slate-700 md:col-span-2 xl:col-span-3">Chapter(s) / syllabus coverage
                <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. Number Systems, Polynomials, Linear Equations" className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal" />
              </label>
              <label className="text-sm font-semibold text-slate-700 md:col-span-2 xl:col-span-3">Question pattern
                <select value={questionStyle} onChange={(e) => setQuestionStyle(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal">
                  {typeOptions.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label className="text-sm font-semibold text-slate-700 md:col-span-2 xl:col-span-3">School name
                <input value={schoolName} onChange={(e) => setSchoolName(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal" />
              </label>
              <label className="text-sm font-semibold text-slate-700 md:col-span-2 xl:col-span-3">General instructions
                <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} rows={2} className="mt-2 w-full rounded-xl border border-slate-300 p-3 font-normal" />
              </label>
            </div>
            {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={generatePaper} className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">Generate paper draft</button>
              {paper.length > 0 && <button onClick={printPaper} className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-700">Print / Save PDF</button>}
            </div>
            <p className="mt-4 text-xs text-slate-500">This first version generates editable question prompts locally. It does not yet call an AI model or validate alignment with a specific CBSE blueprint. Review and replace prompts with syllabus-specific questions before use.</p>
          </section>

          {paper.length > 0 && (
            <section className="paper-preview rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-9">
              <div className="border-b-2 border-slate-800 pb-5 text-center">
                <input aria-label="School name in paper" value={schoolName} onChange={(e) => setSchoolName(e.target.value)} className="w-full border-0 bg-transparent text-center text-lg font-bold text-slate-900 focus:outline-none" />
                <h2 className="mt-3 text-xl font-bold text-slate-900">{examType.toUpperCase()}</h2>
                <p className="mt-2 font-semibold">{selectedClass} · {subject}</p>
                <p className="mt-1 text-sm text-slate-600">{topic.trim() ? `Syllabus: ${topic.trim()}` : "Syllabus: As prescribed"}</p>
                <div className="mt-4 flex flex-wrap justify-between gap-2 text-sm font-semibold"><span>Time: {duration}</span><span>Maximum Marks: {totalMarks}</span></div>
              </div>
              <div className="mt-5 text-sm text-slate-700"><strong>General Instructions:</strong> {instructions}</div>
              <div className="mt-6 space-y-6">
                {Array.from(new Set(paper.map((q) => q.section))).map((section) => (
                  <div key={section}>
                    <h3 className="border-b border-slate-300 pb-2 text-center font-bold text-slate-900">{section}</h3>
                    <ol className="mt-3 list-decimal space-y-4 pl-6">
                      {paper.filter((q) => q.section === section).map((q) => (
                        <li key={q.id} className="pl-1">
                          <div className="flex items-start gap-3">
                            <div className="min-w-0 flex-1">
                              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500">{q.type}</p>
                              <textarea aria-label={`Question ${q.id}`} value={q.prompt} onChange={(e) => updateQuestion(q.id, "prompt", e.target.value)} rows={2} className="w-full resize-y rounded-lg border border-slate-200 p-2 text-slate-800 focus:border-indigo-400 focus:outline-none" />
                            </div>
                            <label className="flex items-center gap-1 whitespace-nowrap text-xs text-slate-600">Marks
                              <input aria-label={`Marks for question ${q.id}`} type="number" min={1} value={q.marks} onChange={(e) => updateQuestion(q.id, "marks", e.target.value)} className="w-14 rounded-md border border-slate-300 p-1 text-center" />
                            </label>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
              <p className="mt-8 border-t border-slate-200 pt-4 text-right text-sm font-bold">Total marks: {totalMarks}</p>
            </section>
          )}
        </div>
      </main>
      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          .paper-preview, .paper-preview * { visibility: visible; }
          .paper-preview { position: absolute; inset: 0 auto auto 0; width: 100%; padding: 10mm !important; border: 0; box-shadow: none; }
          .paper-preview textarea { border: 0 !important; resize: none !important; padding: 0 !important; }
          .paper-preview input { border: 0 !important; }
          @page { margin: 8mm; }
        }
      `}</style>
    </div>
  );
}
