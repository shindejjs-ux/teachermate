"use client";

export type LibraryFiltersProps = {
  classes: { id: number; name: string }[];
  subjects: { id: number; name: string }[];
  books: { id: number; title: string }[];
  chapters: { id: number; title: string }[];

  classId: string;
  subjectId: string;
  bookId: string;
  chapterId: string;

  onClassChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
  onBookChange: (value: string) => void;
  onChapterChange: (value: string) => void;
};

export default function LibraryFilters({
  classes,
  subjects,
  books,
  chapters,
  classId,
  subjectId,
  bookId,
  chapterId,
  onClassChange,
  onSubjectChange,
  onBookChange,
  onChapterChange,
}: LibraryFiltersProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">

      <select
        value={classId}
        onChange={(e) => onClassChange(e.target.value)}
        className="rounded-lg border bg-white p-3"
      >
        <option value="">Select Class</option>

        {classes.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <select
        value={subjectId}
        onChange={(e) => onSubjectChange(e.target.value)}
        className="rounded-lg border bg-white p-3"
        disabled={!classId}
      >
        <option value="">Select Subject</option>

        {subjects.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      <select
        value={bookId}
        onChange={(e) => onBookChange(e.target.value)}
        className="rounded-lg border bg-white p-3"
        disabled={!subjectId}
      >
        <option value="">Select Book</option>

        {books.map((item) => (
          <option key={item.id} value={item.id}>
            {item.title}
          </option>
        ))}
      </select>

      <select
        value={chapterId}
        onChange={(e) => onChapterChange(e.target.value)}
        className="rounded-lg border bg-white p-3"
        disabled={!bookId}
      >
        <option value="">Select Chapter</option>

        {chapters.map((item) => (
          <option key={item.id} value={item.id}>
            {item.title}
          </option>
        ))}
      </select>

    </div>
  );
}