// src/components/Footer.jsx
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 text-gray-600 text-sm px-6 py-4 flex flex-col md:flex-row justify-between items-center">
      <span className="mb-2 md:mb-0">© {new Date().getFullYear()} CampaignBuddy. All rights reserved.</span>

      <div className="flex space-x-4 text-gray-500">
        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-600">
          <FaFacebookF />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-blue-400">
          <FaTwitter />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-700">
          <FaLinkedinIn />
        </a>
        <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-black">
          <FaGithub />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
