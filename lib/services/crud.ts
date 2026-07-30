import { supabase } from "../supabase/client";

export async function getAll(table: string) {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data;
}

export async function getById(
  table: string,
  id: string
) {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
}

export async function createRecord(
  table: string,
  values: any
) {
  const { data, error } = await supabase
    .from(table)
    .insert(values)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function updateRecord(
  table: string,
  id: string,
  values: any
) {
  const { data, error } = await supabase
    .from(table)
    .update(values)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteRecord(
  table: string,
  id: string
) {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq("id", id);

  if (error) throw error;
}