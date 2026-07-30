import { supabase } from "@/lib/supabase-browser";

export function getLibraryPdf(path: string) {
  return supabase.storage
    .from("library")
    .getPublicUrl(path).data.publicUrl;
}