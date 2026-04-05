import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-500">RecipeShare</h1>
          <nav className="space-x-6 hidden md:block">
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
          </nav>
          <button className="bg-orange-500 text-white px-4 py-2 rounded-xl hover:bg-orange-600">
            Login
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
