import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
export const metadata = {
  title: "TeacherMate AI",
  description: "AI Powered Teaching Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-100">
        <div className="flex min-h-screen">

          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <div className="flex-1 ml-72 flex flex-col">

            {/* Header */}
            <Header />

            {/* Page Content */}
            <main className="flex-1 p-8 overflow-y-auto">
              {children}
            </main>

          </div>

        </div>
      </body>
    </html>
  );
}