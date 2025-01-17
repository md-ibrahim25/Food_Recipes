import { RecipeCard, LoadingSpinner } from "@/components";
import { GlobalContext } from "@/contexts/GlobalContext";
import React, { useContext } from "react";

function Home() {
  const { recipeList, loading } = useContext(GlobalContext);
  const filteredRecipeList = recipeList.filter(
    (item) => item.strCategory !== "Pork",
  );
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <div className="mb-8 text-center text-3xl font-bold text-[#333333]">
        Latest Recipes
      </div>
      {filteredRecipeList.length ? (
        <div className="card-container grid grid-cols-1 gap-6 rounded-lg bg-gray-50 p-6 shadow-sm sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredRecipeList.map((data, index) => (
            <RecipeCard data={data} key={index} />
          ))}
        </div>
      ) : (
        <div className="flex h-full transform flex-col items-center justify-center rounded-lg bg-white p-6 shadow-lg transition-transform hover:scale-105">
          <svg
            className="mb-4 h-16 w-16 animate-bounce text-red-500"
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
          <div className="mb-2 text-2xl font-bold text-gray-800">
            No results found
          </div>
          <p className="mb-4 text-gray-600">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}
    </>
  );
}

export default Home;
