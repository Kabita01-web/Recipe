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

        {/* ONLY ONE DASHBOARD ROUTE - this handles all sub-routes */}
        <Route path="/dashboard/*" element={<Dashboard />} />

        <Route
          path="*"
          element={
            <h2 className="text-center mt-20 text-gray-500">Page not found</h2>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
