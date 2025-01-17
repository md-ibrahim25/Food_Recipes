import { serviceworker } from "globals";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [searchParams, setSearchParams] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(() => {
    const savedRecipe = localStorage.getItem("currentRecipe");
    return savedRecipe ? JSON.parse(savedRecipe) : {};
  });
  const [error, setError] = useState("");
  const [recipeList, setRecipeList] = useState([]);
  const [favoritesList, setFavoritesList] = useState(() => {
    const favList = localStorage.getItem("favoritesList");
    return favList ? JSON.parse(favList) : [];
  });

  //Fetch 15 random meals
  const fetchRandomMeals = async () => {
    try {
      setLoading(true);
      let recipe = [];
      const request = Array.from({ length: 16 }, async () => {
        const res = await fetch(
          "https://api.freeapi.app/api/v1/public/meals/meal/random",
        );
        const ress = await res.json();
        return ress;
      });
      const response = await Promise.all(request);
      const finalResponse = response.map((item) => (item = item.data));
      setRecipeList(finalResponse);
      setSearchParams("");
      setLoading(false);
    } catch (error) {
      setError(error.msg);
      setLoading(false);
    }
  };

  //Handle submit of request from user
  async function handleSubmit(event, navigate) {
    event.preventDefault();
    try {
      setLoading(true);
      if (searchParams) {
        const response = await fetch(
          `https://api.freeapi.app/api/v1/public/meals?page=1&limit=10&query=${searchParams}`,
        ).then((res) => res.json());
        setRecipeList(response.data.data);
        setSearchParams("");
        navigate("/");
        setTimeout(() => {
          setLoading(false);
        }, 500);
      } else {
        fetchRandomMeals();
      }
    } catch (error) {
      setError(error.msg);
      setLoading(false);
    }
  }

  //Handle View Recipe Button
  async function handleViewRecipe(data, navigate) {
    setCurrentRecipe(data);
    navigate(`/recipe/${data.id}`);
  }

  //Favorite Button Handling
  async function handleFavoriteClick(id) {
    // const isPresent = favoritesList.find((favId)=> favId === id);
    // if(!isPresent){
    //   setFavoritesList((prev)=>[...prev,id]);
    // }else{
    //   const filteredFavList = favoritesList.filter((favId)=> favId !==id);
    //   setFavoritesList(filteredFavList);
    // }
    setFavoritesList((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
  }

  //When component is mount
  useEffect(() => {
    if (!searchParams) {
      fetchRandomMeals();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currentRecipe", JSON.stringify(currentRecipe));
  }, [currentRecipe]);

  useEffect(() => {
    localStorage.setItem("favoritesList", JSON.stringify(favoritesList));
  }, [favoritesList]);

  return (
    <GlobalContext.Provider
      value={{
        searchParams,
        setSearchParams,
        recipeList,
        handleSubmit,
        loading,
        currentRecipe,
        setCurrentRecipe,
        handleViewRecipe,
        handleFavoriteClick,
        favoritesList,
        error,
        setError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
