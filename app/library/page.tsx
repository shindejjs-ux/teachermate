import Sidebar from "../../components/Sidebar";

export default function LibraryPage() {
  const books = [
    {
  title: "Class 9 Maths - Chapter 1",
  link: "https://drive.google.com/file/d/1nNKlhHLZOm5rTzDwTI0RatpFsRJ-aa_j/preview"
},
{
  title: "Class 9 Maths - Chapter 2",
  link: "https://drive.google.com/file/d/1BNXy9eEUNV1OxVrpuhwM8WIwuMS0HaYC/preview",
},
{
  title: "Class 9 Maths - Chapter 3",
  link: "https://drive.google.com/file/d/1FQSlleeDWQmI2ZJHOMmpvwVk3k8xVBuX/preview",
},
{
  title: "Class 9 Maths - Chapter 4",
  link: "https://drive.google.com/file/d/1v3h_t0BbeNrfD_MLr1KMLAekvNfLy6ne/preview",
},
{
  title: "Class 9 Maths - Chapter 5",
  link: "https://drive.google.com/file/d/1Fnpo_R792MG-hw_eLgBpqypjq5P_kOMH/preview",
},
{
  title: "Class 9 Maths - Chapter 6",
  link: "https://drive.google.com/file/d/1e6WxOLxmryjdpZtaCcYIjhA88UkCnXi0/preview",
},
{
  title: "Class 9 Maths - Chapter 7",
  link: "https://drive.google.com/file/d/1kjEOpOslG7qnniWBHjEPMKU9qx4drj3s/preview",
},
{
  title: "Class 9 Maths - Chapter 8",
  link: "https://drive.google.com/file/d/10R76JmS3Jk8gO1a2p6_OqLFPY4ZJ904d/preview",
},

    {
      title: "Class 10 Science",
      link: "https://drive.google.com/file/d/1zdg6Qu0vPLrdwS5w_gHJiXo0C8vSKetf/preview",
    },

    {
      title: "Class 11 Physics",
      link: "https://drive.google.com/file/d/1zdg6Qu0vPLrdwS5w_gHJiXo0C8vSKetf/preview",
    },
    {
      title: "Class 12 Mathematics - Chapter  1",
      link: "https://drive.google.com/file/d/1nEWV0qdfBC5Kmu_c631dQxDVWsLSnocj/preview",
    },
    {
      title: "Class 12 Mathematics - Chapter  2",
      link: "https://drive.google.com/file/d/1xF5phv55NaQPR8YZEUIFZrXjHCQh7hMw/preview",
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