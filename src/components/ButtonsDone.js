import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
import All from '../images/DoneRecipes/All.png';
import Drinks from '../images/DoneRecipes/Drinks.png';
import Foods from '../images/DoneRecipes/Foods.png';
import './ButtonsDone.css';

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
    <div className="buttons">
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ all }
        className="all"
      >
        <img src={ All } alt="All" />
      </button>
      <button
        type="button"
        className="filterMeal"
        data-testid="filter-by-meal-btn"
        onClick={ meals }
      >
        <img src={ Foods } alt="Foods" />
      </button>
      <button
        type="button"
        className="filterDrink"
        data-testid="filter-by-drink-btn"
        onClick={ drinks }
      >
        <img src={ Drinks } alt="Drinks" />
      </button>
    </div>
  );
}

export default ButtonsDone;
