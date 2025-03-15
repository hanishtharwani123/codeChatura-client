import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  FaGraduationCap,
  FaCode,
  FaListOl,
  FaBars,
  FaTimes,
  FaArrowLeft,
  FaCopy,
  FaCheckCircle,
  FaLightbulb,
  FaLock,
  FaUnlock,
  FaExclamationTriangle,
} from "react-icons/fa";
import baseUrl from "../../baseUrl";

const ChallengeView = () => {
  const { id } = useParams();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedTestCase, setCopiedTestCase] = useState(null);
  const [activeTab, setActiveTab] = useState("description");
  const [showHint, setShowHint] = useState(false);
  const [showPrivateTests, setShowPrivateTests] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const response = await axios.get(`${baseUrl}/challenges/${id}`);
        setChallenge(response.data);
      } catch (error) {
        console.error("Error fetching challenge:", error);
        setError(
          error.response?.data?.message ||
            "An error occurred while fetching the challenge. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id]);

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedTestCase(index);
    setTimeout(() => {
      setCopiedTestCase(null);
    }, 2000);
  };

  // Add this function to your component file to handle code formatting
  const formatWithCodeBlocks = (text) => {
    if (!text) return "";

    // First, handle multi-line code blocks (```code```)
    let formattedText = text.replace(
      /```([^`]*?)```/gs,
      (match, codeContent) => {
        return `<pre class="bg-gray-100 p-3 rounded-md my-3 text-sm overflow-x-auto">${escapeHtml(
          codeContent.trim()
        )}</pre>`;
      }
    );

    // Then, handle inline code (`code`)
    formattedText = formattedText.replace(
      /`([^`]+?)`/g,
      (match, codeContent) => {
        return `<code class="bg-gray-100 px-1 py-0.5 rounded text-pink-600 font-mono text-sm">${escapeHtml(
          codeContent
        )}</code>`;
      }
    );

    return formattedText;
  };

  // Helper function to escape HTML special characters
  const escapeHtml = (unsafe) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <svg
            className="animate-spin h-12 w-12 text-green-600 mx-auto mb-4"
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
          <p className="text-gray-700 text-lg">Loading challenge...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center max-w-md mx-auto p-6 bg-red-50 rounded-lg border border-red-200 shadow-md">
          <p className="text-red-700 text-lg mb-4">{error}</p>
          <Link
            to="/coding-challenges"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition shadow-sm"
          >
            <FaArrowLeft className="mr-2" />
            Back to Challenge Generator
          </Link>
        </div>
      </div>
    );
  }

  if (!challenge) {
    return null;
  }

  const difficultyColor = {
    Easy: "text-green-600 bg-green-50 border-green-200",
    Medium: "text-yellow-600 bg-yellow-50 border-yellow-200",
    Hard: "text-red-600 bg-red-50 border-red-200",
  };

  const difficultyIcon = {
    Easy: "●",
    Medium: "●●",
    Hard: "●●●",
  };

  const toggleMobileSidebar = () => {
    setShowMobileSidebar(!showMobileSidebar);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="container mx-auto px-4 py-4 sm:py-6">
        <div className="mb-4 sm:mb-6">
          <Link
            to="/coding-with-ai"
            className="inline-flex items-center text-green-600 hover:text-green-700 transition"
          >
            <FaArrowLeft className="mr-2" /> Back to Challenge Generator
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden mb-4 flex justify-end">
          <button
            onClick={toggleMobileSidebar}
            className="flex items-center px-3 py-2 border rounded text-green-600 border-green-600 hover:text-green-800 hover:border-green-800"
          >
            {showMobileSidebar ? <FaTimes /> : <FaBars />}
            <span className="ml-2">
              {showMobileSidebar ? "Close" : "Helper Panel"}
            </span>
          </button>
        </div>

        {/* Challenge Content */}
        <div className="flex-grow">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 sm:gap-6">
              {/* Left Column - Problem Info */}
              <div
                className={`w-full lg:w-2/3 ${
                  showMobileSidebar ? "hidden lg:block" : "block"
                }`}
              >
                <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mb-6">
                  {/* Problem Header */}
                  <div className="p-4 sm:p-6 border-b border-gray-100">
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                      <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
                        {challenge.title}
                      </h1>
                      <div className="flex items-center">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            difficultyColor[challenge.difficultyLevel]
                          }`}
                        >
                          {difficultyIcon[challenge.difficultyLevel]}{" "}
                          {challenge.difficultyLevel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tab Navigation */}
                  <div className="bg-gray-50 border-b border-gray-200">
                    <div className="flex overflow-x-auto">
                      <button
                        onClick={() => setActiveTab("description")}
                        className={`px-3 sm:px-4 py-2 sm:py-3 text-sm font-medium whitespace-nowrap ${
                          activeTab === "description"
                            ? "text-green-600 border-b-2 border-green-600 bg-white"
                            : "text-gray-600 hover:text-green-600"
                        }`}
                      >
                        Description
                      </button>
                      <button
                        onClick={() => setActiveTab("examples")}
                        className={`px-3 sm:px-4 py-2 sm:py-3 text-sm font-medium whitespace-nowrap ${
                          activeTab === "examples"
                            ? "text-green-600 border-b-2 border-green-600 bg-white"
                            : "text-gray-600 hover:text-green-600"
                        }`}
                      >
                        Examples
                      </button>
                      <button
                        onClick={() => setActiveTab("solution")}
                        className={`px-3 sm:px-4 py-2 sm:py-3 text-sm font-medium whitespace-nowrap ${
                          activeTab === "solution"
                            ? "text-green-600 border-b-2 border-green-600 bg-white"
                            : "text-gray-600 hover:text-green-600"
                        }`}
                      >
                        Explanation
                      </button>
                    </div>
                  </div>

                  {/* Tab Content */}
                  {/* Tab Content */}
                  <div className="p-4 sm:p-6">
                    {activeTab === "description" && (
                      <div>
                        {/* Description */}
                        <div className="mb-6 sm:mb-8">
                          <div className="prose prose-green max-w-none">
                            <div
                              className="whitespace-pre-line"
                              dangerouslySetInnerHTML={{
                                __html: formatWithCodeBlocks(
                                  challenge.description
                                ),
                              }}
                            />
                          </div>
                        </div>

                        {/* Input Format */}
                        <div className="mb-5 sm:mb-6">
                          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                            Input Format
                          </h2>
                          <div className="prose prose-green max-w-none text-gray-700">
                            <div
                              className="whitespace-pre-line"
                              dangerouslySetInnerHTML={{
                                __html: formatWithCodeBlocks(
                                  challenge.inputFormat
                                ),
                              }}
                            />
                          </div>
                        </div>

                        {/* Output Format */}
                        <div className="mb-5 sm:mb-6">
                          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                            Output Format
                          </h2>
                          <div className="prose prose-green max-w-none text-gray-700">
                            <div
                              className="whitespace-pre-line"
                              dangerouslySetInnerHTML={{
                                __html: formatWithCodeBlocks(
                                  challenge.outputFormat
                                ),
                              }}
                            />
                          </div>
                        </div>

                        {/* Constraints */}
                        <div className="mb-5 sm:mb-6">
                          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
                            Constraints
                          </h2>
                          <div className="prose prose-green max-w-none text-gray-700">
                            <div
                              className="whitespace-pre-line"
                              dangerouslySetInnerHTML={{
                                __html: formatWithCodeBlocks(
                                  challenge.constraints
                                ),
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "examples" && (
                      <div>
                        {/* Public Test Cases */}
                        <div className="mb-6 sm:mb-8">
                          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 flex items-center">
                            <FaUnlock className="mr-2 text-green-600" />
                            Public Test Cases
                          </h2>
                          <div className="space-y-4 sm:space-y-6">
                            {challenge.publicTestCases.map(
                              (testCase, index) => (
                                <div
                                  key={`public-${index}`}
                                  className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden"
                                >
                                  <div className="p-2 sm:p-3 border-b border-gray-200 bg-gray-100 flex justify-between items-center">
                                    <h3 className="font-medium text-gray-700 text-sm sm:text-base">
                                      Example {index + 1}
                                    </h3>
                                    <button
                                      onClick={() =>
                                        copyToClipboard(
                                          testCase.input,
                                          `public-${index}`
                                        )
                                      }
                                      className="flex items-center text-xs sm:text-sm text-gray-600 hover:text-green-600 transition p-1"
                                    >
                                      {copiedTestCase === `public-${index}` ? (
                                        <>
                                          <FaCheckCircle className="mr-1 text-green-500" />
                                          Copied!
                                        </>
                                      ) : (
                                        <>
                                          <FaCopy className="mr-1" />
                                          Copy Input
                                        </>
                                      )}
                                    </button>
                                  </div>
                                  <div className="p-2 sm:p-3 border-b border-gray-200">
                                    <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                      Input:
                                    </h4>
                                    <pre className="bg-gray-100 p-2 sm:p-3 rounded-md text-xs sm:text-sm overflow-x-auto">
                                      {testCase.input}
                                    </pre>
                                  </div>
                                  <div className="p-2 sm:p-3">
                                    <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                      Output:
                                    </h4>
                                    <pre className="bg-gray-100 p-2 sm:p-3 rounded-md text-xs sm:text-sm overflow-x-auto">
                                      {testCase.output}
                                    </pre>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        {/* Private Test Cases - Toggle Option */}
                        <div className="mb-6 sm:mb-8">
                          <div
                            className="flex items-center justify-between cursor-pointer mb-3"
                            onClick={() =>
                              setShowPrivateTests(!showPrivateTests)
                            }
                          >
                            <h2 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
                              <FaLock className="mr-2 text-gray-500" />
                              Private Test Cases
                            </h2>
                            <span className="text-green-600 text-sm font-medium">
                              {showPrivateTests ? "Hide" : "Show"}
                            </span>
                          </div>

                          {showPrivateTests && (
                            <div className="space-y-4 sm:space-y-6">
                              {challenge.privateTestCases.map(
                                (testCase, index) => (
                                  <div
                                    key={`private-${index}`}
                                    className="bg-gray-50 border border-gray-200 rounded-lg overflow-hidden"
                                  >
                                    <div className="p-2 sm:p-3 border-b border-gray-200 bg-gray-100 flex justify-between items-center">
                                      <h3 className="font-medium text-gray-700 text-sm sm:text-base">
                                        Private Test {index + 1}
                                      </h3>
                                      <button
                                        onClick={() =>
                                          copyToClipboard(
                                            testCase.input,
                                            `private-${index}`
                                          )
                                        }
                                        className="flex items-center text-xs sm:text-sm text-gray-600 hover:text-green-600 transition p-1"
                                      >
                                        {copiedTestCase ===
                                        `private-${index}` ? (
                                          <>
                                            <FaCheckCircle className="mr-1 text-green-500" />
                                            Copied!
                                          </>
                                        ) : (
                                          <>
                                            <FaCopy className="mr-1" />
                                            Copy Input
                                          </>
                                        )}
                                      </button>
                                    </div>
                                    <div className="p-2 sm:p-3 border-b border-gray-200">
                                      <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                        Input:
                                      </h4>
                                      <pre className="bg-gray-100 p-2 sm:p-3 rounded-md text-xs sm:text-sm overflow-x-auto">
                                        {testCase.input}
                                      </pre>
                                    </div>
                                    <div className="p-2 sm:p-3">
                                      <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">
                                        Output:
                                      </h4>
                                      <pre className="bg-gray-100 p-2 sm:p-3 rounded-md text-xs sm:text-sm overflow-x-auto">
                                        {testCase.output}
                                      </pre>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </div>

                        {/* Edge Cases */}
                        <div>
                          <h2 className="text-base sm:text-lg font-semibold text-gray-800 mb-3 flex items-center">
                            <FaExclamationTriangle className="mr-2 text-yellow-600" />
                            Edge Cases
                          </h2>
                          <div className="space-y-4 sm:space-y-6">
                            {challenge.edgeCases.map((testCase, index) => (
                              <div
                                key={`edge-${index}`}
                                className="bg-yellow-50 border border-yellow-200 rounded-lg overflow-hidden"
                              >
                                <div className="p-2 sm:p-3 border-b border-yellow-200 bg-yellow-100 flex justify-between items-center">
                                  <h3 className="font-medium text-yellow-800 text-sm sm:text-base">
                                    Edge Case {index + 1}
                                  </h3>
                                  <button
                                    onClick={() =>
                                      copyToClipboard(
                                        testCase.input,
                                        `edge-${index}`
                                      )
                                    }
                                    className="flex items-center text-xs sm:text-sm text-yellow-700 hover:text-yellow-900 transition p-1"
                                  >
                                    {copiedTestCase === `edge-${index}` ? (
                                      <>
                                        <FaCheckCircle className="mr-1 text-green-500" />
                                        Copied!
                                      </>
                                    ) : (
                                      <>
                                        <FaCopy className="mr-1" />
                                        Copy Input
                                      </>
                                    )}
                                  </button>
                                </div>
                                <div className="p-2 sm:p-3 border-b border-yellow-200">
                                  <h4 className="text-xs sm:text-sm font-medium text-yellow-800 mb-2">
                                    Input:
                                  </h4>
                                  <pre className="bg-yellow-100 p-2 sm:p-3 rounded-md text-xs sm:text-sm overflow-x-auto">
                                    {testCase.input}
                                  </pre>
                                </div>
                                <div className="p-2 sm:p-3">
                                  <h4 className="text-xs sm:text-sm font-medium text-yellow-800 mb-2">
                                    Output:
                                  </h4>
                                  <pre className="bg-yellow-100 p-2 sm:p-3 rounded-md text-xs sm:text-sm overflow-x-auto">
                                    {testCase.output}
                                  </pre>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {activeTab === "solution" && (
                      <div>
                        {/* Explanation Toggle */}
                        <div
                          className="mb-6 p-3 sm:p-4 border border-gray-200 rounded-lg bg-gray-50 cursor-pointer hover:bg-gray-100 transition"
                          onClick={() => setShowHint(!showHint)}
                        >
                          <div className="flex items-center justify-between">
                            <h3 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
                              <FaLightbulb className="mr-2 text-yellow-500" />
                              Solution Approach
                            </h3>
                            <span className="text-green-600">
                              {showHint ? "Hide" : "Show"}
                            </span>
                          </div>
                          {showHint && (
                            <div className="mt-4 prose prose-green max-w-none text-sm sm:text-base">
                              <div
                                className="whitespace-pre-line"
                                dangerouslySetInnerHTML={{
                                  __html: formatWithCodeBlocks(
                                    challenge.explanation
                                  ),
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column - Helper Panel */}
              <div
                className={`w-full lg:w-1/3 ${
                  showMobileSidebar ? "block" : "hidden lg:block"
                }`}
              >
                <div className="sticky top-6">
                  {/* Code Editor Tips */}
                  <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mb-6">
                    <div className="p-3 sm:p-4 bg-green-50 border-b border-green-100">
                      <h2 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
                        <FaCode className="mr-2 text-green-600" />
                        Coding Tips
                      </h2>
                    </div>
                    <div className="p-3 sm:p-4">
                      <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700">
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          Read the constraints carefully to identify the
                          expected time and space complexity.
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          Test your solution with both public and edge cases.
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          Consider different approaches before implementing.
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          Look for optimizations after your initial solution
                          works.
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Challenge Stats */}
                  <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                    <div className="p-3 sm:p-4 bg-gray-50 border-b border-gray-100">
                      <h2 className="text-base sm:text-lg font-semibold text-gray-800 flex items-center">
                        <FaListOl className="mr-2 text-gray-600" />
                        Challenge Info
                      </h2>
                    </div>
                    <div className="p-3 sm:p-4">
                      <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
                        <li className="flex justify-between">
                          <span className="text-gray-600">Difficulty:</span>
                          <span
                            className={`font-medium ${
                              challenge.difficultyLevel === "Easy"
                                ? "text-green-600"
                                : challenge.difficultyLevel === "Medium"
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                          >
                            {challenge.difficultyLevel}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">
                            Public Test Cases:
                          </span>
                          <span className="font-medium text-gray-800">
                            {challenge.publicTestCases.length}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">
                            Private Test Cases:
                          </span>
                          <span className="font-medium text-gray-800">
                            {challenge.privateTestCases.length}
                          </span>
                        </li>
                        <li className="flex justify-between">
                          <span className="text-gray-600">Edge Cases:</span>
                          <span className="font-medium text-gray-800">
                            {challenge.edgeCases.length}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChallengeView;
