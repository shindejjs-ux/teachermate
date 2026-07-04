import Sidebar from "@/components/layout/Sidebar";
export default function HomePage() {
  const stats = [
    {
      title: "Total Books",
      value: "250+",
    },

    {
      title: "Lesson Plans",
      value: "120+",
    },

    {
      title: "Worksheets",
      value: "80+",
    },

    {
      title: "Teachers",
      value: "500+",
    },
  ];

  return (
    <div className="flex">
      <Sidebar />

      <div className="p-8 flex-1 bg-gray-100 min-h-screen">
        <h1 className="text-5xl font-bold text-indigo-700 mb-8">
          TeacherMate Dashboard 🚀
        </h1>

        <div className="grid md:grid-cols-4 gap-6">
          {stats.map((item) => (
            <div
              key={item.title}
              className="bg-white p-6 rounded-2xl shadow-lg"
            >
              <h2 className="text-xl font-bold text-gray-700">
                {item.title}
              </h2>

              <p className="text-4xl font-bold text-indigo-600 mt-4">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mt-10">
          <h2 className="text-3xl font-bold mb-4">
            Welcome to TeacherMate
          </h2>

          <p className="text-lg text-gray-700">
            AI Powered CBSE Teaching Platform for
            teachers from Classes 1 to 12.
          </p>
        </div>
      </div>
    </div>
  );
}