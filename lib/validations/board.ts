import { z } from "zod";

export const boardSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Board name is required"),

  code: z
    .string()
    .trim()
    .min(2, "Board code is required")
    .max(20, "Board code cannot exceed 20 characters"),
});

export type BoardInput = z.infer<typeof boardSchema>;