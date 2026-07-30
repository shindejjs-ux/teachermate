import { supabase } from "@/lib/supabase/client";
import type { ClassInput } from "@/lib/validations/class";

export type SchoolClass = {
  id: number;
  board_id: number;
  name: string;
};

export async function getClasses() {
  const { data, error } = await supabase
    .from("classes")
    .select(`
      id,
      board_id,
      name,
      boards(name)
    `)
    .order("id");

  if (error) throw error;

  return data ?? [];
}

export async function createClass(values: ClassInput) {
  const { data, error } = await supabase
    .from("classes")
    .insert(values)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateClass(
  id: number,
  values: ClassInput
) {
  const { data, error } = await supabase
    .from("classes")
    .update(values)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteClass(id: number) {
  const { error } = await supabase
    .from("classes")
    .delete()
    .eq("id", id);

  if (error) throw error;
}