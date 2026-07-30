interface Props {
  title: string;
  value: string;
}

export default function StatCard({
  title,
  value,
}: Props) {
  return (
    <div className="bg-linear-to-r from-indigo-600 to-purple-600 rounded-3xl p-6 text-white shadow-lg">
      <p className="opacity-80">{title}</p>

      <h2 className="text-4xl font-bold mt-3">
        {value}
      </h2>
    </div>
  );
}