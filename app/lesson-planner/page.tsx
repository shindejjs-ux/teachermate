"use client";

import { useState } from "react";
import LessonPlannerForm from "@/components/lesson-planner/LessonPlannerForm";
import LessonPlanViewer from "@/components/lesson-planner/LessonPlanViewer";

export default function LessonPlannerPage() {
  const [lessonPlan, setLessonPlan] = useState("");

  return (
    <div className="mx-auto max-w-7xl p-8">
      <h1 className="mb-8 text-4xl font-bold">
        TeacherMate AI Lesson Planner
      </h1>

      <LessonPlannerForm onGenerate={setLessonPlan} />

      <LessonPlanViewer lessonPlan={lessonPlan} />
    </div>
  );
}