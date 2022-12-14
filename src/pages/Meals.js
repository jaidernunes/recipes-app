import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import recipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Meals() {
  const { mealsRequest, search } = useContext(recipesContext);
  const history = useHistory();
  const number = 12;
  // console.log(search);

  const renderMealsOrSearch = () => {
    if (search.length === 0) {
      return mealsRequest;
    }
    return search.meals;
  };

  return (
    <main className="list-recipes">
      <Header />
      { renderMealsOrSearch()?.slice(0, number).map((e, index) => (
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
        </Card>
      ))}
      <Footer />
    </main>
  );
}

export default Meals;
