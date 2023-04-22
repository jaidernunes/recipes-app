import React from 'react';
import { useLocation } from 'react-router-dom';
import MealsRecipe from '../components/MealsRecipe';
import DrinksRecipe from '../components/DrinksRecipe';

function RecipeDetails() {
  // const { history } = useHistory();
  const { pathname } = useLocation();

  return (
    <div className="recipe-container">
      {
        pathname.includes('meals') ? <MealsRecipe /> : <DrinksRecipe />
      }
    </div>
  );
}

export default RecipeDetails;
