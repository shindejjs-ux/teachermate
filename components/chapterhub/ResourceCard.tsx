import Link from "next/link";
import ResourceIcon from "./ResourceIcon";

type Props = {
  title: string;
  type: string;
  url?: string | null;
};

const colors: Record<string, string> = {
  textbook: "bg-blue-600",
  pdf: "bg-blue-600",
  notes: "bg-yellow-500",
  worksheet: "bg-orange-500",
  ppt: "bg-purple-600",
  presentation: "bg-purple-600",
  video: "bg-red-600",
  question_bank: "bg-pink-600",
  sample_paper: "bg-indigo-600",
  lab_manual: "bg-emerald-600",
};

export default function ResourceCard({
  title,
  type,
  url,
}: Props) {
  const key = type.toLowerCase().replace(/\s+/g, "_");

  const color =
    colors[key] ??
    "bg-slate-700";

  const available = !!url;

  const card = (
    <div
      className={`${color} rounded-2xl p-6 text-white shadow-lg transition duration-300 hover:scale-105`}
    >
      <div className="flex justify-center">
        <ResourceIcon
          type={type}
          className="h-14 w-14"
        />
      </div>

      <h2 className="mt-5 text-center text-xl font-bold">
        {title}
      </h2>

      <p className="mt-2 text-center text-sm opacity-90">
        {available
          ? "Available"
          : "Coming Soon"}
      </p>
    </div>
  );

  if (!available) {
    return (
      <div className="cursor-not-allowed opacity-60">
        {card}
      </div>
    );
  }

  return (
    <Link
      href={url}
      className="block"
    >
      {card}
    </Link>
  );
}