import "./globals.css";
import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: {
    default: "TeacherMate",
    template: "%s | TeacherMate",
  },
  description:
    "TeacherMate by Dr. Jayesh Shinde - A complete CBSE Digital Learning Platform for Students and Teachers.",

  applicationName: "TeacherMate",

  keywords: [
    "TeacherMate",
    "CBSE",
    "Mathematics",
    "Digital Library",
    "Lesson Planner",
    "Question Bank",
    "Worksheets",
    "Teachers",
    "Students",
    "Education",
  ],

  authors: [
    {
      name: "Dr. Jayesh Shinde",
    },
  ],

  creator: "Dr. Jayesh Shinde",

  manifest: "/manifest.json",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icon-192.png",
  },

  openGraph: {
    title: "TeacherMate",
    description:
      "Digital Learning Platform for CBSE Students & Teachers.",
    siteName: "TeacherMate",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "TeacherMate",
    description:
      "Digital Learning Platform for CBSE Students & Teachers.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}