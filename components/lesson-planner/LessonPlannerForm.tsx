"use client";

import { useState } from "react";

interface Props {
  onGenerate: (lessonPlan: string) => void;
}

export default function LessonPlannerForm({ onGenerate }: Props) {
  const [className, setClassName] = useState("IX");
  const [subject, setSubject] = useState("Mathematics");
  const [chapter, setChapter] = useState("");
  const [duration, setDuration] = useState("45 Minutes");
  const [language, setLanguage] = useState("English");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function generateLesson() {
    setErrorMessage("");

    if (!className.trim() || !subject.trim() || !chapter.trim()) {
      setErrorMessage("Please enter the class, subject, and chapter before generating.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/lesson-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          className: className.trim(),
          subject: subject.trim(),
          chapter: chapter.trim(),
          duration,
          language,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          typeof data.error === "string"
            ? data.error
            : `Lesson plan generation failed (HTTP ${response.status}).`
        );
      }

      if (typeof data.lessonPlan !== "string" || !data.lessonPlan.trim()) {
        throw new Error("The service returned an empty lesson plan. Please try again.");
      }

      onGenerate(data.lessonPlan);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to generate the lesson plan. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const fieldClass =
    "w-full rounded-xl border border-slate-300 bg-white p-3 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
          Teaching toolkit
        </p>
        <h2 className="mt-1 text-2xl font-bold text-slate-900">Lesson Details</h2>
        <p className="mt-2 text-sm text-slate-500">
          Set the class, subject, chapter, duration and language for your lesson plan.
        </p>
      </div>

      {errorMessage && (
        <div
          role="alert"
          className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {errorMessage}
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1.5 text-sm font-medium text-slate-700">
          Class
          <input
            className={fieldClass}
            placeholder="e.g. Class IX"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            maxLength={60}
          />
        </label>

        <label className="space-y-1.5 text-sm font-medium text-slate-700">
          Subject
          <input
            className={fieldClass}
            placeholder="e.g. Mathematics"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            maxLength={100}
          />
        </label>

        <label className="space-y-1.5 text-sm font-medium text-slate-700 md:col-span-2">
          Chapter or topic
          <input
            className={fieldClass}
            placeholder="e.g. Linear Equations in Two Variables"
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            maxLength={200}
            required
          />
        </label>

        <label className="space-y-1.5 text-sm font-medium text-slate-700">
          Lesson duration
          <select
            className={fieldClass}
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option>35 Minutes</option>
            <option>40 Minutes</option>
            <option>45 Minutes</option>
            <option>60 Minutes</option>
            <option>80 Minutes</option>
          </select>
        </label>

        <label className="space-y-1.5 text-sm font-medium text-slate-700">
          Output language
          <select
            className={fieldClass}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option>English</option>
            <option>Hindi</option>
          </select>
        </label>
      </div>

      <button
        type="button"
        onClick={generateLesson}
        disabled={loading}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {loading ? "Generating lesson plan…" : "Generate Lesson Plan"}
      </button>
      <p className="mt-3 text-xs text-slate-500">
        Generation requires the configured lesson-plan API and its provider credentials.
      </p>
    </section>
  );
}
