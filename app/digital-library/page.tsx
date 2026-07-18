"use client";

import Link from "next/link";

export default function DigitalLibrary() {
  const classes = [
    "Class 1","Class 2","Class 3","Class 4",
    "Class 5","Class 6","Class 7","Class 8",
    "Class 9","Class 10","Class 11","Class 12",
  ];

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold text-indigo-700 mb-8">
        Digital Library
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

        {classes.map((cls) => (
          <Link
            key={cls}
            href={`/digital-library/${cls.replace(" ","-").toLowerCase()}`}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl hover:scale-105 transition cursor-pointer">

              <div className="text-5xl mb-4">
                📚
              </div>

              <h2 className="text-2xl font-bold">
                {cls}
              </h2>

            </div>
          </Link>
        ))}

      </div>

    </div>
  );
}