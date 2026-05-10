import React, { useEffect, useState } from "react";
import { apiRequest } from "../../services/api";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await apiRequest.get("/users");
        setUsers(res.data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await apiRequest.delete(`/users/${id}`);
      setUsers(users.filter((u) => u._id !== id));
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const roleBadge = (role) => {
    const styles = {
      admin: "bg-purple-100 text-purple-700",
      editor: "bg-green-100 text-green-700",
      user: "bg-gray-100 text-gray-600",
    };
    return (
      <span
        className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[role] || styles.user}`}
      >
        {role || "user"}
      </span>
    );
  };

  if (loading) return <p className="text-sm text-gray-400">Loading users...</p>;

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-xs text-gray-400 mb-1">Total users</p>
          <p className="text-2xl font-medium text-gray-900">{users.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-xs text-gray-400 mb-1">Admins</p>
          <p className="text-2xl font-medium text-gray-900">
            {users.filter((u) => u.role === "admin").length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p className="text-xs text-gray-400 mb-1">Editors</p>
          <p className="text-2xl font-medium text-gray-900">
            {users.filter((u) => u.role === "editor").length}
          </p>
        </div>
      </div>

      {/* Users table */}
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-medium text-gray-800">All users</h2>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-400 text-xs">
            <tr>
              <th className="px-5 py-3 text-left">Username</th>
              <th className="px-5 py-3 text-left">Email</th>
              <th className="px-5 py-3 text-left">Role</th>
              <th className="px-5 py-3 text-left">Joined</th>
              <th className="px-5 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t border-gray-50 hover:bg-gray-50"
              >
                <td className="px-5 py-3 text-gray-800">{user.username}</td>
                <td className="px-5 py-3 text-gray-500">{user.email}</td>
                <td className="px-5 py-3">{roleBadge(user.role)}</td>
                <td className="px-5 py-3 text-gray-400">
                  {new Date(user.createdAt).toLocaleDateString()}
                </td>
                <td className="px-5 py-3">
                  {user.role !== "admin" && (
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
