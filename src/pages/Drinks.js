import React, { useContext } from 'react';
import recipesContext from '../context/RecipesContext';
import Header from '../components/Header';

function Drinks() {
  const { drinksRequest } = useContext(recipesContext);
  const number = 12;

  return (
    <main>
      <Header />
      { drinksRequest.slice(0, number).map((e, index) => (
        <div
          key={ index }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ e.strDrinkThumb }
            alt={ e.strDrink }
            data-testid={ `${index}-card-img` }
          />
          <p
            data-testid={ `${index}-card-name` }
          >
            { e.strDrink }
          </p>
        </div>
      ))}
    </main>
  );
}

export default Drinks;
