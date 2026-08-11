import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";

type DashboardCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  href: string;
  color?: string;
};

export default function DashboardCard({
  title,
  value,
  icon: Icon,
  href,
  color = "bg-indigo-600",
}: DashboardCardProps) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            {title}
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-md ${color}`}
        >
          <Icon size={28} />
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4">
        <span className="text-sm font-medium text-indigo-600">
          Open Module
        </span>

        <ArrowRight
          size={18}
          className="text-indigo-600 transition-transform duration-300 group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}