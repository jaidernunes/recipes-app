import React, { useContext, useEffect } from 'react';
import ButtonsDone from '../components/ButtonsDone';
import Header from '../components/Header';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';

// const copy = require('clipboard-copy');

function DoneRecipes() {
  const { doneRecipes, setDoneRecipes } = useContext(RecipesContext);

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
    setDoneRecipes(JSON.parse(localStorage.getItem('doneRecipes')).doneRecipes1);
  }, [setDoneRecipes]);

  const share = () => {
    global.alert('Link copied!');
  };

  return (
    <div>
      <Header />
      <ButtonsDone />
      {
        doneRecipes.map((done, index) => (
          <div
            key={ index }
          >
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ done.image }
              alt="Imagem Receita"
            />
            <h1 data-testid={ `${index}-horizontal-name` }>{done.name}</h1>
            <p data-testid={ `${index}-horizontal-done-date` }>
              Done in:
              {' '}
              {done.doneDate}
            </p>
            <button
              type="button"
              onClick={ share }
              // copy(`http://localhost:3000/${done.type}/:${done.id}`)
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                alt="shareIcon"
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
    </div>
  );
}

export default DoneRecipes;
