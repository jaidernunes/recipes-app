import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar() {
  const [query, setQuery] = useState('');
  // const [typeOfSearch, setTypeOfSearch] = useState('');

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
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            id="name"
            name="name"
            data-testid="name-search-radio"
          />
          Nome
        </label>
        <label htmlFor="firstLetter">
          <input
            type="radio"
            id="firstLetter"
            name="firstLetter"
            data-testid="first-letter-search-radio"
          />
          Primeira Letra
        </label>
        <button
          data-testid="exec-search-btn"
          type="button"
        >
          Pesquisar
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
