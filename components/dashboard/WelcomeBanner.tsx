import Button from "../ui/Button";
import Card from "../ui/Card";

export default function WelcomeBanner() {
  return (
    <Card className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white overflow-hidden">

      <div className="flex justify-between items-center">

        <div>

          <p className="text-lg opacity-90">
            👋 Good Morning
          </p>

          <h1 className="text-4xl font-bold mt-2">
            Dr. Jayesh Shinde
          </h1>

          <p className="mt-4 text-lg opacity-90 max-w-xl">
            Everything a Teacher Needs.
            One Intelligent Platform.
          </p>

          <div className="flex gap-4 mt-8">

            <Button className="bg-white text-indigo-700 hover:bg-gray-100">
              Generate Lesson Plan
            </Button>

            <Button variant="secondary">
              Ask TeacherMate AI
            </Button>

          </div>

        </div>

        <div className="hidden lg:flex gap-6 text-6xl">

          📚

          🤖

          📝

          📊

        </div>

      </div>

    </Card>
  );
}