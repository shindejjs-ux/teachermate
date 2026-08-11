import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

type PageProps = {
  params: Promise<{
    class: string;
    subject: string;
    book: string;
  }>;
};

type Book = {
  id: number;
  class_id: number;
  subject_id: number;
  title: string;
  publisher?: string | null;
  book_type?: string | null;
  language?: string | null;
  cover_image?: string | null;
};

type Chapter = {
  id: number;
  book_id: number;
  chapter_no: number;
  title: string;
};

type Resource = {
  id: number;
  chapter_id: number;
  resource_type: string;
};

export default async function BookPage({ params }: PageProps) {
  const supabase = await createClient();

  const resolvedParams = await params;

  const classId = Number(resolvedParams.class);
  const subjectId = Number(resolvedParams.subject);
  const bookId = Number(resolvedParams.book);

  if (
    !Number.isInteger(classId) ||
    classId <= 0 ||
    !Number.isInteger(subjectId) ||
    subjectId <= 0 ||
    !Number.isInteger(bookId) ||
    bookId <= 0
  ) {
    return (
      <div className="min-h-screen bg-slate-100 px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-10 text-center shadow-lg">
          <div className="text-6xl">⚠️</div>

          <h1 className="mt-5 text-3xl font-bold text-slate-800">
            Invalid Book
          </h1>

          <p className="mt-3 text-slate-500">
            The requested book could not be identified.
          </p>

          <Link
            href={`/digital-library/${classId}/${subjectId}`}
            className="mt-8 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            ← Back to Books
          </Link>
        </div>
      </div>
    );
  }

  /*
   * IMPORTANT:
   * Validate the complete hierarchy:
   *
   * Class → Subject → Book
   *
   * This prevents a book from another class/subject
   * from appearing through a manually modified URL.
   */
  const { data: bookData, error: bookError } = await supabase
    .from("books")
    .select(
      "id,class_id,subject_id,title,publisher,book_type,language,cover_image"
    )
    .eq("id", bookId)
    .eq("class_id", classId)
    .eq("subject_id", subjectId)
    .maybeSingle();

  if (bookError) {
    console.error("Book loading error:", bookError);
  }

  const book = bookData as Book | null;

  if (!book) {
    return (
      <div className="min-h-screen bg-slate-100 px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-10 text-center shadow-lg">
          <div className="text-7xl">📚</div>

          <h1 className="mt-6 text-3xl font-bold text-slate-800">
            Book Not Found
          </h1>

          <p className="mt-3 text-slate-500">
            This book is not connected to the selected class and subject.
          </p>

          <Link
            href={`/digital-library/${classId}/${subjectId}`}
            className="mt-8 inline-block rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white hover:bg-indigo-700"
          >
            ← Back to Books
          </Link>
        </div>
      </div>
    );
  }

  /*
   * Load chapters belonging to this book.
   */
  const { data: chaptersData, error: chaptersError } = await supabase
    .from("chapters")
    .select("id,book_id,chapter_no,title")
    .eq("book_id", bookId)
    .order("chapter_no", { ascending: true });

  if (chaptersError) {
    console.error("Chapters loading error:", chaptersError);
  }

  const chapters: Chapter[] = chaptersData ?? [];

  /*
   * Load all resources for this book's chapters.
   *
   * We use this to display the resources that actually
   * exist instead of showing fake PDF/Notes/Worksheet boxes.
   */
  const chapterIds = chapters.map((chapter) => chapter.id);

  let resources: Resource[] = [];

  if (chapterIds.length > 0) {
    const { data: resourcesData, error: resourcesError } = await supabase
      .from("resources")
      .select("id,chapter_id,resource_type")
      .in("chapter_id", chapterIds);

    if (resourcesError) {
      console.error("Resources loading error:", resourcesError);
    }

    resources = resourcesData ?? [];
  }

  const firstChapter = chapters[0];

  function getChapterResources(chapterId: number) {
    return resources.filter(
      (resource) => resource.chapter_id === chapterId
    );
  }

  function hasResource(chapterId: number, type: string) {
    return getChapterResources(chapterId).some(
      (resource) => resource.resource_type === type
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-linear-to-r from-indigo-700 to-blue-700 py-12 text-white">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <Link
            href={`/digital-library/${classId}/${subjectId}`}
            className="inline-flex rounded-xl bg-white/15 px-5 py-2.5 font-semibold transition hover:bg-white/25"
          >
            ← Back to Books
          </Link>

          <div className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-200">
              TeacherMate Digital Library
            </p>

            <h1 className="mt-2 text-4xl font-bold md:text-5xl">
              {book.title}
            </h1>

            {book.publisher && (
              <p className="mt-3 text-lg text-indigo-100">
                {book.publisher}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              {book.book_type && (
                <span className="rounded-full bg-white/15 px-4 py-2">
                  📚 {book.book_type}
                </span>
              )}

              {book.language && (
                <span className="rounded-full bg-white/15 px-4 py-2">
                  🌐 {book.language}
                </span>
              )}

              <span className="rounded-full bg-white/15 px-4 py-2">
                📖 {chapters.length}{" "}
                {chapters.length === 1 ? "Chapter" : "Chapters"}
              </span>
            </div>

            {firstChapter && (
              <Link
                href={`/digital-library/${classId}/${subjectId}/${bookId}/${firstChapter.id}`}
                className="mt-7 inline-flex items-center rounded-xl bg-white px-6 py-3 font-semibold text-indigo-700 transition hover:bg-slate-100"
              >
                📖 Start Reading →
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Chapters */}
      <main className="mx-auto max-w-7xl px-6 py-12 md:px-8">
        {chapters.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow-lg">
            <div className="text-7xl">📖</div>

            <h2 className="mt-6 text-3xl font-bold text-slate-800">
              No Chapters Found
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-slate-500">
              This book does not have any chapters connected to it yet.
            </p>

            <Link
              href={`/digital-library/${classId}/${subjectId}`}
              className="mt-8 inline-block rounded-xl bg-indigo-600 px-7 py-3 font-semibold text-white hover:bg-indigo-700"
            >
              ← Back to Books
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-800">
                Chapters
              </h2>

              <p className="mt-2 text-slate-500">
                Select a chapter to access its PDFs and learning resources.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {chapters.map((chapter) => {
                const chapterResources = getChapterResources(chapter.id);

                const pdf = hasResource(chapter.id, "pdf");
                const chapterPdf = hasResource(
                  chapter.id,
                  "chapter_pdf"
                );
                const notes = hasResource(chapter.id, "notes");
                const worksheet = hasResource(
                  chapter.id,
                  "worksheet"
                );
                const questionBank = hasResource(
                  chapter.id,
                  "question_bank"
                );
                const ppt = hasResource(chapter.id, "ppt");
                const video = hasResource(chapter.id, "video");

                const hasPdf = pdf || chapterPdf;

                return (
                  <Link
                    key={chapter.id}
                    href={`/digital-library/${classId}/${subjectId}/${bookId}/${chapter.id}`}
                    className="group"
                  >
                    <article className="h-full rounded-3xl border border-slate-100 bg-white p-6 shadow-md transition duration-200 hover:-translate-y-1 hover:shadow-2xl">
                      {/* Chapter heading */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-sm font-semibold text-indigo-600">
                            Chapter {chapter.chapter_no}
                          </p>

                          <h2 className="mt-2 text-xl font-bold text-slate-800 group-hover:text-indigo-700">
                            {chapter.title}
                          </h2>
                        </div>

                        <div className="text-5xl">📖</div>
                      </div>

                      {/* Resources */}
                      <div className="mt-7 grid grid-cols-2 gap-3">
                        {hasPdf && (
                          <div className="rounded-xl bg-blue-50 p-3 text-center text-blue-700">
                            <div className="text-2xl">📘</div>
                            <p className="mt-1 text-sm font-medium">
                              PDF
                            </p>
                          </div>
                        )}

                        {worksheet && (
                          <div className="rounded-xl bg-green-50 p-3 text-center text-green-700">
                            <div className="text-2xl">📝</div>
                            <p className="mt-1 text-sm font-medium">
                              Worksheet
                            </p>
                          </div>
                        )}

                        {notes && (
                          <div className="rounded-xl bg-yellow-50 p-3 text-center text-yellow-700">
                            <div className="text-2xl">📒</div>
                            <p className="mt-1 text-sm font-medium">
                              Notes
                            </p>
                          </div>
                        )}

                        {questionBank && (
                          <div className="rounded-xl bg-pink-50 p-3 text-center text-pink-700">
                            <div className="text-2xl">❓</div>
                            <p className="mt-1 text-sm font-medium">
                              Question Bank
                            </p>
                          </div>
                        )}

                        {ppt && (
                          <div className="rounded-xl bg-purple-50 p-3 text-center text-purple-700">
                            <div className="text-2xl">📊</div>
                            <p className="mt-1 text-sm font-medium">
                              PPT
                            </p>
                          </div>
                        )}

                        {video && (
                          <div className="rounded-xl bg-red-50 p-3 text-center text-red-700">
                            <div className="text-2xl">🎥</div>
                            <p className="mt-1 text-sm font-medium">
                              Video
                            </p>
                          </div>
                        )}

                        {chapterResources.length === 0 && (
                          <div className="col-span-2 rounded-xl bg-slate-50 p-4 text-center text-slate-500">
                            No resources uploaded yet
                          </div>
                        )}
                      </div>

                      {/* Resource count */}
                      <p className="mt-5 text-sm text-slate-500">
                        {chapterResources.length}{" "}
                        {chapterResources.length === 1
                          ? "resource"
                          : "resources"}{" "}
                        available
                      </p>

                      {/* Open button */}
                      <div className="mt-6 w-full rounded-xl bg-indigo-600 py-3 text-center font-semibold text-white transition group-hover:bg-indigo-700">
                        Open Chapter →
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}