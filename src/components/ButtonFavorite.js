import React, { useContext } from 'react';
import RecipesContext from '../context/RecipesContext';
// import All from '../images/DoneRecipes/All.png';
// import Drinks from '../images/DoneRecipes/Drinks.png';
// import Foods from '../images/DoneRecipes/Foods.png';
// import './ButtonsDone.css';

function ButtonFavorite() {
  const { setFavorites } = useContext(RecipesContext);

  const storage = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const all = () => {
    setFavorites(storage);
  };

  const meals = () => {
    setFavorites(storage.filter((done) => done.type === 'meal'));
  };

  const drinks = () => {
    setFavorites(storage.filter((done) => done.type === 'drink'));
  };

  return (
    <div className="buttons">
      <button
        type="button"
        className="filterMeal"
        data-testid="filter-by-meal-btn"
        onClick={ meals }
      >
        Foods
        {/* <img src={ Foods } alt="Foods" /> */}
      </button>
      <button
        type="button"
        className="filterDrink"
        data-testid="filter-by-drink-btn"
        onClick={ drinks }
      >
        Drinks
        {/* <img src={ Drinks } alt="Drinks" /> */}
      </button>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ all }
        className="all"
      >
        All
        {/* <img src={ All } alt="All" /> */}
      </button>
    </div>
  );
}

export default ButtonFavorite;
