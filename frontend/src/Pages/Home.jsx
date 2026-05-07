import React from "react";

const Home = () => {
  return (
    <div className="bg-gray-50 font-sans">
      {/* Header */}
      {/* Hero Section */}
      <section className="bg-orange-100 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Discover & Share Amazing Recipes
          </h2>
          <p className="text-gray-600 mb-6">
            Find delicious recipes from around the world or share your own
            creations.
          </p>
          <button className="bg-orange-500 text-white px-6 py-3 rounded-2xl text-lg hover:bg-orange-600">
            Explore Recipes
          </button>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-10">
            Featured Recipes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <img
                src="https://source.unsplash.com/400x300/?pasta"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-xl font-semibold">Creamy Pasta</h4>
                <p className="text-gray-600 text-sm">
                  A delicious creamy pasta recipe perfect for dinner.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <img
                src="https://source.unsplash.com/400x300/?burger"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-xl font-semibold">Juicy Burger</h4>
                <p className="text-gray-600 text-sm">
                  Try this mouth-watering homemade burger.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <img
                src="https://source.unsplash.com/400x300/?dessert"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="text-xl font-semibold">Sweet Dessert</h4>
                <p className="text-gray-600 text-sm">
                  End your meal with this tasty dessert.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-orange-500 text-white py-16 text-center">
        <h3 className="text-3xl font-bold mb-4">Share Your Own Recipe</h3>
        <p className="mb-6">
          Join our community and showcase your cooking skills.
        </p>
        <button className="bg-white text-orange-500 px-6 py-3 rounded-2xl hover:bg-gray-100">
          Add Recipe
        </button>
      </section>

      {/* Footer */}
    </div>
  );
};

export default Home;
