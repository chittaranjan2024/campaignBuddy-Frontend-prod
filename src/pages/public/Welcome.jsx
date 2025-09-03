// src/pages/Welcome.jsx
import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="min-h-screen flex bg-gray-900">
      {/* Left Side Branding */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-purple-700 via-pink-500 to-indigo-500 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 animate-pulse-slow bg-gradient-to-tr from-pink-400 via-purple-600 to-indigo-400 opacity-30 blur-3xl"></div>
        <div className="text-center z-10">
          <span className="text-6xl animate-bounce mb-4">📧</span>
          <h1 className="text-white text-5xl font-extrabold tracking-wide">
            Campaign <span className="text-yellow-400">Buddy</span>
          </h1>
          <p className="text-white/70 mt-2 text-lg">The ultimate email campaign hub</p>
        </div>
      </div>

      {/* Right Side Buttons */}
      <div className="flex w-full md:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-md relative p-8 rounded-3xl bg-gray-800/70 border border-cyan-400 shadow-xl backdrop-blur-md">
          <h2 className="text-3xl text-white font-bold text-center mb-6">
            Welcome!
          </h2>
          <p className="text-white/70 text-center mb-6">
            Start managing your campaigns efficiently. Login if you already have an account, or sign up to join!
          </p>

          <div className="flex flex-col space-y-4">
            <Link
              to="/login"
              className="w-full py-3 text-center rounded-xl bg-gradient-to-r from-cyan-400 via-pink-500 to-purple-500 text-white font-bold hover:scale-105 hover:shadow-lg transition duration-300"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="w-full py-3 text-center rounded-xl border-2 border-pink-500 text-pink-400 font-bold hover:scale-105 hover:shadow-lg transition duration-300"
            >
              Sign Up
            </Link>
          </div>

          <p className="mt-6 text-sm text-center text-white/50">
            © 2025 CampaignBuddy. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
