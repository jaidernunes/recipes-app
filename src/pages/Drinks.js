import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import recipesContext from '../context/RecipesContext';
import Header from '../components/Header';

function Drinks() {
  const { drinksRequest } = useContext(recipesContext);
  const number = 12;

  return (
    <main className="list-recipes">
      <Header />
      { drinksRequest?.slice(0, number).map((e, index) => (
        <Card
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
        </Card>
      ))}
    </main>
  );
}

export default Drinks;
