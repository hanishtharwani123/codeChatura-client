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
import NotFound from "./components/NotFound";

// Wrapper component to conditionally render Navbar and Footer
const Layout = ({ children }) => {
  const location = useLocation();
  const isNotFound =
    location.pathname === "*" ||
    ![
      "/",
      "/coding-with-ai",
      "/view-ai-coding",
      "/mcq-with-ai",
      "/mcq-with-ai/:id",
    ].includes(location.pathname);

  return (
    <>
      {/* Show Navbar on all pages except Not Found */}
      {!isNotFound && <Navbar />}
      <main>{children}</main>
      {/* Show Footer on all pages except Home and Not Found */}
      {location.pathname !== "/" && !isNotFound && <Footer />}
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
                {/* Add more routes here if needed */}
                {/* <Route path="/resources" element={<Resources />} />
                <Route path="/about" element={<About />} /> */}
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
