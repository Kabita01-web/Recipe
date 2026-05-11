import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  FiUsers,
  FiPlusCircle,
  FiHome,
  FiSettings,
  FiLogOut,
  FiShield,
  FiBookOpen,
} from "react-icons/fi";

const DashboardSidebar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-orange-500 text-white shadow-md"
        : "text-gray-600 hover:bg-orange-100 hover:text-orange-600"
    }`;

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      {/* Logo Area */}
      <div className="px-6 py-6 border-b border-gray-100">
        <h1 className="text-xl font-bold text-orange-500">RecipeShare</h1>
        <p className="text-xs text-gray-400 mt-1">Dashboard</p>
      </div>

      {/* User Info */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
            <span className="text-orange-600 font-bold text-lg">
              {currentUser?.username?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-800 truncate">
              {currentUser?.username || currentUser?.email}
            </p>
            <p className="text-xs text-gray-400 capitalize">
              {currentUser?.role}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
        {/* Common links for everyone */}
        <NavLink to="/" className={navLinkClass} end>
          <FiHome size={18} />
          <span>Home</span>
        </NavLink>

        <NavLink to="/recipes" className={navLinkClass}>
          <FiBookOpen size={18} />
          <span>All Recipes</span>
        </NavLink>

        {/* Admin only links */}
        {currentUser?.role === "admin" && (
          <>
            <div className="pt-4 mt-2 border-t border-gray-100">
              <p className="text-xs text-gray-400 px-4 mb-2">ADMIN SECTION</p>
            </div>

            <NavLink to="/dashboard/admin" className={navLinkClass}>
              <FiShield size={18} />
              <span>Admin Panel</span>
            </NavLink>

            <NavLink to="/dashboard/users" className={navLinkClass}>
              <FiUsers size={18} />
              <span>Manage Users</span>
            </NavLink>
          </>
        )}

        {/* Editor and Admin links */}
        {(currentUser?.role === "editor" || currentUser?.role === "admin") && (
          <NavLink to="/dashboard/editor" className={navLinkClass}>
            <FiPlusCircle size={18} />
            <span>Add Recipe</span>
          </NavLink>
        )}

        {/* Profile link for everyone */}
        <div className="pt-4 mt-2 border-t border-gray-100">
          <p className="text-xs text-gray-400 px-4 mb-2">ACCOUNT</p>
        </div>

        <NavLink to="/profile" className={navLinkClass}>
          <FiSettings size={18} />
          <span>Profile Settings</span>
        </NavLink>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-red-600 hover:bg-red-50 transition-all duration-200"
        >
          <FiLogOut size={18} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardSidebar;
