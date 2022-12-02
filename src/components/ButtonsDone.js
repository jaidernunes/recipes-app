import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';

function ButtonsDone() {
  const { setDoneRecipes } = useContext(RecipesContext);

  const storage = JSON.parse(localStorage.getItem('doneRecipes')).doneRecipes1;

  const all = () => {
    setDoneRecipes(storage);
  };

  const meals = () => {
    setDoneRecipes(storage.filter((done) => done.type === 'meal'));
  };

  const drinks = () => {
    setDoneRecipes(storage.filter((done) => done.type === 'drink'));
  };

  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ all }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ meals }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ drinks }
      >
        Drinks
      </button>
    </div>
  );
}

export default ButtonsDone;
