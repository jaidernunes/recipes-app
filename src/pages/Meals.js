import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import recipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Meals() {
  const {
    mealsRequest,
    search,
    setSearch,
    mealsCategory,
  } = useContext(recipesContext);
  const history = useHistory();
  const number = 12;

  const requestMealsCategory = async (category) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const result = await response.json();
    // console.log(result);
    setSearch(result);
  };

  return (
    <main className="list-recipes">
      <Header />
      { mealsCategory.map((meals, index) => (
        <div key={ index }>
          <button
            type="button"
            data-testid={ `${meals.strCategory}-category-filter` }
            onClick={ () => requestMealsCategory(meals.strCategory) }
          >
            {meals.strCategory}
          </button>
        </div>
      )) }
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => setSearch('') }
      >
        All
      </button>
      { search.length === 0 ? mealsRequest.slice(0, number).map((e, index) => (
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
      ))
        : search.meals.slice(0, number).map((e, index) => (
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
          </Card>)) }
      <Footer />
    </main>
  );
}

export default Meals;
