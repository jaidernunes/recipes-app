import React, { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import './SearchBar.css';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [typeOfSearch, setTypeOfSearch] = useState('i');
  const { path } = useRouteMatch();

  async function searchRecipe() {
    if (typeOfSearch === 'f' && query.length > 1) {
      global.alert('Your search must have only 1 (one) character');
    }
    const filOrSearch = typeOfSearch === 'i' ? 'filter' : 'search';
    const url = path === '/meals'
      ? 'https://www.themealdb.com/api/json/v1/1/'
      : 'https://www.thecocktaildb.com/api/json/v1/1/';
    const res = await fetch(
      `${url}${filOrSearch}.php?${typeOfSearch}=${query}`,
    );
    const json = await res.json();
    console.log(json.meals);
  }

  return (
    <div className="searchBar">
      <div className="search">
        <input
          data-testid="search-input"
          type="text"
          value={ query }
          onChange={ (e) => setQuery(e.target.value) }
        />
      </div>
      <div>
        <label htmlFor="ingredient">
          <input
            type="radio"
            id="ingredient"
            name="ingredient"
            data-testid="ingredient-search-radio"
            onChange={ (e) => setTypeOfSearch(e.target.value) }
            value="i"
            checked={ typeOfSearch === 'i' }
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            id="name"
            name="name"
            data-testid="name-search-radio"
            onChange={ (e) => setTypeOfSearch(e.target.value) }
            value="s"
            checked={ typeOfSearch === 's' }
          />
          Nome
        </label>
        <label htmlFor="firstLetter">
          <input
            type="radio"
            id="firstLetter"
            name="firstLetter"
            data-testid="first-letter-search-radio"
            onChange={ (e) => setTypeOfSearch(e.target.value) }
            value="f"
            checked={ typeOfSearch === 'f' }
          />
          Primeira Letra
        </label>
        <button
          data-testid="exec-search-btn"
          type="button"
          onClick={ searchRecipe }
        >
          Pesquisar
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
