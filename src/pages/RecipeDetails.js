import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Carousel, Button } from 'react-bootstrap';
import RecipeCard from '../components/RecipeCard';
import { getCocktailDetails, getMealDetails } from '../services/detailsAPI';
import { fetchDrinks, fetchMeals } from '../services/recipesAPI';
import './RecipeDetails.css';

function RecipeDetails() {
  const numberSuggestions = 6;
  // const { mealsRequest } = useContext(recipesContext);
  const { id } = useParams();
  const history = useHistory();
  const [recipe, setRecipe] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isMeal, setIsMeal] = useState(true);

  const fetchMeal = async () => {
    const { pathname } = history.location;
    let getRecipe = recipe;
    if (pathname.includes('/meals')) {
      const getMeal = await getMealDetails(id);
      getRecipe = getMeal;
    } else if (pathname.includes('/drinks')) {
      const getDrink = await getCocktailDetails(id);
      getRecipe = getDrink;
    }
    setRecipe(getRecipe);
  };

  const fetchSuggestions = async () => {
    const { pathname } = history.location;
    let getSuggestions = suggestions;
    if (pathname.includes('/meals')) {
      const getDrinksList = await fetchDrinks();
      const drinks = getDrinksList.slice(0, numberSuggestions);
      getSuggestions = drinks;
      setIsMeal(false);
    } else if (pathname.includes('/drinks')) {
      const getMealsList = await fetchMeals();
      const meals = getMealsList.slice(0, numberSuggestions);
      getSuggestions = meals;
    }
    setSuggestions(getSuggestions);
  };

  useEffect(() => {
    fetchMeal();
    fetchSuggestions();
  }, []);

  const defineRecipe = () => {
    let recipeInfo = {
      recipeTitle: '',
      recipeImage: '',
      recipeIngredients: [],
      recipeMeasures: [],
      recipeCategory: '',
      recipeVideo: '',
    };
    const ingredientsArr = [];
    const measuresArr = [];

    Object.entries(recipe[0]).forEach(([key, value]) => {
      if (key.includes('strIngredient') && value !== null && value.length > 0) {
        ingredientsArr.push(value);
      }

      if (key.includes('strMeasure') && value !== null && value.length > 0) {
        measuresArr.push(value);
      }
    });

    if (recipe[0].strMeal) {
      recipeInfo = {
        recipeTitle: recipe[0].strMeal,
        recipeImage: recipe[0].strMealThumb,
        recipeIngredients: ingredientsArr,
        recipeMeasures: measuresArr,
        recipeCategory: recipe[0].strCategory,
        recipeVideo: recipe[0].strYoutube,
        recipeInstructions: recipe[0].strInstructions,
      };
    } else if (recipe[0].strDrink) {
      // mealTitle = recipe[0].strDrink;
      recipeInfo = {
        recipeTitle: recipe[0].strDrink,
        recipeImage: recipe[0].strDrinkThumb,
        recipeIngredients: ingredientsArr,
        recipeMeasures: measuresArr,
        recipeCategory: `${recipe[0].strAlcoholic} ${recipe[0].strCategory}`,
        recipeVideo: recipe[0].strYoutube,
        recipeInstructions: recipe[0].strInstructions,
      };
    }
    return recipeInfo;
  };

  const startRecipeOnClick = () => {
    const { pathname } = history.location;
    if (pathname.includes('/meals')) {
      history.push(`/meals/${id}/in-progress`);
    } else if (pathname.includes('drinks')) {
      history.push(`/drinks/${id}/in-progress`);
    }
  };

  return (
    <div>
      {recipe.length > 0
        && (
          <>
            <h1 data-testid="recipe-title">
              {`Recipe: ${defineRecipe().recipeTitle}`}
            </h1>
            <img
              data-testid="recipe-photo"
              src={ defineRecipe().recipeImage }
              alt={ defineRecipe().recipeTitle }
              width="300"
            />
            <h2 data-testid="recipe-category">
              { `Category: ${defineRecipe().recipeCategory}`}
            </h2>

            <ul>
              Ingredients:
              {defineRecipe().recipeMeasures.map((measure, index) => (
                <li data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
                  {measure}
                  {' of '}
                  {defineRecipe().recipeIngredients[index]}
                </li>))}
            </ul>

            <p data-testid="instructions">
              { `Instructions: ${defineRecipe().recipeInstructions}`}
            </p>
            <iframe
              data-testid="video"
              src={ defineRecipe().recipeVideo }
              title={ defineRecipe().recipeTitle }
            />
            {suggestions.length > 0 && (
              <Carousel
                interval={ null }
              >
                <Carousel.Item>
                  <RecipeCard
                    index={ 0 }
                    photo={ isMeal ? suggestions[0].strMealThumb
                      : suggestions[0].strDrinkThumb }
                    name={ isMeal ? suggestions[0].strMeal
                      : suggestions[0].strDrink }
                    index2={ 1 }
                    photo2={ isMeal ? suggestions[1].strMealThumb
                      : suggestions[1].strDrinkThumb }
                    name2={ isMeal ? suggestions[1].strMeal
                      : suggestions[1].strDrink }
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <RecipeCard
                    index={ 2 }
                    photo={ isMeal ? suggestions[2].strMealThumb
                      : suggestions[2].strDrinkThumb }
                    name={ isMeal ? suggestions[2].strMeal
                      : suggestions[2].strDrink }
                    index2={ 3 }
                    photo2={ isMeal ? suggestions[3].strMealThumb
                      : suggestions[3].strDrinkThumb }
                    name2={ isMeal ? suggestions[3].strMeal
                      : suggestions[3].strDrink }
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <RecipeCard
                    index={ 4 }
                    photo={ isMeal ? suggestions[4].strMealThumb
                      : suggestions[4].strDrinkThumb }
                    name={ isMeal ? suggestions[4].strMeal
                      : suggestions[4].strDrink }
                    index2={ 5 }
                    photo2={ isMeal ? suggestions[5].strMealThumb
                      : suggestions[5].strDrinkThumb }
                    name2={ isMeal ? suggestions[5].strMeal
                      : suggestions[5].strDrink }
                  />
                </Carousel.Item>
              </Carousel>
            )}
            <Button
              data-testid="start-recipe-btn"
              onClick={ startRecipeOnClick }
            >
              Start recipe
            </Button>
          </>
        )}
    </div>
  );
}

export default RecipeDetails;
