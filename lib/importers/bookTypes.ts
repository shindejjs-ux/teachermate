import { importData } from "./importData";
import { bookTypes } from "@/lib/master-data/bookTypes";

export async function importBookTypes() {
  return await importData(
    "book_types",
    bookTypes
  );
}