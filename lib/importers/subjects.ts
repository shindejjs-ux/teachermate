import { supabase } from "@/lib/supabase-browser";
import { subjects } from "@/lib/master-data/subjects";

export async function importSubjects() {
  const { error } = await supabase
    .from("subjects")
    .insert(subjects);

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: "Subjects imported successfully.",
  };
}