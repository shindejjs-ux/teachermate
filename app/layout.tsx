import "./globals.css";
// import Sidebar from "@/components/Sidebar";

export const metadata = {
  title: "TeacherMate",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>

        <div className="flex">

          {/* <Sidebar /> */}

          <main className="w-full p-6">
            {children}
          </main>

        </div>

      </body>
    </html>
  );
}