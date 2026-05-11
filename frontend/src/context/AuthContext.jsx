import { createContext } from "react";
import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );

  const updateUser = (data) => {
    setCurrentUser(data);
    // ✅ IMPORTANT: Save token when it comes from login
    if (data?.token) {
      localStorage.setItem("token", data.token);
    }
    if (data?.user) {
      localStorage.setItem("user", JSON.stringify(data.user));
    }
  };

  const logout = async () => {
    try {
      await apiRequest.post("/auth/logout");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setCurrentUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token"); // ✅ Clear token on logout
    }
  };

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
