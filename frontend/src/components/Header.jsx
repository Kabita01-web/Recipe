import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Profile from "../assets/item1.webp";

const Header = () => {
  const { currentUser } = useContext(AuthContext);

  console.log("Header - Current user:", currentUser); // Debug

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-orange-500">
          RecipeShare
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-orange-500">
            Home
          </Link>
          <Link to="/recipes" className="text-gray-700 hover:text-orange-500">
            Recipes
          </Link>
          <Link to="/about" className="text-gray-700 hover:text-orange-500">
            About
          </Link>
          <Link to="/contact" className="text-gray-700 hover:text-orange-500">
            Contact
          </Link>

          {/* Dashboard link for admin and editor */}
          {currentUser &&
            (currentUser.role === "admin" || currentUser.role === "editor") && (
              <Link
                to="/dashboard/admin"
                className="text-purple-600 hover:text-purple-800 font-medium"
              >
                Dashboard
              </Link>
            )}
        </nav>

        {/* Auth Buttons / User Menu */}
        <div className="flex items-center space-x-3">
          {currentUser ? (
            <div className="flex items-center space-x-3">
              <img
                src={currentUser.avatar || Profile}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-gray-300"
              />
              <Link
                to="/profile"
                className="text-gray-700 hover:text-orange-500 font-medium"
              >
                {currentUser.username || currentUser.email || "User"}
              </Link>
            </div>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600 transition"
              >
                Register
              </Link>
              <Link
                to="/login"
                className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
