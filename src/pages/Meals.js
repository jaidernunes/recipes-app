import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import recipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Beef from '../images/CategoriesMeals/beef.png';
import All from '../images/CategoriesMeals/All.png';
import Goat from '../images/CategoriesMeals/goat.png';
import Chicken from '../images/CategoriesMeals/chicken.png';
import Dessert from '../images/CategoriesMeals/dessert.png';
import Breakfast from '../images/CategoriesMeals/breakfast.png';

function Meals() {
  const {
    mealsRequest,
    search,
    setSearch,
    mealsCategory,
    categoryList,
    setCategoryList,
  } = useContext(recipesContext);
  const history = useHistory();
  const number = 12;

  const requestMealsCategory = async (category) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const result = await response.json();
    // console.log(result);
    setSearch(result);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
    case 'Beef':
      return <img src={ Beef } alt={ category } />;
    case 'Breakfast':
      return <img src={ Breakfast } alt={ category } />;
    case 'Chicken':
      return <img src={ Chicken } alt={ category } />;
    case 'Dessert':
      return <img src={ Dessert } alt={ category } />;
    case 'Goat':
      return <img src={ Goat } alt={ category } />;
    default:
      return All;
    }
  };

  return (
    <main className="list-recipes">
      <Header />
      { mealsCategory.map((meals, index) => (
        <div key={ index }>
          <button
            type="button"
            data-testid={ `${meals.strCategory}-category-filter` }
            onClick={ () => {
              if (categoryList.length === 0) {
                requestMealsCategory(meals.strCategory);
                setCategoryList(meals.strCategory);
              } else {
                setSearch('');
              }
            } }
          >
            { getCategoryIcon(meals.strCategory) }
          </button>
        </div>
      )) }
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ () => setSearch('') }
      >
        <img src={ All } alt="meal" />
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
