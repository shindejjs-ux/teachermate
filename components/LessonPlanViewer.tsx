"use client";

type Props = {
  lesson: string;
};

export default function LessonPlanViewer({ lesson }: Props) {
  if (!lesson) return null;

  return (
    <div className="bg-white mt-6 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">
        Generated Lesson Plan
      </h2>

      <pre className="whitespace-pre-wrap font-sans text-gray-800">
        {lesson}
      </pre>
    </div>
  );
}