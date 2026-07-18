"use client";

interface Props {
  lessonPlan: string;
}

export default function LessonPlanViewer({ lessonPlan }: Props) {
  if (!lessonPlan) {
    return (
      <div className="mt-6 rounded-xl border border-dashed bg-gray-50 p-8 text-center text-gray-500">
        <h2 className="text-xl font-semibold">
          Lesson Plan Preview
        </h2>

        <p className="mt-3">
          Generate a lesson plan to see the output here.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-xl border bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Generated Lesson Plan
        </h2>

        <button
          onClick={() => navigator.clipboard.writeText(lessonPlan)}
          className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
        >
          Copy
        </button>
      </div>

      <div className="max-h-[700px] overflow-auto rounded border bg-gray-50 p-4">
        <pre className="whitespace-pre-wrap text-sm leading-7">
          {lessonPlan}
        </pre>
      </div>
    </div>
  );
}