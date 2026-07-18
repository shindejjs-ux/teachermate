"use client";

import { Bell, Search, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-6">

      <div className="flex items-center gap-3">
        <Search className="w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="outline-none bg-gray-100 rounded-lg px-4 py-2 w-80"
        />
      </div>

      <div className="flex items-center gap-5">

        <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />

        <div className="flex items-center gap-2">
          <UserCircle className="w-9 h-9 text-indigo-600" />
          <div>
            <p className="font-semibold">Dr. Jayesh Shinde</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>

      </div>

    </header>
  );
}