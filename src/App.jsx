import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Navbar from "./common/Navbar"; // Adjust path as needed
import Footer from "./common/Footer"; // Adjust path as needed
import Home from "./components/HomePage"; // Home page component
import CodingWithAI from "./components/CodingWithAI"; // Example
import CodingViewAI from "./components/CodingViewAI"; // Example
import MCQWithAI from "./components/MCQWithAI"; // Example
import MCQViewAI from "./components/MCQViewAI";
import ViewProblemMCQ from "./components/ViewProblem&MCQ";
import NotFound from "./components/NotFound";

// Wrapper component to conditionally render Navbar and Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const path = location.pathname;

  // Pages that should have neither navbar nor footer
  const fullscreenPages = ["/mcq-with-ai/", "/view-ai-coding/"];

  // Check if current path starts with any fullscreen page path
  const isFullscreenPage = fullscreenPages.some(
    (route) => path.startsWith(route) && path.length > route.length
  );

  // Only show NotFound for unmatched routes
  const isNotFound =
    location.pathname === "*" ||
    ![
      "/",
      "/coding-with-ai",
      "/view-ai-coding/:id",
      "/mcq-with-ai",
      "/mcq-with-ai/:id",
      "/view-problem-mcq", // Added this route
      // Add other valid routes here if needed
    ].some((route) =>
      route.includes(":id")
        ? new RegExp(`^${route.replace(":id", "[^/]+")}$`).test(path)
        : route === path
    );

  return (
    <>
      {/* Show Navbar except on fullscreen pages and Not Found */}
      {!isFullscreenPage && !isNotFound && <Navbar />}

      <main>{children}</main>

      {/* Show Footer except on Home, fullscreen pages, and Not Found */}
      {path !== "/" && !isFullscreenPage && !isNotFound && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Home page with Navbar only */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
            </>
          }
        />
        {/* All other routes */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/coding-with-ai" element={<CodingWithAI />} />
                <Route path="/view-ai-coding/:id" element={<CodingViewAI />} />
                <Route path="/mcq-with-ai" element={<MCQWithAI />} />
                <Route path="/mcq-with-ai/:id" element={<MCQViewAI />} />
                <Route path="/view-problem-mcq" element={<ViewProblemMCQ />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
