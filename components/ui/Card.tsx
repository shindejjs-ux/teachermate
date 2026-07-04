import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`bg-white rounded-3xl shadow-lg border border-gray-100 p-6 transition hover:shadow-2xl ${className}`}
    >
      {children}
    </div>
  );
}