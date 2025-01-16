import { RecipeDetails } from "@/components";
import { GlobalContext } from "@/contexts/GlobalContext";
import React, { useContext } from "react";

function Details() {
  const { currentRecipe } = useContext(GlobalContext);

  return (
    <div>
      <div>
        <RecipeDetails data={currentRecipe} />
      </div>
    </div>
  );
}

export default Details;
