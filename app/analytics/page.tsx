export default function AnalyticsPage() {
  const stats = [
    {
      title: "Total Teachers",
      value: "1,250",
      icon: "👩‍🏫",
    },
    {
      title: "Lesson Plans Generated",
      value: "8,430",
      icon: "📝",
    },
    {
      title: "MCQs Created",
      value: "24,100",
      icon: "✅",
    },
    {
      title: "Students Engaged",
      value: "15,600",
      icon: "🎓",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-indigo-700">
            Analytics Dashboard
          </h1>

          <p className="text-gray-600 text-lg mt-3">
            AI-powered teaching insights and CBSE performance analytics.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white rounded-3xl shadow-xl p-8 hover:scale-105 transition"
            >
              <div className="text-5xl mb-4">{stat.icon}</div>

              <h2 className="text-4xl font-bold text-indigo-700">
                {stat.value}
              </h2>

              <p className="text-gray-600 mt-2">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-indigo-700 mb-6">
              Subject Performance
            </h2>

            <div className="space-y-6">
              {[
                { subject: "Mathematics", progress: "90%" },
                { subject: "Science", progress: "82%" },
                { subject: "English", progress: "88%" },
                { subject: "Social Science", progress: "76%" },
              ].map((item) => (
                <div key={item.subject}>
                  <div className="flex justify-between mb-2">
                    <span>{item.subject}</span>
                    <span>{item.progress}</span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div
                      className="bg-indigo-600 h-4 rounded-full"
                      style={{ width: item.progress }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Section */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-indigo-700 mb-6">
              Recent Activities
            </h2>

            <div className="space-y-5">
              {[
                "New worksheet generated for Class 10 Maths",
                "MCQ assessment created for Science",
                "Lesson plan updated for English",
                "Analytics report downloaded",
              ].map((activity) => (
                <div
                  key={activity}
                  className="bg-indigo-50 p-4 rounded-2xl"
                >
                  {activity}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}