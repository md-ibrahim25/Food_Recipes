import React, { useContext } from "react";
import { data, Navigate, useNavigate } from "react-router-dom";
import { GlobalContext } from "@/contexts/GlobalContext";

function RecipeCard({ data }) {
  const { handleViewRecipe, handleFavoriteClick, favoritesList } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  const { strMealThumb, strMeal, id, strCategory, strArea } = data;
  const isFavorite = favoritesList.includes(id);
  return (
    <div className="group bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow transform hover:scale-105 w-full sm:max-w-sm md:max-w-md mx-auto overflow-hidden duration-300">
      {/* Image */}
      <div className="relative p-3 ">
        <img
          src={strMealThumb}
          alt={strMeal}
          className="w-full h-56 object-cover rounded-xl transition-transform duration-300 group-hover:scale-110"
        />

        {/* Favorite Button */}
        <button
          className="absolute top-4 right-4 p-2 rounded-full bg-orange-100 hover:bg-orange-200 shadow-md transition duration-300"
          onClick={() => handleFavoriteClick(id)}
          aria-label="Add to Favorites"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isFavorite ? "orange" : "none"}
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="orange"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </button>

        <p className="absolute bottom-4 left-4 text-white text-xs bg-orange-500 px-3 py-1 rounded-full shadow-lg uppercase font-semibold tracking-wide">
          {strCategory}
        </p>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 truncate group-hover:text-orange-500 transition-colors duration-300">
          {strMeal}
        </h3>
        <p className="text-sm text-gray-500 mt-2 mb-4 text-ellipsis text-nowrap whitespace-nowrap overflow-hidden">
          A delicious {strCategory} recipe from {strArea}.
        </p>
        <button
          onClick={() => handleViewRecipe(data, navigate)}
          className="block w-full text-center text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 font-medium py-3 rounded-lg shadow-md hover:shadow-lg transition duration-300"
        >
          View Recipe
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;
