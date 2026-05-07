import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50 text-gray-800">
      {/* About Hero */}
      <section className="bg-orange-100 py-20 text-center">
        <h2 className="text-4xl font-bold mb-4">About RecipeShare</h2>
        <p className="text-lg max-w-2xl mx-auto">
          RecipeShare is a platform where food lovers connect, share, and
          discover amazing recipes from around the world.
        </p>
      </section>

      {/* Our Story */}
      <section className="py-16 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        <img
          src="https://source.unsplash.com/600x400/?cooking"
          alt="cooking"
          className="rounded-xl shadow-md"
        />
        <div>
          <h3 className="text-2xl font-bold mb-4">Our Story</h3>
          <p className="text-gray-600 mb-4">
            RecipeShare started with a simple idea: bring people together
            through food. Whether you're a home cook or a professional chef, our
            platform helps you showcase your creativity.
          </p>
          <p className="text-gray-600">
            We believe every recipe tells a story, and we are here to help you
            share yours.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10">
          <div className="bg-orange-50 p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-3 text-orange-500">
              Our Mission
            </h3>
            <p className="text-gray-600">
              To create a global community where everyone can share and explore
              diverse recipes easily.
            </p>
          </div>
          <div className="bg-orange-50 p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-3 text-orange-500">
              Our Vision
            </h3>
            <p className="text-gray-600">
              To become the go-to platform for discovering and sharing recipes
              worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 max-w-7xl mx-auto px-6 text-center">
        <h3 className="text-2xl font-bold mb-10">Meet Our Team</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[1, 2, 3].map((member) => (
            <div key={member} className="bg-white rounded-xl shadow-md p-6">
              <img
                src={`https://source.unsplash.com/200x200/?person,${member}`}
                alt="team"
                className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
              />
              <h4 className="font-bold">Team Member {member}</h4>
              <p className="text-sm text-gray-500">Food Enthusiast</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
