import { supabase } from "@/lib/supabase-browser";
import { books } from "@/lib/master-data/books";

export async function importBooks() {
  const { error } = await supabase
    .from("books")
   .upsert(books, {
  onConflict: "class_id,subject_id,book_type_id,title",
});

  if (error) {
    return {
      success: false,
      message: error.message,
    };
  }

  return {
    success: true,
    message: `${books.length} books imported successfully.`,
  };
}