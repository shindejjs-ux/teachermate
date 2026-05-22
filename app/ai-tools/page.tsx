import Link from "next/link";

export default function AIToolsPage() {

  const tools = [
    {
      title: "Lesson Planner",
      desc: "Generate AI-powered lesson plans.",
      link: "/lesson-planner",
      icon: "📝",
    },

    {
      title: "Worksheet Generator",
      desc: "Create worksheets instantly.",
      link: "/worksheets",
      icon: "📄",
    },

    {
      title: "Quiz Generator",
      desc: "Generate MCQs and quizzes.",
      link: "/quiz-generator",
      icon: "❓",
    },

    {
      title: "Question Bank",
      desc: "Competency-based question generator.",
      link: "/question-bank",
      icon: "🎯",
    },
  ];

  return (
    <div className="p-8">

      <h1 className="text-5xl font-bold mb-10">
        AI Teaching Tools 🤖
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {tools.map((tool) => (

          <Link
            href={tool.link}
            key={tool.title}
          >

            <div className="bg-white shadow-xl rounded-3xl p-8 hover:scale-105 transition cursor-pointer border">

              <div className="text-5xl mb-5">
                {tool.icon}
              </div>

              <h2 className="text-2xl font-bold mb-3">
                {tool.title}
              </h2>

              <p className="text-gray-600">
                {tool.desc}
              </p>

            </div>

          </Link>

        ))}

      </div>

    </div>
  );
}