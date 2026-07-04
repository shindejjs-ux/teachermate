import { InputHTMLAttributes } from "react";

export default function Input(
  props: InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      {...props}
      className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
    />
  );
}