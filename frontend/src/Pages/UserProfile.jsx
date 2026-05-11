import React, { useContext } from "react";
import Profile from "../assets/item1.webp";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt, FaEdit } from "react-icons/fa";

const UserProfile = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  <div className="pt-20 pb-6 text-center px-6">
    <h2 className="text-2xl font-bold text-gray-800">
      {currentUser?.username || currentUser?.name || "User"}
    </h2>
    <p className="text-gray-500 mt-1">{currentUser?.email || "No email"}</p>
    <p className="text-xs text-gray-400 mt-1 capitalize">
      Role: {currentUser?.role || "user"}
    </p>
  </div>;
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-orange-500 h-28 relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 top-12">
            <div className="relative">
              <img
                src={currentUser?.avatar || Profile}
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-md"
              />

              <label
                htmlFor="avatar-input"
                className="absolute bottom-1 right-1 bg-white p-2 rounded-full shadow cursor-pointer hover:bg-gray-100"
              >
                <FaEdit className="text-gray-600 text-sm" />
              </label>

              <input type="file" id="avatar-input" className="hidden" />
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="pt-20 pb-6 text-center px-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {currentUser?.username || currentUser?.name || "User"}
          </h2>
          <p className="text-gray-500 mt-1">
            {currentUser?.email || "No email"}
          </p>
          <p className="text-xs text-gray-400 mt-1 capitalize">
            Role: {currentUser?.role || "user"}
          </p>
        </div>
        {/* Actions */}
        <div className="px-6 flex gap-4">
          <Link
            to="/edit-profile"
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-medium text-center transition"
          >
            Edit Profile
          </Link>

          <button
            onClick={handleLogout}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>

        {/* Profile Info */}
        <div className="p-6 mt-6 border-t">
          <div className="mb-4">
            <label className="block text-sm text-gray-500 mb-1">Username</label>
            <div className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-700">
              {currentUser?.username || "John Doe"}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-500 mb-1">Email</label>
            <div className="w-full px-4 py-3 rounded-xl bg-gray-100 text-gray-700">
              {currentUser?.email || "john.doe@example.com"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
