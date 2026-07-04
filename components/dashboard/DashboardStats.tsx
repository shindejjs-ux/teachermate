import StatCard from "../ui/StatCard";

export default function DashboardStats() {
  return (

    <div className="grid md:grid-cols-4 gap-6 mt-8">

      <StatCard
        title="Lesson Plans"
        value="128"
      />

      <StatCard
        title="Worksheets"
        value="64"
      />

      <StatCard
        title="Question Papers"
        value="18"
      />

      <StatCard
        title="Resources"
        value="320"
      />

    </div>

  );
}