import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-bold text-white mb-3">RecipeShare</h4>
            <p>Sharing delicious recipes from around the world.</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/recipes" className="hover:text-white">
                  Recipes
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-3">
              Newsletter
            </h4>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-lg text-black mb-3"
            />
            <button className="bg-orange-500 px-4 py-2 rounded-lg hover:bg-orange-600">
              Subscribe
            </button>
          </div>
        </div>

        <div className="text-center mt-8 text-sm">
          © 2026 RecipeShare. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
