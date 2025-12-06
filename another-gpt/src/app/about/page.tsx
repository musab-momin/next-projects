import React from "react";

const About = () => {
  return (
    <div className="h-[calc(100vh-56px)] flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white rounded-lg p-8">
        {/* Header */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4 mx-auto">
          About Us
        </h1>
        <p className="text-gray-600 mb-6">
          Welcome to our website! We are passionate about building modern web
          applications that are fast, responsive, and user-friendly. Our mission
          is to deliver high-quality solutions that make life easier and more
          enjoyable.
        </p>
      </div>
    </div>
  );
};

export default About;
