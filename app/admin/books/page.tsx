import Link from "next/link";
import { createClient } from "@/lib/supabase-server";

export default async function BooksPage() {
  const supabase = await createClient();

  const { data: books } = await supabase
    .from("books")
    .select(`
      *,
      classes(class_name),
      subjects(subject_name)
    `)
    .order("class_id")
    .order("subject_id")
    .order("title");

  const totalBooks = books?.length || 0;
  const textbooks =
    books?.filter((b) => b.book_type === "Textbook").length || 0;
  const references =
    books?.filter((b) => b.book_type === "Reference").length || 0;
  const questionBanks =
    books?.filter((b) => b.book_type === "Question Bank").length || 0;

  return (
    <div className="min-h-screen bg-slate-100 p-8">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6 mb-8">

        <div>

          <h1 className="text-4xl font-bold">
            📚 Books Management
          </h1>

          <p className="text-slate-500 mt-2">
            Manage all NCERT and Reference Books
          </p>

        </div>

        <div className="flex gap-3">

          <Link
            href="/admin/books/import"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            📥 Import Books
          </Link>

          <Link
            href="/admin/books/new"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-semibold"
          >
            ➕ Add Book
          </Link>

        </div>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <div className="text-5xl">📚</div>
          <h2 className="text-3xl font-bold mt-3">
            {totalBooks}
          </h2>
          <p className="text-slate-500">
            Total Books
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <div className="text-5xl">📘</div>
          <h2 className="text-3xl font-bold mt-3">
            {textbooks}
          </h2>
          <p className="text-slate-500">
            Textbooks
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <div className="text-5xl">📖</div>
          <h2 className="text-3xl font-bold mt-3">
            {references}
          </h2>
          <p className="text-slate-500">
            Reference Books
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 text-center">
          <div className="text-5xl">❓</div>
          <h2 className="text-3xl font-bold mt-3">
            {questionBanks}
          </h2>
          <p className="text-slate-500">
            Question Banks
          </p>
        </div>

      </div>

      {/* Search */}

      <div className="bg-white rounded-2xl shadow p-5 mb-6">

        <input
          type="text"
          placeholder="🔍 Search books... (Search functionality will be added next)"
          className="w-full border rounded-xl p-4"
          disabled
        />

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <div className="px-6 py-5 border-b bg-slate-50">

          <h2 className="text-2xl font-bold">
            Book List
          </h2>

        </div>

        {books && books.length > 0 ? (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-slate-100">

                <tr>

                  <th className="text-left p-4">Class</th>

                  <th className="text-left p-4">Subject</th>

                  <th className="text-left p-4">Book</th>

                  <th className="text-left p-4">Publisher</th>

                  <th className="text-left p-4">Type</th>

                  <th className="text-left p-4">Language</th>

                  <th className="text-center p-4">Actions</th>

                </tr>

              </thead>

              <tbody>

                {books.map((book) => (

                  <tr
                    key={book.id}
                    className="border-t hover:bg-slate-50 transition"
                  >

                    <td className="p-4">
                      {book.classes?.class_name}
                    </td>

                    <td className="p-4">
                      {book.subjects?.subject_name}
                    </td>

                    <td className="p-4 font-semibold">
                      {book.title}
                    </td>

                    <td className="p-4">
                      {book.publisher}
                    </td>

                    <td className="p-4">

                      <span className="bg-indigo-100 text-indigo-700 rounded-full px-3 py-1 text-sm">

                        {book.book_type}

                      </span>

                    </td>

                    <td className="p-4">
                      {book.language}
                    </td>

                    <td className="p-4">

                      <div className="flex justify-center gap-2">

                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                          ✏ Edit
                        </button>

                        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
                          🗑 Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        ) : (

          <div className="text-center py-20">

            <div className="text-7xl mb-6">
              📚
            </div>

            <h2 className="text-3xl font-bold">
              No Books Available
            </h2>

            <p className="text-slate-500 mt-4">
              Click "Add Book" or "Import Books" to start building your digital library.
            </p>

          </div>

        )}

      </div>

    </div>
  );
}