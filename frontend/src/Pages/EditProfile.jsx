import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../services/api";

const EditProfile = () => {
  const { currentUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: currentUser?.username || "",
    email: currentUser?.email || "",
    avatar: currentUser?.avatar || "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Use currentUser.id or currentUser._id
      const userId = currentUser?._id || currentUser?.id;

      const res = await apiRequest.put(
        `/users/edit-profile/${userId}`,
        formData,
      );
      updateUser(res.data.data || res.data.user);
      navigate("/profile");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to update profile");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Edit Profile
        </h2>
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Avatar URL Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Avatar URL
            </label>
            <input
              type="text"
              id="avatar"
              name="avatar"
              placeholder="Enter avatar URL"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              value={formData.avatar}
              onChange={handleChange}
            />
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Username
            </label>
            <input
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              type="text"
              placeholder="Enter username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Email */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-medium transition-colors duration-200 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Saving Changes..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
