"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";

export default function SettingsPage() {
  const [schoolName, setSchoolName] = useState("The Aditya Birla Public School");
  const [teacherName, setTeacherName] = useState("Dr. Jayesh Shinde");
  const [email, setEmail] = useState("jayesh@example.com");
  const [theme, setTheme] = useState("Light");
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar />

      <main className="flex-1 p-8">

        <h1 className="text-4xl font-bold text-indigo-700">
          ⚙️ Settings
        </h1>

        <p className="text-gray-600 mt-2 mb-8">
          Manage your TeacherMate account and application preferences.
        </p>

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <h2 className="text-2xl font-bold text-indigo-700 mb-6">
            Profile Settings
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <label className="block font-semibold mb-2">
                School Name
              </label>

              <input
                className="w-full border rounded-xl p-3"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Teacher Name
              </label>

              <input
                className="w-full border rounded-xl p-3"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Email Address
              </label>

              <input
                type="email"
                className="w-full border rounded-xl p-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Theme
              </label>

              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full border rounded-xl p-3"
              >
                <option>Light</option>
                <option>Dark</option>
                <option>System Default</option>
              </select>
            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <h2 className="text-2xl font-bold text-indigo-700 mb-6">
            Notifications
          </h2>

          <div className="flex items-center justify-between">

            <div>
              <h3 className="font-semibold">
                Email Notifications
              </h3>

              <p className="text-gray-500 text-sm">
                Receive updates about new CBSE resources and AI features.
              </p>
            </div>

            <input
              type="checkbox"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              className="w-6 h-6"
            />

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <h2 className="text-2xl font-bold text-indigo-700 mb-6">
            Account
          </h2>

          <div className="flex flex-wrap gap-4">

            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl transition">
              Save Changes
            </button>

            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition">
              Backup Data
            </button>

            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl transition">
              Logout
            </button>

          </div>

        </div>

      </main>
    </div>
  );
}