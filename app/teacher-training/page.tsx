"use client";

import Sidebar from "@/components/layout/Sidebar";

export default function TeacherTrainingPage() {
  const courses = [
    {
      title: "CBSE Competency-Based Education",
      duration: "6 Hours",
      level: "Beginner",
    },
    {
      title: "AI Tools for Teachers",
      duration: "5 Hours",
      level: "Intermediate",
    },
    {
      title: "Bloom's Taxonomy in Classroom",
      duration: "4 Hours",
      level: "Beginner",
    },
    {
      title: "Assessment & Question Paper Design",
      duration: "7 Hours",
      level: "Advanced",
    },
    {
      title: "NEP 2020 Implementation",
      duration: "8 Hours",
      level: "Intermediate",
    },
    {
      title: "Experiential & Art Integrated Learning",
      duration: "5 Hours",
      level: "Intermediate",
    },
  ];

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold text-indigo-700">
          🎓 Teacher Training Academy
        </h1>

        <p className="text-gray-600 mt-2 mb-8">
          Upgrade your teaching skills with AI-powered professional development
          courses aligned with CBSE and NEP 2020.
        </p>

        {/* Statistics */}

        <div className="grid md:grid-cols-4 gap-6 mb-10">

          {[
            { title: "Courses", value: "50+" },
            { title: "Certificates", value: "20+" },
            { title: "Training Hours", value: "300+" },
            { title: "AI Workshops", value: "15+" },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="text-gray-500">{item.title}</h3>

              <p className="text-3xl font-bold text-indigo-700 mt-2">
                {item.value}
              </p>
            </div>
          ))}

        </div>

        {/* Courses */}

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-bold text-indigo-700 mb-6">
            Available Training Courses
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {courses.map((course) => (

              <div
                key={course.title}
                className="border rounded-2xl p-6 hover:shadow-xl transition"
              >

                <h3 className="text-xl font-bold text-indigo-700">
                  {course.title}
                </h3>

                <p className="mt-3 text-gray-600">
                  Duration: {course.duration}
                </p>

                <p className="text-gray-600">
                  Level: {course.level}
                </p>

                <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl transition">
                  Start Course
                </button>

              </div>

            ))}

          </div>

        </div>

        {/* AI Coach */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">

          <h2 className="text-2xl font-bold text-indigo-700 mb-6">
            🤖 AI Teaching Coach
          </h2>

          <p className="text-gray-600 mb-6">
            Ask the AI for guidance on lesson planning, classroom management,
            pedagogy, assessment, and competency-based teaching.
          </p>

          <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl transition">
            Open AI Coach
          </button>

        </div>

        {/* Certificates */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mt-10">

          <h2 className="text-2xl font-bold text-indigo-700 mb-6">
            🏅 Certificates
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              "CBSE Master Trainer",
              "AI in Education",
              "Assessment Expert",
            ].map((certificate) => (

              <div
                key={certificate}
                className="bg-indigo-50 rounded-2xl p-6 text-center"
              >

                <h3 className="font-bold text-indigo-700">
                  {certificate}
                </h3>

                <button className="mt-5 bg-indigo-600 text-white px-5 py-2 rounded-xl">
                  View Certificate
                </button>

              </div>

            ))}

          </div>

        </div>

      </main>
    </div>
  );
}