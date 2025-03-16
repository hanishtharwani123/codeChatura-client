import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaGraduationCap,
  FaCode,
  FaListOl,
  FaBars,
  FaTimes,
  FaEye, // Added new icon import
} from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isCodingWithAIActive =
    location.pathname === "/coding-with-ai" ||
    location.pathname === "/view-ai-coding";

  const isMCQWithAIActive =
    location.pathname === "/mcq-with-ai" ||
    location.pathname === "/mcq-with-ai/:id";

  const isViewProblemsActive = location.pathname === "/view-problem-mcq";

  return (
    <nav className="bg-white shadow-md py-4 px-4 md:px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 text-green-600 font-bold text-xl">
          <Link to="/" className="flex items-center space-x-2">
            <FaGraduationCap className="text-2xl" />
            <span className="font-extrabold tracking-tight">CodeChatura</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md p-2"
          >
            {isMenuOpen ? (
              <FaTimes className="h-6 w-6" />
            ) : (
              <FaBars className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-6 text-gray-700">
          <Link
            to="/coding-with-ai"
            className={`hover:text-green-600 transition duration-300 flex items-center space-x-1 font-medium ${
              isCodingWithAIActive
                ? "text-green-600 border-b-2 border-green-600"
                : ""
            }`}
          >
            <FaCode />
            <span>Coding with AI</span>
          </Link>
          <Link
            to="/mcq-with-ai"
            className={`hover:text-green-600 transition duration-300 flex items-center space-x-1 font-medium ${
              isMCQWithAIActive
                ? "text-green-600 border-b-2 border-green-600"
                : ""
            }`}
          >
            <FaListOl />
            <span>MCQ with AI</span>
          </Link>
          <Link
            to="/view-problem-mcq"
            className={`hover:text-green-600 transition duration-300 flex items-center space-x-1 font-medium ${
              isViewProblemsActive
                ? "text-green-600 border-b-2 border-green-600"
                : ""
            }`}
          >
            <FaEye /> {/* Changed icon here */}
            <span>View Problems</span>
          </Link>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 bg-white rounded-lg shadow-lg p-4 absolute left-4 right-4 z-50 border border-gray-100">
          <div className="flex flex-col space-y-4">
            <Link
              to="/coding-with-ai"
              className={`hover:text-green-600 transition duration-300 flex items-center space-x-2 py-2 px-4 hover:bg-green-50 rounded-md ${
                isCodingWithAIActive ? "text-green-600 bg-green-50" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaCode />
              <span>Coding with AI</span>
            </Link>
            <Link
              to="/mcq-with-ai"
              className={`hover:text-green-600 transition duration-300 flex items-center space-x-2 py-2 px-4 hover:bg-green-50 rounded-md ${
                isMCQWithAIActive ? "text-green-600 bg-green-50" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaListOl />
              <span>MCQ with AI</span>
            </Link>
            <Link
              to="/view-problem-mcq"
              className={`hover:text-green-600 transition duration-300 flex items-center space-x-2 py-2 px-4 hover:bg-green-50 rounded-md ${
                isViewProblemsActive ? "text-green-600 bg-green-50" : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <FaEye /> {/* Changed icon here */}
              <span>View Problems</span>
            </Link>
            <Link
              to="/resources"
              className="hover:text-green-600 transition duration-300 py-2 px-4 hover:bg-green-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Resources
            </Link>
            <Link
              to="/about"
              className="hover:text-green-600 transition duration-300 py-2 px-4 hover:bg-green-50 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
