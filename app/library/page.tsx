import Sidebar from "../../components/Sidebar";

export default function LibraryPage() {
  return (
    <div className="flex">
      <Sidebar />

      <div className="p-8">
        <h1 className="text-4xl font-bold mb-8">
          Digital Library 📚
        </h1>

        <a
          href="https://drive.google.com/file/d/1nNKlhHLZOm5rTzDwTI0RatpFsRJ-aa_j/preview"
          target="_blank"
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl"
        >
          Open PDF
        </a>
      </div>
    </div>
  );
}