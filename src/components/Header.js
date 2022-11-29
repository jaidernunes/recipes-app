import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import ProfileLogo from '../images/profileIcon.svg';
import SearchLogo from '../images/searchIcon.svg';
import './Header.css';

function Header() {
  const { path, url } = useRouteMatch();
  console.log(path, url);

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

  return (
    <div>
      <Link to="/profile">
        <img data-testid="profile-top-btn" src={ ProfileLogo } alt="profile" />
      </Link>
      <h1 data-testid="page-title">{showTitle()}</h1>
      {['/meals', '/drinks'].includes(path) && (
        <img data-testid="search-top-btn" src={ SearchLogo } alt="search" />
      )}
    </div>
  );
}

export default Header;
