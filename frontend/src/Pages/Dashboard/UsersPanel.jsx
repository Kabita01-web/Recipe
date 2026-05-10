import React, { useEffect, useState } from "react";
import { apiRequest } from "../../services/api";

const UsersPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);

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

  const handleRoleChange = async (id, newRole) => {
    setSaving(id);
    try {
      await apiRequest.put(`/users/${id}/role`, { role: newRole });
      setUsers(users.map((u) => (u._id === id ? { ...u, role: newRole } : u)));
    } catch (error) {
      console.error("Failed to update role", error);
    } finally {
      setSaving(null);
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
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-sm font-medium text-gray-800">Manage roles</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Change user roles from here
          </p>
        </div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-400 text-xs">
            <tr>
              <th className="px-5 py-3 text-left">Username</th>
              <th className="px-5 py-3 text-left">Email</th>
              <th className="px-5 py-3 text-left">Current role</th>
              <th className="px-5 py-3 text-left">Change role</th>
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
                <td className="px-5 py-3">
                  {user.role === "admin" ? (
                    <span className="text-xs text-gray-300">Protected</span>
                  ) : (
                    <select
                      value={user.role || "user"}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value)
                      }
                      disabled={saving === user._id}
                      className="text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-300"
                    >
                      <option value="user">user</option>
                      <option value="editor">editor</option>
                      <option value="admin">admin</option>
                    </select>
                  )}
                  {saving === user._id && (
                    <span className="text-xs text-gray-400 ml-2">
                      Saving...
                    </span>
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

export default UsersPanel;
