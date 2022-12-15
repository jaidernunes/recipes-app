import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [buttonShare, setButtonShare] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [search, setSearch] = useState([]);

  // estado da primeira requisição
  const [mealsRequest, setMealsRequest] = useState([]);
  const [drinksRequest, setDrinksRequest] = useState([]);

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
    search,
    setSearch,
    doneRecipes,
    setDoneRecipes,
    buttonShare,
    setButtonShare,
    mealsRequest,
    drinksRequest,
    isFavorite,
    setIsFavorite,
  }), [doneRecipes, buttonShare, drinksRequest, mealsRequest, search, isFavorite,
  ]);

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
