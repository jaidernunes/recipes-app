import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import recipesContext from '../context/RecipesContext';
import Header from '../components/Header';

function Meals() {
  const { mealsRequest } = useContext(recipesContext);
  const number = 12;

  return (
    <main className="list-recipes">
      <Header />
      { mealsRequest?.slice(0, number).map((e, index) => (
        <Card
          key={ index }
          data-testid={ `${index}-recipe-card` }
        >
          <img
            src={ e.strMealThumb }
            alt={ e.strMeal }
            data-testid={ `${index}-card-img` }
          />
          <p
            data-testid={ `${index}-card-name` }
          >
            { e.strMeal }
          </p>
        </Card>
      ))}
    </main>
  );
}

export default Meals;
