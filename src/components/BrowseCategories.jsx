import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Business", icon: "💼" },
  { name: "Technology", icon: "💻" },
  { name: "Health", icon: "🏥" },
  { name: "Sports", icon: "⚽" },
  { name: "Entertainment", icon: "🎭" },
  { name: "Science", icon: "🔬" },
  { name: "Politics", icon: "🏛️" },
  { name: "World", icon: "🌍" },
  { name: "Finance", icon: "💰" },
  { name: "Education", icon: "📚" },
  { name: "Gaming", icon: "🎮" },
  { name: "Automobile", icon: "🚗" },
  { name: "Fashion", icon: "👗" },
  { name: "Food", icon: "🍔" },
];

const BrowseCategories = ({ filteredCategories = categories }) => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  // Set visible categories based on whether 'showAll' is true
  const visibleCategories = showAll ? filteredCategories : filteredCategories.slice(0, 9);

  const handleCategoryClick = (categoryName) => {
    navigate(`/category/${categoryName}`);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">Browse Categories</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
        {visibleCategories.map((category, index) => (
          <div
            key={index}
            onClick={() => handleCategoryClick(category.name)}
            className="group bg-white p-4 rounded-lg shadow-md flex flex-col items-center text-center cursor-pointer 
                       transition-transform transform hover:scale-105 hover:shadow-lg duration-300"
          >
            <span className="text-3xl">{category.icon}</span>
            <h3 className="text-lg font-medium mt-2">{category.name}</h3>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setShowAll(!showAll)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium 
                     hover:bg-blue-700 transition duration-300"
        >
          {showAll ? "View Less" : "View More"}
        </button>
      </div>
    </div>
  );
};

export default BrowseCategories;
