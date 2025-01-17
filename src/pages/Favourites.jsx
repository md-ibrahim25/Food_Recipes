import { LoadingSpinner, RecipeCard } from "@/components";
import { GlobalContext } from "@/contexts/GlobalContext";
import React, { useContext, useEffect, useState } from "react";

function Favourites() {
  const { favoritesList, setError, error } = useContext(GlobalContext);
  const [favoriteListData, setFavoriteListData] = useState([]);
  const [loading, setLoading] = useState(false); // New state for loading

  //Fetch the data for all the favorite recipes
  async function fetchFavoriteRecipesData(favoritesList) {
    if (favoritesList && favoritesList.length) {
      setLoading(true); // Start loading
      try {
        const favData = await Promise.all(
          favoritesList.map(async (id) => {
            const res = await fetch(
              `https://api.freeapi.app/api/v1/public/meals/${id}`,
            );
            if (!res.ok) {
              throw new Error(`Failed to fetch data for ID: ${id}`);
            }
            const data = await res.json();
            return data.data; // Assuming the API directly returns the desired data
          }),
        );
        setFavoriteListData(favData);
      } catch (err) {
        setError(err.message || "An error occurred");
        console.error(err);
      } finally {
        setLoading(false); // End loading
      }
    } else {
      setFavoriteListData([]); // Clear the list if there are no favorites
    }
  }

  //On component mount
  useEffect(() => {
    fetchFavoriteRecipesData(favoritesList);
  }, [favoritesList]);

  return (
    <>
      {favoritesList && favoritesList.length ? (
        <div className="card-container grid grid-cols-1 gap-8 rounded-lg bg-gray-50 p-6 shadow-xl sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading ? ( // Display spinner while loading
            <div className="flex h-full w-screen items-center justify-center p-4 text-gray-500">
              <LoadingSpinner />
            </div>
          ) : favoriteListData.length ? ( // Display recipes once loaded
            favoriteListData.map((item, index) => (
              <RecipeCard data={item} key={index} />
            ))
          ) : (
            <div className="flex h-full w-full items-center justify-center p-4 text-gray-500">
              <span>No favorite recipes found.</span>
            </div>
          )}
        </div>
      ) : (
        <div className="flex h-full w-full items-center justify-center p-4 text-4xl text-gray-500">
          <span>No Favorites present</span>
        </div>
      )}
    </>
  );
}

export default Favourites;
