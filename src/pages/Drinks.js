import React, { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import recipesContext from '../context/RecipesContext';
import Header from '../components/Header';

function Drinks() {
  const history = useHistory();
  const { drinksRequest } = useContext(recipesContext);
  const number = 12;

  return (
    <main className="list-recipes">
      <Header />
      { drinksRequest?.slice(0, number).map((e, index) => (
        <Card
          onClick={ () => history.push(`/drinks/${e.idDrink}`) }
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
          <Button
            onClick={ () => history.push(`/drinks/${e.idDrink}`) }
          >
            Ver detalhes
          </Button>
        </Card>
      ))}
    </main>
  );
}

export default Drinks;
