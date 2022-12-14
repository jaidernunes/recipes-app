import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import recipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Drinks() {
  const { drinksRequest, search } = useContext(recipesContext);
  const history = useHistory();
  const number = 12;

  const renderDrinksOrSearch = () => {
    if (search.length === 0) {
      return drinksRequest;
    }
    return search.drinks;
  };

  return (
    <main className="list-recipes">
      <Header />
      { renderDrinksOrSearch()?.slice(0, number).map((e, index) => (
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
        </Card>
      ))}
      <Footer />
    </main>
  );
}

export default Drinks;
