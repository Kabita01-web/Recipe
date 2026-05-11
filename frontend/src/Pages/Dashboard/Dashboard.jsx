import React, { useContext } from "react";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AdminPanel from "./AdminPanel";
import EditorPanel from "./EditorPanel";
import UsersPanel from "./UsersPanel";

const Dashboard = () => {
  const { currentUser, logout } = useContext(AuthContext);

  console.log("Current user in dashboard:", currentUser); // Debug

  if (!currentUser) return <Navigate to="/login" />;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-56 bg-white border-r border-gray-200 flex flex-col py-6">
        <div className="px-5 mb-6">
          <h1 className="text-base font-medium text-gray-900">Recipe App</h1>
          <p className="text-xs text-gray-400 mt-1">Dashboard</p>
        </div>

        <nav className="flex flex-col gap-1 px-3">
          {/* Admin only links */}
          {currentUser.role === "admin" && (
            <>
              <NavLink
                to="/dashboard/admin"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                    isActive
                      ? "bg-purple-50 text-purple-700 font-medium"
                      : "text-gray-500 hover:bg-gray-50"
                  }`
                }
              >
                🛡️ Admin panel
              </NavLink>
              <NavLink
                to="/dashboard/users"
                className={({ isActive }) =>
                  `flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                    isActive
                      ? "bg-purple-50 text-purple-700 font-medium"
                      : "text-gray-500 hover:bg-gray-50"
                  }`
                }
              >
                👥 Users
              </NavLink>
            </>
          )}

          {/* Editor and Admin links */}
          {(currentUser.role === "editor" || currentUser.role === "admin") && (
            <NavLink
              to="/dashboard/editor"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                  isActive
                    ? "bg-purple-50 text-purple-700 font-medium"
                    : "text-gray-500 hover:bg-gray-50"
                }`
              }
            >
              ✏️ Add recipes
            </NavLink>
          )}
        </nav>

        {/* User info at bottom */}
        <div className="mt-auto px-5 pt-4 border-t border-gray-100">
          <p className="text-sm font-medium text-gray-800">
            {currentUser.username || currentUser.email}
          </p>
          <p className="text-xs text-gray-400 capitalize">{currentUser.role}</p>
          <button
            onClick={logout}
            className="mt-3 text-xs text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-6">
        <Routes>
          {currentUser.role === "admin" && (
            <>
              <Route path="admin" element={<AdminPanel />} />
              <Route path="users" element={<UsersPanel />} />
            </>
          )}
          {(currentUser.role === "editor" || currentUser.role === "admin") && (
            <Route path="editor" element={<EditorPanel />} />
          )}
          <Route
            path="/"
            element={
              currentUser.role === "admin" ? (
                <Navigate to="/dashboard/admin" />
              ) : (
                <Navigate to="/dashboard/editor" />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
