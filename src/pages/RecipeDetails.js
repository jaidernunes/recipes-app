import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getCocktailDetails, getMealDetails } from '../services/detailsAPI';

function RecipeDetails() {
  const { id } = useParams();
  const history = useHistory();
  const [recipe, setRecipe] = useState([]);

  const fetchMeal = async () => {
    const { pathname } = history.location;
    let getRecipe = recipe;
    if (pathname.includes('/meals')) {
      console.log('entrei no if');
      const getMeal = await getMealDetails(id);
      getRecipe = getMeal;
    } else {
      console.log('entrei no else');
      const getDrink = await getCocktailDetails(id);
      getRecipe = getDrink;
    }
    setRecipe(getRecipe);
  };

  useEffect(() => {
    fetchMeal();
  }, []);

  const recipeTitle = () => {
    let mealTitle = '';
    if (recipe[0].strMeal) {
      mealTitle = recipe[0].strMeal;
    } else {
      mealTitle = recipe[0].strDrink;
    }
    return mealTitle;
  };

  return (
    <h1>
      { recipe.length > 0 && `Receita de ${recipeTitle()}`}
    </h1>
  );
}

export default RecipeDetails;
