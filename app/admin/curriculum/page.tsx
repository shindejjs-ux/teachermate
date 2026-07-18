export default function CurriculumPage() {
  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold text-indigo-700 mb-8">
        Curriculum Manager
      </h1>

      <div className="grid grid-cols-6 gap-4">

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-bold mb-4">Boards</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-bold mb-4">Classes</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-bold mb-4">Subjects</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-bold mb-4">Books</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-bold mb-4">Chapters</h2>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <h2 className="font-bold mb-4">Resources</h2>
        </div>

      </div>

    </div>
  );
}