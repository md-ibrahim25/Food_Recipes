import { RecipeCard, LoadingSpinner } from "@/components";
import { GlobalContext } from "@/contexts/GlobalContext";
import React, { useContext } from "react";

function Home() {
  const { recipeList, loading } = useContext(GlobalContext);
  const filteredRecipeList = recipeList.filter(
    (item) => item.strCategory !== "Pork"
  );
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <div className="text-3xl font-bold text-center text-[#333333] mb-8">
        Latest Recipes
      </div>
      {filteredRecipeList.length ? (
        <div className="card-container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-gray-50 rounded-lg shadow-sm">
          {filteredRecipeList.map((data, index) => (
            <RecipeCard data={data} key={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full p-6 bg-white rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <svg
            className="w-16 h-16 mb-4 text-red-500 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
            />
          </svg>
          <div className="text-2xl font-bold text-gray-800 mb-2">
            No results found
          </div>
          <p className="text-gray-600 mb-4">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}
    </>
  );
}

export default Home;
