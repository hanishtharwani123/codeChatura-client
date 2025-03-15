import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaCheck, FaTimes, FaLightbulb } from "react-icons/fa";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import baseUrl from "../../baseUrl";

const ViewMCQ = () => {
  const { id } = useParams();
  const [mcq, setMCQ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    const fetchMCQ = async () => {
      try {
        const response = await axios.get(`${baseUrl}/mcq/${id}`);
        setMCQ(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching MCQ:", err);
        setError("Failed to load the MCQ. Please try again later.");
        setLoading(false);
      }
    };

    fetchMCQ();
  }, [id]);

  const handleOptionSelect = (optionId) => {
    if (!isAnswered) {
      setSelectedOption(optionId);
    }
  };

  const handleSubmit = () => {
    if (selectedOption) {
      setIsAnswered(true);
      setShowExplanation(true);
    }
  };

  const handleReset = () => {
    setSelectedOption(null);
    setIsAnswered(false);
    setShowExplanation(false);
  };

  // Enhanced custom renderer for code blocks in markdown with additional styling
  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "";

      return !inline && language ? (
        <div className="code-block-wrapper relative my-4 rounded-lg overflow-hidden border border-gray-700 shadow-lg">
          <div className="code-language-label absolute top-0 right-0 px-2 py-1 text-xs font-mono bg-gray-700 text-gray-300 rounded-bl z-10">
            {language}
          </div>
          <SyntaxHighlighter
            style={atomDark}
            language={language}
            PreTag="div"
            className="rounded-lg !mt-0"
            showLineNumbers={true}
            wrapLines={true}
            {...props}
          >
            {String(children).replace(/\n$/, "")}
          </SyntaxHighlighter>
        </div>
      ) : (
        <code
          className={`${className} bg-gray-100 px-1 py-0.5 rounded text-red-600 font-mono text-sm`}
          {...props}
        >
          {children}
        </code>
      );
    },
    pre({ children }) {
      return <div className="not-prose my-4">{children}</div>;
    },
    // Enhanced table rendering for data-heavy questions
    table({ children }) {
      return (
        <div className="overflow-x-auto my-4 pb-2">
          <table className="min-w-full border-collapse border border-gray-300 rounded-lg shadow-sm">
            {children}
          </table>
        </div>
      );
    },
    thead({ children }) {
      return <thead className="bg-gray-100 text-left">{children}</thead>;
    },
    th({ children }) {
      return (
        <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold text-gray-700">
          {children}
        </th>
      );
    },
    td({ children }) {
      return (
        <td className="border border-gray-300 px-4 py-2 text-sm text-gray-700 font-mono whitespace-nowrap">
          {children}
        </td>
      );
    },
    // Enhance mathematical expressions
    p({ children }) {
      return <p className="my-2">{children}</p>;
    },
    // Better image handling
    img(props) {
      return (
        <img
          {...props}
          className="max-w-full h-auto my-4 rounded-lg shadow-md"
          loading="lazy"
        />
      );
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
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
          <p className="text-gray-700 text-lg">Loading MCQ...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-red-50 rounded-lg border border-red-200">
          <p className="text-red-700 text-lg mb-4">{error}</p>
          <Link
            to="/mcq-generator"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <FaArrowLeft className="mr-2" />
            Back to MCQ Generator
          </Link>
        </div>
      </div>
    );
  }

  if (!mcq) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <FaTimes className="text-red-500 text-4xl mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Not Found</h2>
          <p className="text-gray-600 mb-4">
            The requested MCQ could not be found.
          </p>
          <Link
            to="/mcq-generator"
            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300"
          >
            <FaArrowLeft className="mr-2" /> Go Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Navigation */}
        <div className="mb-6">
          <Link
            to="/mcq-with-ai"
            className="inline-flex items-center text-green-600 hover:text-green-700 transition"
          >
            <FaArrowLeft className="mr-2" /> Back to Generator
          </Link>
        </div>

        {/* MCQ Card */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header - Showing difficulty level and title */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold text-white">{mcq.title}</h1>
              <span className="bg-white text-green-600 rounded-full px-3 py-1 text-sm font-medium">
                {mcq.difficultyLevel}
              </span>
            </div>
          </div>

          {/* Question */}
          <div className="p-6 border-b">
            <div className="prose max-w-none">
              <ReactMarkdown
                components={components}
                rehypePlugins={[rehypeRaw]}
              >
                {mcq.question}
              </ReactMarkdown>
            </div>
          </div>

          {/* Options */}
          <div className="p-6 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Options
            </h2>
            <div className="space-y-3">
              {mcq.options.map((option) => (
                <div
                  key={option.id}
                  className={`p-4 rounded-lg cursor-pointer transition duration-200 border-2 ${
                    selectedOption === option.id
                      ? "border-green-500 bg-green-50"
                      : "border-gray-200 hover:border-gray-300"
                  } ${
                    isAnswered &&
                    option.id === mcq.correctOptionId &&
                    "border-green-500 bg-green-50"
                  } ${
                    isAnswered &&
                    selectedOption === option.id &&
                    selectedOption !== mcq.correctOptionId &&
                    "border-red-500 bg-red-50"
                  }`}
                  onClick={() => handleOptionSelect(option.id)}
                >
                  <div className="flex items-start">
                    <div
                      className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                        selectedOption === option.id
                          ? "bg-green-500 text-white"
                          : "bg-gray-200"
                      } ${
                        isAnswered &&
                        option.id === mcq.correctOptionId &&
                        "bg-green-500 text-white"
                      } ${
                        isAnswered &&
                        selectedOption === option.id &&
                        selectedOption !== mcq.correctOptionId &&
                        "bg-red-500 text-white"
                      }`}
                    >
                      {option.id}
                    </div>
                    <div className="prose max-w-none flex-grow overflow-x-auto">
                      <ReactMarkdown
                        components={components}
                        rehypePlugins={[rehypeRaw]}
                      >
                        {option.text}
                      </ReactMarkdown>
                    </div>
                    {isAnswered && option.id === mcq.correctOptionId && (
                      <div className="flex-shrink-0 ml-3">
                        <FaCheck className="text-green-500 text-xl" />
                      </div>
                    )}
                    {isAnswered &&
                      selectedOption === option.id &&
                      selectedOption !== mcq.correctOptionId && (
                        <div className="flex-shrink-0 ml-3">
                          <FaTimes className="text-red-500 text-xl" />
                        </div>
                      )}
                  </div>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              {!isAnswered ? (
                <button
                  onClick={handleSubmit}
                  disabled={!selectedOption}
                  className={`px-6 py-3 rounded-lg font-medium text-white ${
                    selectedOption
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-gray-400 cursor-not-allowed"
                  } transition duration-300`}
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition duration-300"
                >
                  Try Again
                </button>
              )}
            </div>
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className="p-6 border-t">
              <div className="flex items-center text-lg font-semibold text-gray-800 mb-4">
                <FaLightbulb className="text-yellow-500 mr-2" />
                Explanation
              </div>
              <div className="prose max-w-none bg-yellow-50 p-4 rounded-lg">
                <ReactMarkdown
                  components={components}
                  rehypePlugins={[rehypeRaw]}
                >
                  {mcq.explanation}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewMCQ;
