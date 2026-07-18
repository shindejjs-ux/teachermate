import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
}

export default function StatsCard({
  title,
  value,
  icon,
  color = "from-indigo-500 to-purple-500",
}: StatsCardProps) {
  return (
    <div
      className={`rounded-3xl bg-gradient-to-r ${color} text-white p-6 shadow-xl hover:scale-105 transition`}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm opacity-80">{title}</p>
          <h2 className="text-3xl font-bold mt-2">{value}</h2>
        </div>

        <div className="text-5xl">
          {icon}
        </div>
      </div>
    </div>
  );
}