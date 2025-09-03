// src/pages/AboutDeveloper.jsx
import React from "react";
import profilePic from "../assets/developer.jpg"; // Replace with your image path

export default function AboutDeveloper() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 flex items-center justify-center p-6">
      <div className="max-w-4xl bg-white rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col md:flex-row items-center md:space-x-10">
        {/* Profile Image */}
        <div className="flex-shrink-0 mb-6 md:mb-0">
          <img
            src={profilePic}
            alt="Developer"
            className="w-48 h-48 rounded-full border-4 border-purple-500 shadow-lg transform hover:scale-105 transition duration-300"
          />
        </div>

        {/* Info Section */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Chittaranjan Ghosh</h1>
          <p className="text-purple-600 font-semibold mb-4">
            Full Stack Developer | Java | Spring Boot | React
          </p>
          <p className="text-gray-600 mb-6">
            Passionate about building scalable web applications and intuitive user interfaces. I love exploring new technologies, writing clean code, and solving complex problems.
          </p>

          {/* Social Links */}
          <div className="flex justify-center md:justify-start space-x-6 mb-6 text-2xl">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-gray-600 transition transform hover:scale-110"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/yourusername/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-500 transition transform hover:scale-110"
            >
              <i className="fab fa-linkedin"></i>
            </a>
            <a
              href="mailto:your.email@example.com"
              className="text-red-500 hover:text-red-400 transition transform hover:scale-110"
            >
              <i className="fas fa-envelope"></i>
            </a>
          </div>

          {/* Skills */}
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Skills</h2>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-2">
            {["Java", "Spring Boot", "React", "JavaScript", "MySQL", "MongoDB", "Git", "TailwindCSS"].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium shadow-sm hover:bg-purple-200 transition"
              >
                {skill}
              </span>
            ))}
          </div>

          <p className="mt-8 text-gray-500 text-sm">
            &copy; 2025 Chittaranjan Ghosh. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
