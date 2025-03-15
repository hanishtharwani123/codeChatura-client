import React, { useState } from "react";
import {
  FaGraduationCap,
  FaCode,
  FaListOl,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-white to-green-50">
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-24">
          <div className="text-center">
            <div className="inline-block mb-6">
              <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                AI-Powered Learning Platform
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-800 mb-6 leading-tight">
              Master Coding & Concepts with{" "}
              <span className="text-green-600 inline-block">
                AI-Powered Learning
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Elevate your programming skills and knowledge with personalized AI
              assistance. Create custom coding challenges and MCQs tailored to
              your learning journey.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/coding-with-ai"
                className="w-full sm:w-auto flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-lg shadow-lg transition duration-300 text-lg font-medium group"
              >
                <FaCode className="mr-2 group-hover:animate-pulse" />
                Create Coding Challenges
              </Link>
              <Link
                to="/mcq-with-ai"
                className="w-full sm:w-auto flex items-center justify-center bg-white border-2 border-green-600 text-green-600 hover:bg-green-50 px-6 py-3 sm:px-8 sm:py-4 rounded-lg shadow-lg transition duration-300 text-lg font-medium group"
              >
                <FaListOl className="mr-2 group-hover:animate-pulse" />
                Generate Custom MCQs
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-center text-3xl font-bold mb-12 text-gray-800">
            Supercharge Your Learning
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300 border-t-4 border-green-500">
              <div className="bg-green-100 p-3 rounded-full inline-block text-green-600 text-3xl mb-4">
                <FaCode />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
                Coding with AI
              </h3>
              <p className="text-gray-600 mb-6">
                Create personalized coding challenges across multiple
                programming languages. Get instant feedback, hints, and detailed
                explanations for optimal learning.
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Custom difficulty levels</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Multiple programming languages</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Detailed explanations</span>
                </li>
              </ul>
              <Link
                to="/coding-with-ai"
                className="text-green-600 font-medium hover:text-green-700 flex items-center transition-all duration-300 hover:translate-x-1"
              >
                Start Coding <span className="ml-2">→</span>
              </Link>
            </div>

            <div className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition duration-300 border-t-4 border-green-500">
              <div className="bg-green-100 p-3 rounded-full inline-block text-green-600 text-3xl mb-4">
                <FaListOl />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">
                MCQ with AI
              </h3>
              <p className="text-gray-600 mb-6">
                Generate tailored multiple-choice questions on any programming
                topic. Test your knowledge, prepare for interviews, and track
                your progress.
              </p>
              <ul className="mb-6 space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Topic-specific questions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Interview preparation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Progress tracking</span>
                </li>
              </ul>
              <Link
                to="/mcq-with-ai"
                className="text-green-600 font-medium hover:text-green-700 flex items-center transition-all duration-300 hover:translate-x-1"
              >
                Create MCQs <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonial section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">
              Why Students Love CodeChatura
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                  JS
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">James Smith</h4>
                  <p className="text-sm text-gray-500">
                    Computer Science Student
                  </p>
                </div>
              </div>
              <p className="text-gray-600">
                "The AI-generated coding challenges are exactly what I needed to
                prepare for technical interviews. The difficulty progression is
                perfect."
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                  AP
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">Ava Patel</h4>
                  <p className="text-sm text-gray-500">Web Developer</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The MCQ generator helped me identify knowledge gaps in my
                JavaScript understanding. Now I feel much more confident in my
                skills."
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">
                  MT
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">Michael Torres</h4>
                  <p className="text-sm text-gray-500">Bootcamp Instructor</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I recommend CodeChatura to all my students. It's like having a
                personal tutor that adapts to your specific learning needs."
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-600 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to accelerate your coding journey?
          </h2>
          <p className="text-white text-lg mb-8 opacity-90">
            Join thousands of students who are mastering programming concepts
            faster with AI assistance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/coding-with-ai"
              className="bg-white text-green-600 hover:bg-green-50 px-8 py-3 rounded-lg shadow-lg transition duration-300 text-lg font-medium"
            >
              Get Started Now
            </Link>
            <Link
              to="/about"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-600 px-8 py-3 rounded-lg shadow-lg transition duration-300 text-lg font-medium"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Info */}
            <div>
              <div className="flex items-center space-x-2 text-white font-bold text-xl mb-4">
                <FaGraduationCap className="text-2xl text-green-400" />
                <span>CodeChatura</span>
              </div>
              <p className="text-gray-300 mb-4">
                Empowering the next generation of developers with AI-driven
                learning tools.
              </p>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Features</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/coding-with-ai"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Coding with AI
                  </Link>
                </li>
                <li>
                  <Link
                    to="/mcq-with-ai"
                    className="text-gray-300 hover:text-white transition"
                  >
                    MCQ with AI
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Practice Mode
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Tutorials
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="font-semibold text-lg mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    Discord Community
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-gray-300 hover:text-white transition"
                  >
                    GitHub
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} CodeChatura. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
