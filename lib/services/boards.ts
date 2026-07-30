import { supabase } from "@/lib/supabase/client";
import type { BoardInput } from "@/lib/validations/board";

export type Board = {
  id: number;
  name: string;
  code: string;
  created_at?: string;
};

export async function getBoards() {
  const { data, error } = await supabase
    .from("boards")
    .select("*")
    .order("name");

  if (error) throw error;

  return (data ?? []) as Board[];
}

export async function createBoard(values: BoardInput) {
  const { data, error } = await supabase
    .from("boards")
    .insert({
      name: values.name,
      code: values.code,
    })
    .select()
    .single();

  if (error) throw error;

  return data as Board;
}

export async function updateBoard(
  id: number,
  values: BoardInput
) {
  const { data, error } = await supabase
    .from("boards")
    .update({
      name: values.name,
      code: values.code,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data as Board;
}

export async function deleteBoard(
  id: number
) {
  const { error } = await supabase
    .from("boards")
    .delete()
    .eq("id", id);

  if (error) throw error;

  return true;
}