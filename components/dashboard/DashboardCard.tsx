import Link from "next/link";
import { LucideIcon, ArrowRight } from "lucide-react";

type Props = {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  href?: string;
  color?: string;
};

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  href,
  color = "bg-blue-600",
}: Props) {
  const card = (
    <div className="rounded-xl bg-white border border-slate-200 p-6 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold text-slate-800">
            {value}
          </h2>
        </div>

        {Icon && (
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-xl text-white ${color}`}
          >
            <Icon size={24} />
          </div>
        )}
      </div>

      {href && (
        <div className="mt-6 flex items-center justify-end text-blue-600">
          <span className="mr-2 text-sm font-medium">
            View
          </span>

          <ArrowRight size={18} />
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{card}</Link>;
  }

  return card;
}