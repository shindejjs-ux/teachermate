import Sidebar from "../../components/Sidebar";

export default function LibraryPage() {
  const books = [
    {
      title: "Class 9 Maths",
      link: "https://drive.google.com/file/d/1zdg6Qu0vPLrdwS5w_gHJiXo0C8vSKetf/preview",
    },

    {
      title: "Class 10 Science",
      link: "https://drive.google.com/file/d/1zdg6Qu0vPLrdwS5w_gHJiXo0C8vSKetf/preview",
    },

    {
      title: "Class 11 Physics",
      link: "https://drive.google.com/file/d/1zdg6Qu0vPLrdwS5w_gHJiXo0C8vSKetf/preview",
    },
  ];

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-10 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold text-indigo-700 mb-10">
          Digital Library
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {books.map((book, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-xl hover:scale-105 transition"
            >
              <h2 className="text-2xl font-semibold mb-6">
                {book.title}
              </h2>

              <a
                href={book.link}
                target="_blank"
                className="bg-indigo-600 text-white px-6 py-3 rounded-xl"
              >
                Open PDF
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}