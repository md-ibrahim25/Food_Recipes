import { GlobalContext } from "@/contexts/GlobalContext";
import React, { useContext, useState } from "react";

function RecipeDetails({ data }) {
  const {
    strMealThumb,
    strMeal,
    strInstructions,
    strArea,
    strCategory,
    strYoutube,
    id,
  } = data;

  //get favoriteslist from context
  const { handleFavoriteClick, favoritesList } = useContext(GlobalContext);
  const isFavorite = favoritesList.includes(id);

  // Store ingredients data
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = data[`strIngredient${i}`];
    const measure = data[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push(ingredient + " " + measure);
    }
  }

  // Convert YouTube video link to embed format
  const youtubeVideoId = strYoutube?.split("v=")[1];

  return (
    <div className="w-full space-y-10 px-4 md:px-8 lg:px-16 m-3">
      {/* First Section */}
      <div className="relative w-full flex flex-col md:flex-row mx-auto bg-white shadow-lg rounded-xl p-6 items-center gap-6 border border-orange-200">
        {/* Image Section */}
        <div className="lg:flex lg:min-w-[50%] gap-2">
          <div className="shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl max-w-[350px] max-h-[300px] sm:max-h-[300px] md:max-h-[350px] lg:max-h-[400px] flex justify-center items-center mx-auto">
            <img
              src={strMealThumb}
              alt={strMeal}
              className="mx-auto rounded-xl"
            />
          </div>

          {/* Favorite Button */}
          <button
            onClick={() => handleFavoriteClick(id)}
            className={`absolute top-3 right-5 p-4 rounded-full  hover:bg-orange-200 shadow-lg transition duration-300`}
            aria-label="Add to Favorites"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={`${isFavorite ? "orange" : "none"}`}
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="orange"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          </button>
        </div>

        <div className="text-center space-y-4 mt-3 flex flex-col justify-center">
          <div className="text-orange-600 font-extrabold text-2xl tracking-wide">
            {strMeal}
          </div>
          <div className="text-gray-800 text-lg">
            <span className="font-bold text-orange-500">Category:</span>{" "}
            {strCategory}
          </div>
          <div className="text-gray-800 text-lg">
            <span className="font-bold text-orange-500">Origin:</span> {strArea}
          </div>
        </div>
      </div>

      {/* Ingredients Section */}
      <div>
        <h2 className="text-xl font-bold text-orange-600 mb-4 text-center">
          Ingredients
        </h2>
        <ul className="space-y-3 grid grid-cols-2 gap-x-4">
          {ingredients.map((ingredient, index) => (
            <li
              key={index}
              className="flex items-center gap-3 text-gray-800 font-medium bg-orange-50 rounded-lg p-2 shadow-sm hover:shadow-md"
            >
              <span className="w-7 h-7 flex items-center justify-center bg-orange-500 text-white font-bold rounded-full">
                {index + 1}
              </span>
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

      {/* Second Section */}
      <div className="lg:flex mb-10 gap-2">
        {/* Instructions Section */}
        <div className="w-full max-w-4xl max-h-[350px] overflow-auto lg:max-w-[40%] mx-auto bg-white shadow-lg rounded-xl p-6 border border-orange-200">
          <h2 className="text-xl font-bold text-orange-600 mb-4 text-center">
            Instructions
          </h2>
          <p className="space-y-3 list-decimal list-inside text-gray-800 font-medium">
            {strInstructions}
          </p>
        </div>

        {/* YouTube Video Section */}
        <div className="w-full max-w-4xl lg:max-h-[350px] lg:max-w-[60%] mx-auto bg-white shadow-lg rounded-xl p-6 border border-orange-200 mt-3 lg:mt-0">
          <h2 className="text-xl font-bold text-orange-600 text-center">
            Video Tutorials
          </h2>
          <div className="w-full h-[280px] rounded-lg overflow-hidden shadow-md flex">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeVideoId}`}
              title="YouTube Video"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;
