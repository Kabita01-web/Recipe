import React, { useContext } from "react";
import { NavLink, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import AdminPanel from "./AdminPanel";
import EditorPanel from "./EditorPanel";
import UsersPanel from "./UsersPanel";

const Dashboard = () => {
  const { currentUser, logout } = useContext(AuthContext);

  if (!currentUser) return <Navigate to="/login" />;

  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR - This will be on the left */}
      <div className="w-64 bg-white shadow-lg min-h-screen">
        <div className="p-5">
          <h1 className="text-xl font-bold text-orange-500">RecipeShare</h1>
          <p className="text-xs text-gray-400 mt-1">Dashboard</p>
        </div>

        <nav className="mt-5">
          {currentUser.role === "admin" && (
            <>
              <NavLink
                to="/dashboard/admin"
                className={({ isActive }) =>
                  `block px-5 py-3 ${isActive ? "bg-orange-50 text-orange-600 border-r-4 border-orange-500" : "text-gray-600 hover:bg-gray-50"}`
                }
              >
                🛡️ Admin Panel
              </NavLink>
              <NavLink
                to="/dashboard/users"
                className={({ isActive }) =>
                  `block px-5 py-3 ${isActive ? "bg-orange-50 text-orange-600 border-r-4 border-orange-500" : "text-gray-600 hover:bg-gray-50"}`
                }
              >
                👥 Users
              </NavLink>
            </>
          )}

          {(currentUser.role === "editor" || currentUser.role === "admin") && (
            <NavLink
              to="/dashboard/editor"
              className={({ isActive }) =>
                `block px-5 py-3 ${isActive ? "bg-orange-50 text-orange-600 border-r-4 border-orange-500" : "text-gray-600 hover:bg-gray-50"}`
              }
            >
              ✏️ Add Recipes
            </NavLink>
          )}
        </nav>

        <div className="absolute bottom-0 w-64 p-5 border-t">
          <p className="text-sm font-medium">{currentUser.username}</p>
          <p className="text-xs text-gray-400 capitalize">{currentUser.role}</p>
          <button onClick={logout} className="mt-2 text-red-500 text-sm">
            Logout
          </button>
        </div>
      </div>

      {/* MAIN CONTENT - This is on the right */}
      <div className="flex-1 bg-gray-100 p-6">
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
          <Route path="/" element={<Navigate to="/dashboard/admin" />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
