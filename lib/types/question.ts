export interface Question {
  id?: number;

  class_id: number;

  subject_id: number;

  book_id: number;

  chapter_id: number;

  question: string;

  answer: string;

  marks: number;

  difficulty: string;

  question_type: string;

  blooms_level: string;

  competency: boolean;

  created_at?: string;
}