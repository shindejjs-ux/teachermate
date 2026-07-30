import { supabase } from "@/lib/supabase-browser";

export async function getQuestions() {
  return await supabase
    .from("question_bank")
    .select("*")
    .order("created_at", { ascending: false });
}

export async function addQuestion(question: any) {
  return await supabase
    .from("question_bank")
    .insert([question]);
}

export async function updateQuestion(id: number, question: any) {
  return await supabase
    .from("question_bank")
    .update(question)
    .eq("id", id);
}

export async function deleteQuestion(id: number) {
  return await supabase
    .from("question_bank")
    .delete()
    .eq("id", id);
}