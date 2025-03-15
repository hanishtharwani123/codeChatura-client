import React from "react";
import { FaGraduationCap } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center space-x-2 text-white font-bold text-xl mb-4">
          <FaGraduationCap className="text-2xl text-green-400" />
          <span>CodeChatura</span>
        </div>
        <p className="text-gray-300">
          © {new Date().getFullYear()} CodeChatura. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
