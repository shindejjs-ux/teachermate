import { supabase } from "@/lib/supabase-browser";

export async function importData(
  table: string,
  data: any[]
) {
  if (data.length === 0) {
    return {
      success: false,
      message: "No data to import.",
    };
  }

  const { error } = await supabase
    .from(table)
    .upsert(data, {
      onConflict: "id",
    });

  if (error) {
    console.error(error);

    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: `${data.length} records imported successfully.`,
  };
}