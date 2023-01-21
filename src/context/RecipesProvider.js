import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [buttonShare, setButtonShare] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [search, setSearch] = useState([]);
  const [mealsCategory, setMealsCategory] = useState([]);
  const [drinksCategory, setDrinksCategory] = useState([]);

  // estado da primeira requisição
  const [mealsRequest, setMealsRequest] = useState([]);
  const [drinksRequest, setDrinksRequest] = useState([]);

  // recipes in progress
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
    const categoryMeals = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const result = await response.json();
      const numberCategory = 5;
      setMealsCategory(result.meals.slice(0, numberCategory));
    };

    const categoryDrinks = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
      const result = await response.json();
      setDrinksCategory(result.drinks);
      const numberCategory = 5;
      setDrinksCategory(result.drinks.slice(0, numberCategory));
    };
    requestMeals();
    requestDrinks();
    categoryMeals();
    categoryDrinks();
  }, []);

  const providerProps = useMemo(() => ({
    search,
    setSearch,
    doneRecipes,
    setDoneRecipes,
    buttonShare,
    setButtonShare,
    mealsRequest,
    setMealsRequest,
    drinksRequest,
    recipeType,
    setRecipeType,
    progressState,
    setProgressState,
    manyChecked,
    setManyChecked,
    isFavorite,
    setIsFavorite,
    favorites,
    setFavorites,
    mealsCategory,
    setMealsCategory,
    drinksCategory,
    setDrinksCategory,
  }), [doneRecipes, buttonShare, drinksRequest, mealsRequest, favorites,
    progressState, recipeType, manyChecked, setIsFavorite, mealsCategory,
    drinksCategory, setSearch, search, isFavorite]);

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
