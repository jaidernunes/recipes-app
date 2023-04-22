import React, { useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import ProfileLogo from '../images/profileIcon.svg';
import SearchLogo from '../images/searchIcon.svg';
import './Header.css';
import SearchBar from './SearchBar';
import DoneRecipes from '../images/Profile/DoneRecipes.png';
import bebida from '../images/Header/bebida.png';
import Perfil from '../images/Header/Perfil.png';
import prato from '../images/Header/prato.png';
import Favorite from '../images/Profile/Favorite.png';
import IconeRecipes from '../images/Header/IconeRecipes.png';
import logoRecipesApp from '../images/Header/logoRecipesApp.png';

function Header() {
  const { path } = useRouteMatch();
  const [showSearchBar, setShowSearchBar] = useState(false);

  function showTitle() {
    switch (path) {
    case '/meals':
      return (
        <p>
          <img src={ prato } alt="prato" />
          <br />
          <br />
          Meals
        </p>
      );
    case '/drinks':
      return (
        <p>
          <img src={ bebida } alt="bebida" />
          <br />
          <br />
          Drinks
        </p>
      );
    case '/profile':
      return (
        <p>
          <img src={ Perfil } alt="Perfil" />
          <br />
          <br />
          Profile
        </p>
      );
    case '/done-recipes':
      return (
        <p>
          <img src={ DoneRecipes } alt="DoneRecipes" />
          <br />
          <br />
          Done Recipes
        </p>
      );
    case '/favorite-recipes':
      return (
        <p>
          <img src={ Favorite } alt="Favorite" />
          <br />
          <br />
          Favorite Recipes
        </p>
      );
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
        <div className="faixa">
          <div className="header-logo">
            <img
              src={ IconeRecipes }
              alt="Icone Recipes"
              className="iconeRecipes"
            />
            <img
              src={ logoRecipesApp }
              alt="Logo Recipes App"
              className="logoRecipesApp"
            />
          </div>
          {['/meals', '/drinks'].includes(path) && (
            <button
              className="search-top-btn"
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
          <Link
            to="/profile"
            className="profile-btn"
          >
            <img
              data-testid="profile-top-btn"
              src={ ProfileLogo }
              alt="profile"
            />
          </Link>

        </div>
        <h1 data-testid="page-title" className="pageTitle">{showTitle()}</h1>
      </div>
      {showSearchBar && <SearchBar />}
    </>
  );
}

export default Header;
