import "./globals.css";
import type { Metadata } from "next";

export const metadata = {
  title: "TeacherMate - Digital Learning Platform",
  description:
    "TeacherMate by Dr. Jayesh Shinde - CBSE Mathematics resources, worksheets and learning materials.",
  manifest: "/manifest.json",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}