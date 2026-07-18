"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function BooksPage() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState<any[]>([]);

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    const { data, error } = await supabase
      .from("books")
      .select(`
        id,
        title,
        subjects (
          name
        )
      `)
      .order("id");

    if (error) {
      console.error(error);
      return;
    }

    setBooks(data || []);
  }

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );
async function addBook() {

  const input = document.getElementById("newBook") as HTMLInputElement;

  if (!input?.value.trim()) return;

  const { error } = await supabase
    .from("books")
    .insert({
      title: input.value,
      subject_id: 1,
      board_id: 1,
      class_id: 9,
    });

  if (error) {
    console.error(error);
    return;
  }

  input.value = "";

  loadBooks();

}

async function deleteBook(id: number) {
  const ok = confirm("Delete this book?");

  if (!ok) return;

  await supabase
    .from("books")
    .delete()
    .eq("id", id);

  loadBooks();
}

  return (
    <div className="p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          📚 Books Management
        </h1>

        <div className="flex gap-2">

  <input
    id="newBook"
    placeholder="New Book"
    className="border rounded-lg px-3 py-2"
  />

  <button
    onClick={addBook}
    className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg"
  >
    Add Book
  </button>

</div>
      </div>

      {/* Search */}
      <div className="flex justify-between items-center mb-6">

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search books..."
          className="border rounded-lg p-3 w-80"
        />

        <div className="font-bold text-lg">
          Total Books : {books.length}
        </div>

      </div>

      {/* Table */}
      <table className="w-full border border-gray-300">

        <thead className="bg-gray-100">

          <tr>
            <th className="border p-3">ID</th>
            <th className="border p-3">Book</th>
            <th className="border p-3">Subject</th>
            <th className="border p-3">Action</th>
          </tr>

        </thead>

        <tbody>

          {filteredBooks.map((book) => (

            <tr key={book.id}>

              <td className="border p-3">{book.id}</td>

              <td className="border p-3">{book.title}</td>

              <td className="border p-3">
                {book.subjects?.[0]?.name || "-"}
              </td>

              <td className="border p-3">

                <div className="flex gap-4">

  <Link
    href={`/admin/chapters?book=${book.id}`}
    className="text-blue-600"
  >
    Chapters
  </Link>

  <button
    onClick={() => deleteBook(book.id)}
    className="text-red-600"
  >
    Delete
  </button>

</div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}