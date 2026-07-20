import "../globals.css";
import type { Metadata } from "next";
// Local Sidebar fallback to avoid missing module error for ../components/Sidebar
function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r shadow-sm p-4">
      <div className="text-xl font-bold mb-4">TeacherMate</div>
      <nav className="flex flex-col gap-2">
        <a className="text-gray-700 hover:text-black" href="#">Dashboard</a>
        <a className="text-gray-700 hover:text-black" href="#">Classes</a>
        <a className="text-gray-700 hover:text-black" href="#">Students</a>
        <a className="text-gray-700 hover:text-black" href="#">Settings</a>
      </nav>
    </aside>
  );
}
import React from "react";

// Local Topbar fallback to avoid missing module error for ../components/Topbar
function Topbar() {
  return (
    <header className="w-full bg-white shadow-sm py-3 px-6 flex items-center justify-between">
      <div className="text-lg font-semibold">Dashboard</div>
      <div className="flex items-center gap-4">
        <button className="text-sm text-gray-600">Notifications</button>
        <div className="w-8 h-8 bg-gray-200 rounded-full" />
      </div>
    </header>
  );
}
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "TeacherMate",
  description: "CBSE Digital Learning Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex flex-1 flex-col">
            {/* Topbar */}
            <Topbar />

            {/* Page Content */}
            <main className="flex-1 p-6 overflow-auto">
              {children}
            </main>
          </div>
        </div>

        {/* Toast Notifications */}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}