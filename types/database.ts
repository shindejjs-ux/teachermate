export type Board = {
  id: number;
  name: string;
  code: string;
};

export type SchoolClass = {
  id: number;
  board_id: number;
  name: string;
  boards?: Board | null;
};

export type Subject = {
  id: number;
  board_id: number;
  class_id: number;
  name: string;
  boards?: Board | null;
  classes?: SchoolClass | null;
};

export type Book = {
  id: number;
  board_id: number;
  class_id: number;
  subject_id: number;
  name: string;
};

export type Chapter = {
  id: number;
  book_id: number;
  chapter_no: number;
  name: string;
};

export type Resource = {
  id: number;
  class_id: number;
  chapter_id: number;
  title: string;
  file_url: string;
  resource_type: string;
  subject: string;
};