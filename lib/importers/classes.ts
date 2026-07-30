import { importData } from "./importData";
import { classes } from "@/lib/master-data/classes";

export async function importClasses() {
  return await importData(
    "classes",
    classes
  );
}