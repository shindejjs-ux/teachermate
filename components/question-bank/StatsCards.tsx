"use client";

type Props = {
  total: number;
  mcq: number;
  competency: number;
  hots: number;
};

export default function StatsCards({
  total,
  mcq,
  competency,
  hots,
}: Props) {
  const cards = [
    {
      title: "Total Questions",
      value: total,
      color: "bg-blue-500",
    },
    {
      title: "MCQs",
      value: mcq,
      color: "bg-green-500",
    },
    {
      title: "Competency",
      value: competency,
      color: "bg-purple-500",
    },
    {
      title: "HOTS",
      value: hots,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white rounded-2xl shadow p-6"
        >
          <div
            className={`${card.color} w-12 h-12 rounded-xl mb-4`}
          />

          <h3 className="text-gray-500">
            {card.title}
          </h3>

          <p className="text-3xl font-bold mt-2">
            {card.value}
          </p>
        </div>
      ))}
    </div>
  );
}