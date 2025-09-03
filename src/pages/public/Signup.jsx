// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../services/authService";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    repassword: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    const { name, email, username, password, repassword } = form;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;

    if (!name.trim()) return setErrorMsg("Name is required.");
    if (!email.trim() || !emailRegex.test(email)) return setErrorMsg("Valid email is required.");
    if (!username || !usernameRegex.test(username)) return setErrorMsg("Username should be 3-20 chars, letters, numbers, or underscores.");
    if (!passwordRegex.test(password)) return setErrorMsg("Password must be 6+ chars, include uppercase, lowercase & number.");
    if (password !== repassword) return setErrorMsg("Passwords do not match.");

    try {
      await register({ name, email, username, password, role: "USER" });
      setSuccessMsg("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setErrorMsg(err?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-900">
      {/* Left Side Branding */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-700 via-pink-500 to-indigo-500 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 animate-pulse-slow bg-gradient-to-tr from-pink-400 via-purple-600 to-indigo-400 opacity-30 blur-3xl"></div>
        <div className="text-center z-10">
          <span className="text-6xl animate-bounce mb-4">📧</span>
          <h1 className="text-white text-4xl font-extrabold tracking-wide">
            Campaign <span className="text-yellow-400">Buddy</span>
          </h1>
          <p className="text-white/70 mt-2">Join the futuristic email campaign hub</p>
        </div>
      </div>

      {/* Right Side Signup Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-md relative p-8 rounded-3xl bg-gray-800/70 border border-cyan-400 shadow-xl backdrop-blur-md">
          {/* Neon corner accents */}
          <div className="absolute top-0 left-0 w-16 h-1 bg-cyan-400 rounded animate-pulse-slow"></div>
          <div className="absolute bottom-0 right-0 w-16 h-1 bg-pink-400 rounded animate-pulse-slow"></div>

          <h2 className="text-2xl text-white font-bold text-center mb-6">
            Create an Account
          </h2>

          {errorMsg && (
            <div className="bg-red-500/20 text-red-200 px-4 py-2 mb-4 rounded text-sm border border-red-400 text-center">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="bg-green-500/20 text-green-200 px-4 py-2 mb-4 rounded text-sm border border-green-400 text-center">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="w-full px-4 py-2 rounded-xl border border-cyan-400 bg-gray-900/50 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full px-4 py-2 rounded-xl border border-purple-400 bg-gray-900/50 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Username"
              className="w-full px-4 py-2 rounded-xl border border-pink-400 bg-gray-900/50 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
            />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full px-4 py-2 rounded-xl border border-cyan-400 bg-gray-900/50 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
            <input
              type="password"
              name="repassword"
              value={form.repassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 rounded-xl border border-purple-400 bg-gray-900/50 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />

            <button
              type="submit"
              className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 text-white font-bold hover:scale-105 hover:shadow-lg transition duration-300"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-white/60">
            Already have an account?{" "}
            <Link to="/login" className="text-pink-400 font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
