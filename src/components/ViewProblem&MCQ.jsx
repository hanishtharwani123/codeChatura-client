import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import baseUrl from "../../baseUrl";
import {
  FaCode,
  FaListOl,
  FaFilter,
  FaSearch,
  FaExclamationCircle,
  FaCalendarAlt,
  FaChartLine,
  FaSort,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const ChallengesDisplay = () => {
  const [challenges, setChallenges] = useState([]);
  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("coding");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState("All");
  const [sortOption, setSortOption] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch both challenges and MCQs in parallel
        const [challengesRes, mcqsRes] = await Promise.all([
          axios.get(`${baseUrl}/challenges`),
          axios.get(`${baseUrl}/mcq`),
        ]);

        setChallenges(challengesRes.data);
        setMcqs(mcqsRes.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load challenges and MCQs. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterDifficulty, activeTab, sortOption]);

  // Adjust items per page based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(6);
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(8);
      } else {
        setItemsPerPage(9);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial value

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChallengeClick = (id) => {
    navigate(`/view-ai-coding/${id}`);
  };

  const handleMCQClick = (id) => {
    navigate(`/mcq-with-ai/${id}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDifficultyColor = (level) => {
    switch (level) {
      case "Easy":
        return "text-green-600 bg-green-50";
      case "Medium":
        return "text-yellow-600 bg-yellow-50";
      case "Hard":
        return "text-red-600 bg-red-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  // Filter the data
  const filterData = (data) => {
    return data.filter((item) => {
      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesDifficulty =
        filterDifficulty === "All" || item.difficultyLevel === filterDifficulty;
      return matchesSearch && matchesDifficulty;
    });
  };

  // Sort the data
  const sortData = (data) => {
    const sortedData = [...data];
    switch (sortOption) {
      case "newest":
        return sortedData.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      case "oldest":
        return sortedData.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      case "a-z":
        return sortedData.sort((a, b) => a.title.localeCompare(b.title));
      case "z-a":
        return sortedData.sort((a, b) => b.title.localeCompare(a.title));
      case "difficulty-asc":
        const difficultyOrder = { Easy: 1, Medium: 2, Hard: 3 };
        return sortedData.sort(
          (a, b) =>
            difficultyOrder[a.difficultyLevel] -
            difficultyOrder[b.difficultyLevel]
        );
      case "difficulty-desc":
        const difficultyOrderDesc = { Easy: 3, Medium: 2, Hard: 1 };
        return sortedData.sort(
          (a, b) =>
            difficultyOrderDesc[a.difficultyLevel] -
            difficultyOrderDesc[b.difficultyLevel]
        );
      default:
        return sortedData;
    }
  };

  // Apply filters and sorting
  const filteredChallenges = sortData(filterData(challenges));
  const filteredMcqs = sortData(filterData(mcqs));

  // Pagination
  const activeData = activeTab === "coding" ? filteredChallenges : filteredMcqs;
  const totalPages = Math.ceil(activeData.length / itemsPerPage);
  const paginatedData = activeData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-50 to-white py-8 md:py-12 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 md:mb-4">
            Practice Challenges
          </h1>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Improve your skills with our collection of coding challenges and
            multiple-choice questions. Select a challenge to start practicing.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto w-full px-4 py-6 md:py-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-4 md:mb-6 overflow-x-auto scrollbar-hide">
          <button
            className={`py-2 md:py-3 px-3 md:px-6 text-sm md:text-base font-medium flex items-center whitespace-nowrap ${
              activeTab === "coding"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("coding")}
          >
            <FaCode className="mr-1 md:mr-2 text-xs md:text-base" />
            <span className="hidden xs:inline">Coding</span>
            <span className="xs:hidden">Code</span>
          </button>
          <button
            className={`py-2 md:py-3 px-3 md:px-6 text-sm md:text-base font-medium flex items-center whitespace-nowrap ${
              activeTab === "mcq"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
            onClick={() => setActiveTab("mcq")}
          >
            <FaListOl className="mr-1 md:mr-2 text-xs md:text-base" />
            <span className="hidden xs:inline">Multiple Choice</span>
            <span className="xs:hidden">MCQ</span>
          </button>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-4 md:mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-2 md:pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400 text-xs md:text-sm" />
            </div>
            <input
              type="text"
              className="pl-8 md:pl-10 pr-3 md:pr-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              placeholder="Search challenges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 md:gap-3">
            <div className="relative flex-1 md:flex-none">
              <div className="absolute inset-y-0 left-0 pl-2 md:pl-3 flex items-center pointer-events-none">
                <FaFilter className="text-gray-400 text-xs md:text-sm" />
              </div>
              <select
                className="pl-7 md:pl-10 pr-6 md:pr-10 py-2 text-sm md:text-base border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition w-full"
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
              >
                <option value="All">All</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div className="relative flex-1 md:flex-none">
              <div className="absolute inset-y-0 left-0 pl-2 md:pl-3 flex items-center pointer-events-none">
                <FaSort className="text-gray-400 text-xs md:text-sm" />
              </div>
              <select
                className="pl-7 md:pl-10 pr-6 md:pr-10 py-2 text-sm md:text-base border border-gray-300 rounded-lg appearance-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition w-full"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
              >
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
                <option value="difficulty-asc">Easy-Hard</option>
                <option value="difficulty-desc">Hard-Easy</option>
              </select>
            </div>
          </div>
        </div>
        {/* Results count */}
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing {paginatedData.length} of {activeData.length} results
          </p>
        </div>

        {/* Loading and error states */}
        {loading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-center mb-6">
            <FaExclamationCircle className="mr-2" />
            {error}
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && activeData.length === 0 && (
          <div className="text-center py-16 bg-gray-50 rounded-lg">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              {activeTab === "coding" ? (
                <FaCode className="text-gray-400 text-xl" />
              ) : (
                <FaListOl className="text-gray-400 text-xl" />
              )}
            </div>
            <h3 className="text-xl font-medium text-gray-800 mb-2">
              No results found
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              {searchTerm || filterDifficulty !== "All"
                ? "Try adjusting your search or filters to find challenges."
                : `No ${
                    activeTab === "coding" ? "coding challenges" : "MCQs"
                  } available yet.`}
            </p>
          </div>
        )}

        {/* Challenge/MCQ cards */}
        {!loading && !error && activeData.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {paginatedData.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden cursor-pointer h-full"
                onClick={() =>
                  activeTab === "coding"
                    ? handleChallengeClick(item._id)
                    : handleMCQClick(item._id)
                }
              >
                <div className="p-4 md:p-5 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-3">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${getDifficultyColor(
                        item.difficultyLevel
                      )}`}
                    >
                      {item.difficultyLevel}
                    </span>
                    <div className="flex items-center text-xs text-gray-500">
                      <FaCalendarAlt className="mr-1" />
                      {formatDate(item.createdAt)}
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2 text-gray-800 line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow">
                    {activeTab === "coding"
                      ? item.description?.substring(0, 120) + "..."
                      : item.question?.substring(0, 120) + "..."}
                  </p>
                  <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
                    <div className="flex items-center text-green-600 text-sm font-medium">
                      {activeTab === "coding" ? (
                        <>
                          <FaCode className="mr-1" />
                          Solve Challenge
                        </>
                      ) : (
                        <>
                          <FaListOl className="mr-1" />
                          Answer MCQ
                        </>
                      )}
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      {activeTab === "coding" ? (
                        <>
                          <FaChartLine className="mr-1" />
                          {item.publicTestCases?.length || 0} Test Cases
                        </>
                      ) : (
                        <>{item.options?.length || 0} Options</>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Pagination */}
        {!loading && !error && totalPages > 1 && (
          <div className="flex items-center justify-center mt-8 space-x-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className={`p-2 rounded-md flex items-center justify-center ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              aria-label="Previous page"
            >
              <FaChevronLeft className="w-4 h-4" />
            </button>

            {/* Page numbers */}
            <div className="hidden sm:flex space-x-2">
              {[...Array(totalPages).keys()].map((num) => {
                const pageNum = num + 1;
                // Show first page, last page, current page, and pages around current
                const showPage =
                  pageNum === 1 ||
                  pageNum === totalPages ||
                  Math.abs(pageNum - currentPage) <= 1;

                // Show ellipsis for gaps
                if (!showPage) {
                  if (pageNum === 2 || pageNum === totalPages - 1) {
                    return (
                      <span
                        key={`ellipsis-${pageNum}`}
                        className="w-8 h-8 text-gray-500 flex items-center justify-center"
                      >
                        ...
                      </span>
                    );
                  }
                  return null;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded-md flex items-center justify-center ${
                      currentPage === pageNum
                        ? "bg-green-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Mobile pagination */}
            <div className="sm:hidden flex items-center">
              <span className="text-sm text-gray-500">
                Page {currentPage} of {totalPages}
              </span>
            </div>

            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className={`p-2 rounded-md flex items-center justify-center ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              aria-label="Next page"
            >
              <FaChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* No challenges yet - prompt to create */}
        {!loading &&
          !error &&
          activeData.length === 0 &&
          !searchTerm &&
          filterDifficulty === "All" && (
            <div className="mt-8 text-center">
              <div className="bg-green-50 rounded-xl p-6 inline-block mx-auto">
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Create your first{" "}
                  {activeTab === "coding" ? "coding challenge" : "MCQ"}
                </h3>
                <p className="text-gray-600 mb-4">
                  Get started by creating a custom{" "}
                  {activeTab === "coding" ? "coding challenge" : "MCQ"} with AI.
                </p>
                <button
                  onClick={() =>
                    navigate(
                      activeTab === "coding"
                        ? "/coding-with-ai"
                        : "/mcq-with-ai"
                    )
                  }
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-sm transition"
                >
                  {activeTab === "coding"
                    ? "Create Coding Challenge"
                    : "Create MCQ"}
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default ChallengesDisplay;
