"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    // Demo login
    if (email === "admin@teachermate.com" && password === "admin123") {
      router.push("/dashboard");
    } else {
      setError("Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md rounded-xl bg-white shadow-lg p-8">

        <h1 className="text-3xl font-bold text-center">
          TeacherMate
        </h1>

        <p className="text-center text-gray-500 mt-2">
          AI Powered Digital Learning Platform
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">

          <div>
            <label className="block mb-1 font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>


          <div>
            <label className="block mb-1 font-medium">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>


          {error && (
            <p className="text-red-600 text-sm">
              {error}
            </p>
          )}


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white rounded-lg py-3 font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>


        <div className="mt-6 text-sm text-gray-500 text-center">
          Demo Login:
          <br />
          admin@teachermate.com
          <br />
          Password: admin123
        </div>

      </div>
    </div>
  );
}