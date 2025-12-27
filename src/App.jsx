import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import NewsCard from "./components/NewsCard";
import Footer from "./components/Footer";
import ScrollingNews from "./components/ScrollingNews";
import BrowseCategories from "./components/BrowseCategories";
import Login from "./components/Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import NewspaperPage from "./pages/NewsPaperPage";
import CategoryNews from "./pages/CategoryNews";
import FullArticle from "./pages/FullArticle";
import TrendingNews from "./components/ScrollingNews";
import Searchbar from "./components/SearchBar";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <Navbar user={user} setUser={setUser} setShowLogin={setShowLogin} />
        
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Searchbar />
                <ScrollingNews />
                <main className="w-full p-4">
                  <h1 className="text-2xl font-bold mb-4">Available Newspapers</h1>
                  <NewsCard user={user} setShowLogin={setShowLogin} />
                </main>
                <div id="categories">
                  <BrowseCategories />
                </div>
              </>
            }
          />
          <Route path="/" element={<TrendingNews />} />
          <Route path="/full-article" element={<FullArticle />} />
          <Route path="/newspaper/:source" element={<NewspaperPage />} />
          <Route path="/category/:categoryName" element={<CategoryNews />} />
        </Routes>

        <Footer />

        {showLogin && <Login onClose={() => setShowLogin(false)} setUser={setUser} />}
      </div>
    </Router>
  );
}

export default App;
