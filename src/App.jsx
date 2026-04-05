import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Recipe from "./Pages/Recipe";
import RecipeDetails from "./Pages/RecipeDetails";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/recipes" element={<Recipe />} />
        <Route path="/recipedetails/:id" element={<RecipeDetails />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
