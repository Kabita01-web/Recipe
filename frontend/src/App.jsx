import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Recipe from "./Pages/Recipe";
import RecipeDetails from "./Pages/RecipeDetails";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import UserProfile from "./Pages/UserProfile";
import EditProfile from "./Pages/EditProfile";
import Dashboard from "./Pages/Dashboard/Dashboard";
import AdminPanel from "./Pages/Dashboard/AdminPanel";
import UsersPanel from "./Pages/Dashboard/UsersPanel";
import EditorPanel from "./Pages/Dashboard/EditorPanel";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<Recipe />} />
        <Route path="/recipedetails/:id" element={<RecipeDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route
          path="*"
          element={
            <h2 className="text-center mt-20 text-gray-500">Page not found</h2>
          }
        />
        <Route path="/dashboard/admin" element={<AdminPanel />} />
        <Route path="/dashboard/users" element={<UsersPanel />} />
        <Route path="/dashboard/editor" element={<EditorPanel />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
