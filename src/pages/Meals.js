import React, { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import recipesContext from '../context/RecipesContext';
import Header from '../components/Header';

function Meals() {
  const history = useHistory();
  const { mealsRequest } = useContext(recipesContext);
  const number = 12;

  return (
    <main className="list-recipes">
      <Header />
      { mealsRequest?.slice(0, number).map((e, index) => (
        <Card
          onClick={ () => history.push(`/meals/${e.idMeal}`) }
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
          <Button
            onClick={ () => history.push(`/meals/${e.idMeal}`) }
          >
            Ver detalhes
          </Button>
        </Card>
      ))}
    </main>
  );
}

export default Meals;
