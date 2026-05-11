import { createContext } from "react";
import { useEffect, useState } from "react";
import { apiRequest } from "../services/api";

export const AuthContext = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null,
  );

  const updateUser = (data) => {
    console.log("UpdateUser received:", data);

    let userData = data;
    if (data?.user) {
      userData = data.user;
    }

    if (userData) {
      // Ensure both id and _id exist
      if (userData.id && !userData._id) {
        userData._id = userData.id;
      }
      if (userData._id && !userData.id) {
        userData.id = userData._id;
      }

      localStorage.setItem("user", JSON.stringify(userData));
      setCurrentUser(userData);
    }

    if (data?.token) {
      localStorage.setItem("token", data.token);
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
