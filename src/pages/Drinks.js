import React, { useContext } from 'react';
import { Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import recipesContext from '../context/RecipesContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import All from '../images/CategoriesDrinks/All.png';
import OrdinaryDrink from '../images/CategoriesDrinks/drink.png';
import Cocktail from '../images/CategoriesDrinks/cocktail.png';
import Shake from '../images/CategoriesDrinks/shake.png';
import Other from '../images/CategoriesDrinks/other.png';
import Cocoa from '../images/CategoriesDrinks/cocoa.png';
import './Recipes.css';

function Drinks() {
  const {
    drinksRequest,
    search,
    setSearch,
    drinksCategory,
    categoryList,
    setCategoryList,
  } = useContext(recipesContext);
  const history = useHistory();
  const number = 12;

  const requestDrinksCategory = async (category) => {
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
    const result = await response.json();
    setSearch(result);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
    case 'Ordinary Drink':
      return <img src={ OrdinaryDrink } alt={ category } />;
    case 'Cocktail':
      return <img src={ Cocktail } alt={ category } />;
    case 'Shake':
      return <img src={ Shake } alt={ category } />;
    case 'Other / Unknown':
      return <img src={ Other } alt={ category } />;
    case 'Cocoa':
      return <img src={ Cocoa } alt={ category } />;
    default:
      return All;
    }
  };

  return (
    <main className="list-recipes">
      <Header />
      <div className="filter-options">
        { drinksCategory.map((drink, index) => (
          <div key={ index }>
            <button
              type="button"
              data-testid={ `${drink.strCategory}-category-filter` }
              onClick={ () => {
                if (categoryList.length === 0) {
                  requestDrinksCategory(drink.strCategory);
                  setCategoryList(drink.strCategory);
                } else {
                  setSearch('');
                }
              } }
            >
              { getCategoryIcon(drink.strCategory) }
            </button>
          </div>
        )) }
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => setSearch('') }
        >
          <img src={ All } alt="drink" />
        </button>
      </div>
      <div className="items-list">
        { search.length === 0 ? drinksRequest.slice(0, number).map((e, index) => (
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
        ))
          : search.drinks.slice(0, number).map((e, index) => (
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
            </Card>)) }
      </div>
      <Footer />
    </main>
  );
}

export default Drinks;
