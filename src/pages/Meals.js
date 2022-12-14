import React, { useContext } from 'react';
import recipesContext from '../context/RecipesContext';
import Header from '../components/Header';

function Meals() {
  const { mealsRequest, search } = useContext(recipesContext);
  const number = 12;
  // console.log(search);

  const renderMealsOrSearch = () => {
    if (search.length === 0) {
      return mealsRequest;
    }
    return search.meals;
  };

  return (
    <main>
      <Header />
      { renderMealsOrSearch()?.slice(0, number).map((e, index) => (
        <div
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
        </div>
      ))}
    </main>
  );
}

export default Meals;
