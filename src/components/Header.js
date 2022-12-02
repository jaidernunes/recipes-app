import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import ProfileLogo from '../images/profileIcon.svg';
import SearchLogo from '../images/searchIcon.svg';
import './Header.css';
import SearchBar from './SearchBar';

function Header() {
  const { path, url } = useRouteMatch();
  console.log(path, url);
  const [showSearchBar, setShowSearchBar] = useState(false);

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
      {showSearchBar && <SearchBar />}
    </>
  );
}

export default Header;
