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
    <div className="m-3 w-full space-y-10 px-4 md:px-8 lg:px-16">
      {/* First Section */}
      <div className="relative mx-auto flex w-full flex-col items-center gap-6 rounded-xl border border-orange-200 bg-white p-6 shadow-lg md:flex-row">
        {/* Image Section */}
        <div className="gap-2 lg:flex lg:min-w-[50%]">
          <div className="mx-auto flex max-h-[300px] max-w-[350px] transform items-center justify-center overflow-hidden rounded-xl shadow-lg transition-transform hover:scale-105 hover:shadow-xl sm:max-h-[300px] md:max-h-[350px] lg:max-h-[400px]">
            <img
              src={strMealThumb}
              alt={strMeal}
              className="mx-auto rounded-xl"
            />
          </div>

          {/* Favorite Button */}
          <button
            onClick={() => handleFavoriteClick(id)}
            className={`absolute right-5 top-3 rounded-full p-4 shadow-lg transition duration-300 hover:bg-orange-200`}
            aria-label="Add to Favorites"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={`${isFavorite ? "orange" : "none"}`}
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="orange"
              className="h-7 w-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </svg>
          </button>
        </div>

        <div className="mt-3 flex flex-col justify-center space-y-4 text-center">
          <div className="text-2xl font-extrabold tracking-wide text-orange-600">
            {strMeal}
          </div>
          <div className="text-lg text-gray-800">
            <span className="font-bold text-orange-500">Category:</span>{" "}
            {strCategory}
          </div>
          <div className="text-lg text-gray-800">
            <span className="font-bold text-orange-500">Origin:</span> {strArea}
          </div>
        </div>
      </div>

      {/* Ingredients Section */}
      <div>
        <h2 className="mb-4 text-center text-xl font-bold text-orange-600">
          Ingredients
        </h2>
        <ul className="grid grid-cols-2 gap-x-4 space-y-3">
          {ingredients.map((ingredient, index) => (
            <li
              key={index}
              className="flex items-center gap-3 rounded-lg bg-orange-50 p-2 font-medium text-gray-800 shadow-sm hover:shadow-md"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
                {index + 1}
              </span>
              {ingredient}
            </li>
          ))}
        </ul>
      </div>

      {/* Second Section */}
      <div className="mb-10 gap-2 lg:flex">
        {/* Instructions Section */}
        <div className="mx-auto max-h-[350px] w-full max-w-4xl overflow-auto rounded-xl border border-orange-200 bg-white p-6 shadow-lg lg:max-w-[40%]">
          <h2 className="mb-4 text-center text-xl font-bold text-orange-600">
            Instructions
          </h2>
          <p className="list-inside list-decimal space-y-3 font-medium text-gray-800">
            {strInstructions}
          </p>
        </div>

        {/* YouTube Video Section */}
        <div className="mx-auto mt-3 w-full max-w-4xl rounded-xl border border-orange-200 bg-white p-6 shadow-lg lg:mt-0 lg:max-h-[350px] lg:max-w-[60%]">
          <h2 className="text-center text-xl font-bold text-orange-600">
            Video Tutorials
          </h2>
          <div className="flex h-[280px] w-full overflow-hidden rounded-lg shadow-md">
            <iframe
              src={`https://www.youtube.com/embed/${youtubeVideoId}`}
              title="YouTube Video"
              className="h-full w-full"
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
