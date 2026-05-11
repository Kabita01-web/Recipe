import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { apiRequest } from "../services/api";

const Login = () => {
  const [email, setEmail] = useState(""); // ✅ Changed from username to email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await apiRequest.post("/auth/login", {
        // ✅ Removed trailing slash
        email, // ✅ Send email, not username
        password,
      });

      console.log("Login response:", res.data); // Debug: See what's returned

      updateUser(res.data);

      // ✅ Redirect based on role
      if (res.data.user?.role === "admin") {
        navigate("/dashboard/admin");
      } else if (res.data.user?.role === "editor") {
        navigate("/dashboard/editor");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(
        error.response?.data?.message ||
          error.response?.data?.msg ||
          "Something went wrong",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-80"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <input
          type="email" // ✅ Changed from text to email
          id="email" // ✅ Changed from username to email
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email" // ✅ Changed to "Email"
          className="w-full mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />

        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          required
        />

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-medium transition-colors duration-200 ${
            isLoading ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Logging in..." : "Sign In"}
        </button>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <Link to="/register" className="text-orange-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
