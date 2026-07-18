"use client";

import { Bell, Search, UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="h-20 bg-white border-b flex items-center justify-between px-8">

      {/* Left Section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          TeacherMate
        </h1>

        <p className="text-gray-500 text-sm">
          AI Powered CBSE Teaching Platform
        </p>
      </div>

      {/* Center Search */}
      <div className="w-96">
        <input
          type="text"
          placeholder="Search resources, lesson plans..."
          className="w-full border rounded-xl px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        <button className="relative">
          <Bell className="text-slate-600" size={24} />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
            3
          </span>
        </button>

        <div className="flex items-center gap-3">
          <UserCircle size={36} className="text-indigo-600" />

          <div>
            <p className="font-semibold">
              Dr. Jayesh Shinde
            </p>

            <p className="text-sm text-gray-500">
              PGT Mathematics
            </p>
          </div>
        </div>

      </div>

    </header>
  );
}