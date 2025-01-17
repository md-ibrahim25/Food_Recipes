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
    <div className="group mx-auto w-full transform overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg transition-shadow duration-300 hover:scale-105 hover:shadow-2xl sm:max-w-sm md:max-w-md">
      {/* Image */}
      <div className="relative p-3">
        <img
          src={strMealThumb}
          alt={strMeal}
          className="h-56 w-full rounded-xl object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* Favorite Button */}
        <button
          className="absolute right-4 top-4 rounded-full bg-orange-100 p-2 shadow-md transition duration-300 hover:bg-orange-200"
          onClick={() => handleFavoriteClick(id)}
          aria-label="Add to Favorites"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={isFavorite ? "orange" : "none"}
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="orange"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </button>

        <p className="absolute bottom-4 left-4 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white shadow-lg">
          {strCategory}
        </p>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="truncate text-xl font-bold text-gray-800 transition-colors duration-300 group-hover:text-orange-500">
          {strMeal}
        </h3>
        <p className="mb-4 mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-nowrap text-sm text-gray-500">
          A delicious {strCategory} recipe from {strArea}.
        </p>
        <button
          onClick={() => handleViewRecipe(data, navigate)}
          className="block w-full rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 py-3 text-center font-medium text-white shadow-md transition duration-300 hover:from-orange-600 hover:to-orange-700 hover:shadow-lg"
        >
          View Recipe
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;
