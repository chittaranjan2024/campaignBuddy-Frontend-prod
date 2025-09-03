// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      const data = await login({ username, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      localStorage.setItem("name", data.name);
      localStorage.setItem("email", data.email);
      navigate("/dashboard");
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed. Please try again.";
      setErrorMsg(message);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900">
      {/* Left Side - Branding */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-700 via-pink-500 to-indigo-500 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 animate-pulse-slow bg-gradient-to-tr from-pink-400 via-purple-600 to-indigo-400 opacity-30 blur-3xl"></div>
        <div className="text-center z-10">
          <span className="text-6xl animate-bounce mb-4">📧</span>
          <h1 className="text-white text-4xl font-extrabold tracking-wide">
            Campaign <span className="text-yellow-400">Buddy</span>
          </h1>
          <p className="text-white/70 mt-2">Your futuristic email campaign hub</p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-md relative p-8 rounded-3xl bg-gray-800/70 border border-cyan-400 shadow-xl backdrop-blur-md">
          {/* Floating neon corner lines */}
          <div className="absolute top-0 left-0 w-16 h-1 bg-cyan-400 rounded animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-0 w-16 h-1 bg-pink-400 rounded animate-pulse-slow"></div>

          <h2 className="text-2xl text-white font-bold text-center mb-6">
            Welcome Back
          </h2>

          {errorMsg && (
            <div className="bg-red-500/20 text-red-200 px-4 py-2 mb-4 rounded text-sm border border-red-400">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-white/80 mb-1 text-sm">Username</label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-2 rounded-xl border border-cyan-400 bg-gray-900/50 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
              />
            </div>

            <div>
              <label className="block text-white/80 mb-1 text-sm">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-xl border border-pink-400 bg-gray-900/50 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 text-white font-bold hover:scale-105 hover:shadow-lg transition duration-300"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-white/60">
            Don't have an account?{" "}
            <Link to="/signup" className="text-pink-400 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
