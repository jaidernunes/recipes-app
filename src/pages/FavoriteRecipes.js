import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ButtonGroup } from 'react-bootstrap';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import ButtonFavorite from '../components/ButtonFavorite';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import './FavoriteRecipes.css';
import { readFavoriteRecipes } from '../services/localStorage';

function FavoriteRecipes() {
  const {
    setButtonShare,
    setIsFavorite,
    favorites,
    setFavorites,
    buttonShare,
  } = useContext(RecipesContext);
  const history = useHistory();

  useEffect(() => {
    const InfoLocalSotrage = () => {
      const local = readFavoriteRecipes();
      setFavorites(local);
    };
    InfoLocalSotrage();
  }, [setFavorites, setIsFavorite]);

  const removeFavorite = (idRemove) => {
    const newFavorites = favorites.filter((favorite) => favorite.id !== idRemove);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
  };

  return (
    <div>
      <Header />
      <ButtonFavorite />
      {
        favorites?.map((done, index) => (
          <div
            className="recipes"
            key={ done.id }
          >
            <button
              type="button"
              onClick={ () => history.push(`/${done.type}s/${done.id}`) }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ done.image }
                alt="Imagem Receita"
                className="img"
              />
            </button>
            <div className="info">
              <button
                type="button"
                onClick={ () => history.push(`/${done.type}s/${done.id}`) }
              >
                <h1
                  data-testid={ `${index}-horizontal-name` }
                  className="name"
                >
                  {done.name}
                </h1>
              </button>
              {done.type === 'drink'
                ? (
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                    className="date"
                  >
                    {done.alcoholicOrNot}
                  </p>
                ) : (
                  <p
                    data-testid={ `${index}-horizontal-top-text` }
                    className="nationality"
                  >
                    {done.nationality}
                    {' '}
                    -
                    {' '}
                    {done.category}
                  </p>
                )}
            </div>
            <div>
              <button
                type="button"
                onClick={ () => {
                  copy(`http://localhost:3000/${done.type}s/${done.id}`);
                  setButtonShare('sim');
                } }
              >
                <img
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  alt="shareIcon"
                  className="btnShare"
                />
              </button>
              { buttonShare === 'sim' && (<p>Link copied!</p>)}
            </div>
            <div>
              {
                favorites
                  && (
                    <ButtonGroup
                      data-testid={ `${index}-button-favorite` }
                      className="btnFavorite"
                      onClick={ () => {
                        removeFavorite(done.id);
                        history.go();
                      } }
                    >
                      <img
                        data-testid={ `${index}-horizontal-favorite-btn` }
                        src={ BlackHeartIcon }
                        alt="black heart"
                      />
                    </ButtonGroup>
                  )
              }
            </div>
          </div>
        ))
      }
    </div>
  );
}

export default FavoriteRecipes;
