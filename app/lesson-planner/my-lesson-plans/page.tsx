"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase-browser";

interface LessonPlan {
  id: string;
  teacher_name: string;
  chapter: string;
  duration: string;
  content: string;
  created_at: string;
}

export default function MyLessonPlansPage() {
  const [plans, setPlans] = useState<LessonPlan[]>([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  async function fetchPlans() {
    const { data, error } = await supabase
      .from("lesson_plans")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setPlans(data);
    }
  }

  async function deletePlan(id: string) {
    const confirmDelete = confirm(
      "Delete this lesson plan?"
    );

    if (!confirmDelete) return;

    await supabase
      .from("lesson_plans")
      .delete()
      .eq("id", id);

    fetchPlans();
  }

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold mb-8">
        My Lesson Plans
      </h1>

      {plans.length === 0 ? (

        <div className="text-gray-500">
          No Lesson Plans Found.
        </div>

      ) : (

        <div className="grid gap-6">

          {plans.map((plan) => (

            <div
              key={plan.id}
              className="bg-white shadow rounded-2xl p-6"
            >

              <h2 className="text-2xl font-bold">
                {plan.chapter}
              </h2>

              <p className="text-gray-500 mt-2">
                Teacher: {plan.teacher_name}
              </p>

              <p className="text-gray-500">
                Duration: {plan.duration}
              </p>

              <button
                onClick={() => deletePlan(plan.id)}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-xl"
              >
                Delete
              </button>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}