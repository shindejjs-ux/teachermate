"use client";

import { Bell, Search, UserCircle } from "lucide-react";

export default function Topbar() {
  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-6">

      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          TeacherMate
        </h1>

        <p className="text-sm text-gray-500">
          {today}
        </p>
      </div>

      {/* Center */}
      <div className="hidden md:flex items-center bg-gray-100 rounded-xl px-4 py-2 w-[350px]">

        <Search className="w-5 h-5 text-gray-500" />

        <input
          type="text"
          placeholder="Search..."
          className="ml-3 bg-transparent outline-none w-full text-gray-700"
        />

      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        <button className="relative">

          <Bell className="w-6 h-6 text-gray-700" />

          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
            3
          </span>

        </button>

        <div className="flex items-center gap-3">

          <UserCircle className="w-10 h-10 text-indigo-600" />

          <div className="hidden md:block">

            <h3 className="font-semibold text-gray-800">
              Dr. Jayesh Shinde
            </h3>

            <p className="text-sm text-gray-500">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}