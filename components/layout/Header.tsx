"use client";

import { Bell, Search, Menu, ChevronDown } from "lucide-react";

interface HeaderProps {
  title?: string;
}

export default function Header({
  title = "TeacherMate AI",
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">

      {/* Left */}
      <div className="flex items-center gap-4">
        <button
          className="rounded-lg p-2 transition hover:bg-slate-100 lg:hidden"
          aria-label="Open Menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div>
          <h1 className="text-xl font-bold text-slate-800">
            {title}
          </h1>

          <p className="text-xs text-slate-500">
            AI Powered Teaching Platform
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="hidden w-full max-w-lg px-8 lg:block">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />

          <input
            type="search"
            placeholder="Search anything..."
            className="w-full rounded-lg border border-slate-300 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        <button
          className="relative rounded-lg p-2 transition hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5 text-slate-600" />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <button className="flex items-center gap-3 rounded-lg border border-slate-200 px-3 py-2 transition hover:bg-slate-50">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
            JS
          </div>

          <div className="hidden text-left md:block">
            <p className="text-sm font-semibold text-slate-800">
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