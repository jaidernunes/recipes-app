import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import ProfileLogo from '../images/profileIcon.svg';
import SearchLogo from '../images/searchIcon.svg';
import './Header.css';

function Header() {
  const { path, url } = useRouteMatch();
  console.log(path, url);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [query, setQuery] = useState('');

  function showTitle() {
    switch (path) {
    case '/meals':
      return 'Meals';
    case '/drinks':
      return 'Drinks';
    case '/profile':
      return 'Profile';
    case '/done-recipes':
      return 'Done Recipes';
    case '/favorite-recipes':
      return 'Favorite Recipes';
    default:
      return 'nao encontrado';
    }
  }

  function toggle() {
    setShowSearchBar((prevState) => !prevState);
  }

  return (
    <>
      <div className="header">
        <Link to="/profile">
          <img data-testid="profile-top-btn" src={ ProfileLogo } alt="profile" />
        </Link>
        <h1 data-testid="page-title">{showTitle()}</h1>
        {['/meals', '/drinks'].includes(path) && (
          <button
            type="button"
            onClick={ toggle }

          >
            <img
              data-testid="search-top-btn"
              src={ SearchLogo }
              alt="search"
            />

          </button>
        )}
      </div>
      {showSearchBar && (
        <div className="search">
          <input
            data-testid="search-input"
            type="text"
            value={ query }
            onChange={ (e) => setQuery(e.target.value) }
          />
        </div>
      )}
    </>
  );
}

export default Header;
