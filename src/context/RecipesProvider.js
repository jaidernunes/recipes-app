import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [buttonShare, setButtonShare] = useState([]);

  // estado da primeira requisição
  const [mealsRequest, setMealsRequest] = useState([]);
  const [drinksRequest, setDrinksRequest] = useState([]);

  // recipes in progress
  // const initialObj = {
  //   0: false,
  //   1: false,
  //   2: false,
  //   4: false,
  //   5: false,
  //   6: false,
  //   7: false,
  //   8: false,
  //   9: false,
  //   10: false,
  //   11: false,
  //   12: false,
  //   13: false,
  //   14: false,
  //   15: false,
  //   16: false,
  //   17: false,
  //   18: false,
  //   19: false,
  //   20: false,
  // };
  // const [boxChecked, setBoxChecked] = useState(initialObj);
  const [recipeType, setRecipeType] = useState('');
  const [progressState, setProgressState] = useState({});
  const [manyChecked, setManyChecked] = useState(0);

  useEffect(() => {
    const requestMeals = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const result = await response.json();
      setMealsRequest(result.meals);
    };

    const requestDrinks = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const result = await response.json();
      setDrinksRequest(result.drinks);
    };
    requestMeals();
    requestDrinks();
  }, []);

  const providerProps = useMemo(() => ({
    doneRecipes,
    setDoneRecipes,
    buttonShare,
    setButtonShare,
    mealsRequest,
    drinksRequest,
    recipeType,
    setRecipeType,
    progressState,
    setProgressState,
    // boxChecked,
    // setBoxChecked,
    manyChecked,
    setManyChecked,
  }), [doneRecipes, buttonShare, drinksRequest, mealsRequest,
    progressState, recipeType, manyChecked]);

  return (
    <RecipesContext.Provider value={ providerProps }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = ({
  children: PropTypes.element.isRequired,
});

export default RecipesProvider;
