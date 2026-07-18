"use client";

type Option = {
  id: number;
  name: string;
};

type Subject = {
  id: number;
  class_id: number;
  name: string;
};

type Book = {
  id: number;
  subject_id: number;
  title?: string;
  name?: string;
};

type Chapter = {
  id: number;
  book_id: number;
  title?: string;
  name?: string;
};

type Props = {
  classes: Option[];
  subjects: Subject[];
  books: Book[];
  chapters: Chapter[];
  form: any;
  setForm: React.Dispatch<React.SetStateAction<any>>;
};

export default function QuestionForm({
  classes,
  subjects,
  books,
  chapters,
  form,
  setForm,
}: Props) {
  function update(name: string, value: any) {
    setForm((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="space-y-6">

      {/* Class & Subject */}

      <div className="grid md:grid-cols-2 gap-5">

        <select
          value={form.class_id}
          onChange={(e) => {
            update("class_id", Number(e.target.value));
            update("subject_id", "");
            update("book_id", "");
            update("chapter_id", "");
          }}
          className="border rounded-xl p-3"
        >
          <option value="">Select Class</option>

          {classes.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <select
          value={form.subject_id}
          onChange={(e) => {
            update("subject_id", Number(e.target.value));
            update("book_id", "");
            update("chapter_id", "");
          }}
          className="border rounded-xl p-3"
        >
          <option value="">Select Subject</option>

          {subjects
            .filter((s) => s.class_id === form.class_id)
            .map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
        </select>

      </div>

      {/* Book & Chapter */}

      <div className="grid md:grid-cols-2 gap-5">

        <select
          value={form.book_id}
          onChange={(e) => {
            update("book_id", Number(e.target.value));
            update("chapter_id", "");
          }}
          className="border rounded-xl p-3"
        >
          <option value="">Select Book</option>

          {books
            .filter((b) => b.subject_id === form.subject_id)
            .map((b) => (
              <option key={b.id} value={b.id}>
                {b.title ?? b.name}
              </option>
            ))}
        </select>

        <select
          value={form.chapter_id}
          onChange={(e) =>
            update("chapter_id", Number(e.target.value))
          }
          className="border rounded-xl p-3"
        >
          <option value="">Select Chapter</option>

          {chapters
            .filter((c) => c.book_id === form.book_id)
            .map((c) => (
              <option key={c.id} value={c.id}>
                {c.title ?? c.name}
              </option>
            ))}
        </select>

      </div>

      {/* Question */}

      <textarea
        rows={5}
        className="w-full border rounded-xl p-3"
        placeholder="Enter Question"
        value={form.question}
        onChange={(e) => update("question", e.target.value)}
      />

      {/* Answer */}

      <textarea
        rows={4}
        className="w-full border rounded-xl p-3"
        placeholder="Answer / Solution"
        value={form.answer}
        onChange={(e) => update("answer", e.target.value)}
      />

      {/* MCQ Section */}

      {form.question_type === "MCQ" && (
        <div className="space-y-4 border rounded-xl p-5 bg-gray-50">

          <h3 className="text-xl font-semibold">
            MCQ Options
          </h3>

          <input
            className="w-full border rounded-xl p-3"
            placeholder="Option A"
            value={form.option_a}
            onChange={(e) => update("option_a", e.target.value)}
          />

          <input
            className="w-full border rounded-xl p-3"
            placeholder="Option B"
            value={form.option_b}
            onChange={(e) => update("option_b", e.target.value)}
          />

          <input
            className="w-full border rounded-xl p-3"
            placeholder="Option C"
            value={form.option_c}
            onChange={(e) => update("option_c", e.target.value)}
          />

          <input
            className="w-full border rounded-xl p-3"
            placeholder="Option D"
            value={form.option_d}
            onChange={(e) => update("option_d", e.target.value)}
          />

          <select
            value={form.correct_option}
            onChange={(e) =>
              update("correct_option", e.target.value)
            }
            className="border rounded-xl p-3 w-full"
          >
            <option value="">Correct Option</option>
            <option value="A">Option A</option>
            <option value="B">Option B</option>
            <option value="C">Option C</option>
            <option value="D">Option D</option>
          </select>

        </div>
      )}

      {/* Explanation */}

      <textarea
        rows={4}
        className="w-full border rounded-xl p-3"
        placeholder="Explanation"
        value={form.explanation}
        onChange={(e) =>
          update("explanation", e.target.value)
        }
      />

      {/* Properties */}

      <div className="grid md:grid-cols-4 gap-4">

        <input
          type="number"
          min={1}
          value={form.marks}
          onChange={(e) =>
            update("marks", Number(e.target.value))
          }
          className="border rounded-xl p-3"
          placeholder="Marks"
        />

        <select
          value={form.difficulty}
          onChange={(e) =>
            update("difficulty", e.target.value)
          }
          className="border rounded-xl p-3"
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>

        <select
          value={form.question_type}
          onChange={(e) =>
            update("question_type", e.target.value)
          }
          className="border rounded-xl p-3"
        >
          <option>MCQ</option>
          <option>VSA</option>
          <option>SA</option>
          <option>LA</option>
          <option>Case Study</option>
          <option>Assertion Reason</option>
        </select>

        <select
          value={form.blooms_level}
          onChange={(e) =>
            update("blooms_level", e.target.value)
          }
          className="border rounded-xl p-3"
        >
          <option>Remember</option>
          <option>Understand</option>
          <option>Apply</option>
          <option>Analyse</option>
          <option>Evaluate</option>
          <option>Create</option>
        </select>

      </div>

      {/* Competency */}

      <label className="flex items-center gap-3">

        <input
          type="checkbox"
          checked={form.competency}
          onChange={(e) =>
            update("competency", e.target.checked)
          }
        />

        <span>Competency Based Question</span>

      </label>

    </div>
  );
}