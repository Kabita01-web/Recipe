import axios from "axios";

export const apiRequest = axios.create({
  baseURL: "https://recipe-backend-d7lp.onrender.com/api",
  withCredentials: true,
});

// Add this interceptor to automatically attach the token
apiRequest.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("Attaching token to request:", token ? "Yes" : "No"); // Debug
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Optional: Handle 401 responses globally
apiRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error("Authentication error - redirecting to login");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);
