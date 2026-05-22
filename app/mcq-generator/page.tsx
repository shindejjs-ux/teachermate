export default function MCQGeneratorPage() {
  const mcqs = [
    {
      question: "What is the capital of India?",
      options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
      answer: "Delhi",
    },
    {
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Venus", "Jupiter"],
      answer: "Mars",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-indigo-700 mb-4">
          AI MCQ Generator
        </h1>

        <p className="text-gray-600 text-lg mb-10">
          Generate competency-based MCQs for CBSE Classes 1–12.
        </p>

        {/* Generator Box */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-12">
          <div className="grid md:grid-cols-4 gap-6">
            <input
              type="text"
              placeholder="Class"
              className="p-4 rounded-2xl border border-indigo-200"
            />

            <input
              type="text"
              placeholder="Subject"
              className="p-4 rounded-2xl border border-indigo-200"
            />

            <input
              type="text"
              placeholder="Chapter"
              className="p-4 rounded-2xl border border-indigo-200"
            />

            <button className="bg-indigo-600 text-white rounded-2xl hover:bg-indigo-700 transition font-semibold">
              Generate MCQs
            </button>
          </div>
        </div>

        {/* MCQ Cards */}
        <div className="space-y-8">
          {mcqs.map((mcq, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-lg p-8"
            >
              <h2 className="text-2xl font-bold text-indigo-700 mb-6">
                Q{index + 1}. {mcq.question}
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {mcq.options.map((option) => (
                  <div
                    key={option}
                    className="bg-indigo-50 p-4 rounded-2xl hover:bg-indigo-100 transition"
                  >
                    {option}
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-green-100 text-green-700 p-4 rounded-2xl font-semibold">
                Correct Answer: {mcq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}