import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import { getMealDetails } from '../services/detailsAPI';

function RecipeDetails() {
  // const { id } = useParams();
  const { match } = useHistory();
  const [recipe, setRecipes] = useState([]);

  const fetchMeal = async () => {
    const recipeId = 52772;
    const getMeal = await getMealDetails(recipeId);
    // const [meals] = setMeal;
    setRecipes(getMeal);
  };

  useEffect(() => {
    fetchMeal();
    console.log(recipe);
    console.log(match);
  }, []);

  return (
    // <h1>Detalhes</h1>
    <h1>{ recipe.meals[0].strMeal }</h1>
  );
}

export default RecipeDetails;
