import React from 'react';
import { useLocation } from 'react-router-dom';
import MealsRecipe from './MealsRecipe';
import DrinksRecipe from './DrinksRecipe';

function RecipeDetails() {
  // const { history } = useHistory();
  const { pathname } = useLocation();

  return (
    <div>
      {
        pathname.includes('meals') ? <MealsRecipe /> : <DrinksRecipe />
      }
    </div>
  );
}

export default RecipeDetails;
