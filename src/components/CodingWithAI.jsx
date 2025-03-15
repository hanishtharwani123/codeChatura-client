import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaGraduationCap,
  FaCode,
  FaListOl,
  FaBars,
  FaTimes,
  FaLightbulb,
  FaRocket,
} from "react-icons/fa";
import axios from "axios";
import baseUrl from "../../baseUrl";

const CodingWithAI = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      setIsGenerating(true);
      setError(null);

      try {
        const response = await axios.post(`${baseUrl}/challenges/generate`, {
          prompt: prompt.trim(),
        });

        // Redirect to the challenge page with the new challenge ID
        navigate(`/view-ai-coding/${response.data._id}`);
      } catch (error) {
        console.error("Error generating challenge:", error);
        setError(
          error.response?.data?.message ||
            "An error occurred while generating the challenge. Please try again."
        );
      } finally {
        setIsGenerating(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Main Content */}
      <div className="flex-grow flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-50 to-white py-12 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Create Custom Coding Challenges
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Generate tailored coding problems with test cases, constraints,
              and explanations using AI. Perfect for interview preparation or
              learning new concepts.
            </p>
          </div>
        </div>

        {/* Input Form */}
        <div className="max-w-4xl mx-auto w-full px-4 py-12">
          <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  Describe Your Coding Challenge
                </h2>
                <p className="text-gray-600">
                  Tell us what kind of coding problem you want to create. Be as
                  specific as possible about the topic, difficulty level, and
                  any special requirements.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <textarea
                    className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-300 resize-none outline-none"
                    placeholder="Example: Create a medium difficulty problem about binary search trees that involves finding the closest value to a target. Include test cases with both balanced and unbalanced trees."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    required
                  ></textarea>
                </div>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg border border-red-200">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className={`w-full md:w-auto px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-md transition duration-300 font-medium flex items-center justify-center ${
                    isGenerating ? "opacity-75 cursor-not-allowed" : ""
                  }`}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Generating Challenge...
                    </>
                  ) : (
                    <>
                      <FaRocket className="mr-2" />
                      Generate Coding Challenge
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Examples */}
          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
              <FaLightbulb className="mr-2 text-yellow-500" />
              Example Prompts
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Data Structures
                </h4>
                <p className="text-gray-600 text-sm">
                  "Create a hard problem about implementing a priority queue
                  with O(log n) insertion and deletion operations. Include
                  detailed explanation of the heap data structure."
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">Algorithms</h4>
                <p className="text-gray-600 text-sm">
                  "Generate an easy to medium difficulty problem that requires
                  using dynamic programming to find the longest increasing
                  subsequence in an array."
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Real-world Application
                </h4>
                <p className="text-gray-600 text-sm">
                  "Create a medium difficulty problem about implementing a
                  simple text editor with undo/redo functionality using stacks."
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                <h4 className="font-semibold text-gray-800 mb-2">
                  Interview Preparation
                </h4>
                <p className="text-gray-600 text-sm">
                  "Generate a Facebook interview style problem about finding all
                  possible valid palindrome partitions of a string. Include test
                  cases and solution approach."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodingWithAI;
