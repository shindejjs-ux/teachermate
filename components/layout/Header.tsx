"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Search,
  Menu,
  ChevronDown,
  Home,
} from "lucide-react";

interface HeaderProps {
  title?: string;
}

export default function Header({
  title,
}: HeaderProps) {
  const pathname = usePathname();

  const pageTitle =
    title ??
    (pathname
      .split("/")
      .filter(Boolean)
      .map((p) =>
        p
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase())
      )
      .join(" / ") ||
    "Dashboard");

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">

      {/* Left */}
      <div className="flex items-center gap-4">

        <button
          className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
          aria-label="Open Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Home size={14} />
            <Link href="/admin" className="hover:text-indigo-600">
              Admin
            </Link>

            <span>/</span>

            <span>{pageTitle}</span>
          </div>

          <h1 className="text-xl font-bold text-slate-800">
            {pageTitle}
          </h1>
        </div>

      </div>

      {/* Search */}
      <div className="hidden lg:block w-full max-w-xl px-8">

        <div className="relative">

          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

          <input
            type="search"
            placeholder="Search books, chapters, resources..."
            className="w-full rounded-xl border border-slate-300 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-indigo-500 focus:bg-white"
          />

        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-3">

        <button
          className="relative rounded-xl p-2 hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-slate-600" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>

        </button>

        <button className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2 hover:bg-slate-50">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600 font-bold text-white">
            JS
          </div>

          <div className="hidden text-left lg:block">
            <p className="text-sm font-semibold">
              Dr. Jayesh Shinde
            </p>

            <p className="text-xs text-slate-500">
              Administrator
            </p>
          </div>

          <ChevronDown className="h-4 w-4 text-slate-500" />

        </button>

      </div>

    </header>
  );
}