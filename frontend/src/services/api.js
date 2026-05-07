import axios from "axios";

export const apiRequest = axios.create({
  baseURL: "https://recipe-backend-d7lp.onrender.com/api",
  withCredentials: true,
});
