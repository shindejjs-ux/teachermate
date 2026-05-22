"use client";

import { useState } from "react";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import app from "../../lib/firebase";

const auth = getAuth(app);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Signup Successful!");
    } catch (error: any) {
      alert(error.message);
    }
  };

  const login = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Login Successful!");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-4xl font-bold text-indigo-700 mb-8">
          Teacher Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 border rounded-xl mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-4 border rounded-xl mb-6"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={signup}
          className="w-full bg-green-600 text-white p-4 rounded-xl mb-4"
        >
          Sign Up
        </button>

        <button
          onClick={login}
          className="w-full bg-indigo-600 text-white p-4 rounded-xl"
        >
          Login
        </button>
      </div>
    </div>
  );
}