import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import ButtonsDone from '../components/ButtonsDone';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';
import './DoneRecipes.css';

function DoneRecipes() {
  const {
    doneRecipes,
    setDoneRecipes,
    buttonShare,
    setButtonShare,
  } = useContext(RecipesContext);
  const history = useHistory();

  const doneRecipes1 = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  localStorage.setItem('doneRecipes', JSON.stringify({ doneRecipes1 }));

  useEffect(() => {
    const InfoLocalSotrage = () => {
      const local = JSON.parse(localStorage.getItem('doneRecipes')).doneRecipes1;
      setDoneRecipes(local);
    };
    InfoLocalSotrage();
  }, [setDoneRecipes]);

  return (
    <div className="done">
      <Header />
      <ButtonsDone />
      {
        doneRecipes?.map((done, index) => (
          <div
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
            <button
              type="button"
              onClick={ () => history.push(`/${done.type}s/${done.id}`) }
            >
              <h1 data-testid={ `${index}-horizontal-name` }>{done.name}</h1>
            </button>
            <p data-testid={ `${index}-horizontal-done-date` }>
              Done in:
              {' '}
              {done.doneDate}
            </p>
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
            {done.type === 'drink'
              ? (
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {done.alcoholicOrNot}
                </p>
              ) : (
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {done.nationality}
                  {' '}
                  -
                  {' '}
                  {done.category}
                </p>
              )}
            {done.tags.map((tag) => (
              <p
                key={ tag }
                data-testid={ `${index}-${tag}-horizontal-tag` }
              >
                {tag}
              </p>
            ))}
          </div>
        ))
      }
      { buttonShare === 'sim' && (<p>Link copied!</p>)}
    </div>
  );
}

export default DoneRecipes;
