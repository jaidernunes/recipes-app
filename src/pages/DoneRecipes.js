import React from 'react';
import Header from '../components/Header';

function DoneRecipes() {
  return (
    <div>
      <Header />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
      </div>
      <div data-testid={ `${index}-${tagname}-hotizontal-tag` }>
        <img data-testid={ `${index}-horizontal-image` } src="" alt="" />
        <h1 data-testid={ `${index}-horizontal-top-text` }>categoria</h1>
        <h2 data-testid={ `${index}-horizontal-name` }>nome da receita</h2>
        <p data-testid={ `${index}-horizontal-done-date` }>Done in</p>
        <button
          type="button"
          data-testid={ `${index}-horizontal-share-btn` }
        >
          compartilhar
        </button>
      </div>
    </div>

  );
}

export default DoneRecipes;
