import React, { useState, useContext } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import './SearchBar.css';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [typeOfSearch, setTypeOfSearch] = useState('i');
  const { path } = useRouteMatch();
  const history = useHistory();
  const { setSearch } = useContext(RecipesContext);

  function searchAnswer(arr) {
    if (path === '/meals' && arr.meals) {
      // if (!arr.meals) {
      //   global.alert('Sorry, we haven\'t found any recipes for these filters.');
      // }

      if (arr.meals.length === 1) {
        history.push(`${path}/${arr.meals[0].idMeal}`);
      }

      if (arr.meals.length > 1) {
        setSearch(arr);
      }
    } else {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }

    if (path === '/drinks' && arr.drinks) {
      // if (!arr.drinks) {
      //   global.alert('Sorry, we haven\'t found any recipes for these filters.');
      // }

      if (arr.drinks.length === 1) {
        history.push(`${path}/${arr.drinks[0].idDrink}`);
      }

      if (arr.drinks.length > 1) {
        setSearch(arr);
      }
    } else {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
  }

  async function searchRecipe() {
    try {
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
      console.log(json);
      searchAnswer(json);
    } catch (error) {
      searchAnswer([]);
    }

    // if (json.meals.length === 1) {
    //   history.push(`${path}/${json.meals[0].idMeal}`);
    // }
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
