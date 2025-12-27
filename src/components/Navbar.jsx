import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import logo from "../assets/logoo.png";
import Login from "./Login";
import { toast } from "react-toastify";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ user, setUser, setShowLogin }) => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser({
          email: currentUser.email,
          username: currentUser.displayName || localStorage.getItem("username") || "User",
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);

  const handleLoginOpen = () => {
    setShowLogin(true);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      localStorage.removeItem("username");
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md sticky top-0 w-full z-10">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <img src={logo} alt="NewsMania Logo" className="h-20 w-auto cursor-pointer" />

        {/* Hamburger Icon for Mobile */}
        <button className="md:hidden text-white text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Nav Links */}
        <div className={`absolute md:static top-16 left-0 w-full md:w-auto bg-blue-600 md:bg-transparent md:flex items-center space-x-8 p-4 md:p-0 transition-transform transform ${isMenuOpen ? "block" : "hidden md:flex"}`}>
          <Link 
            to="categories" 
            smooth={true} 
            duration={500} 
            className="hover:text-gray-200 font-bold cursor-pointer block md:inline"
            onClick={() => setIsMenuOpen(false)}
          >
            Categories
          </Link>

          {!user ? (
            <button
              onClick={handleLoginOpen}
              className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-gray-200 transition block md:inline"
            >
              Login
            </button>
          ) : (
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
              <span className="font-bold text-white block md:inline">Welcome, {user.username}!</span>
              <button
                onClick={handleLogout}
                className="border border-white text-white px-4 py-2 rounded-md hover:bg-gray-100 hover:text-black transition block md:inline"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {isLoginOpen && <Login onClose={() => setIsLoginOpen(false)} setUser={setUser} />}
    </nav>
  );
};

export default Navbar;
