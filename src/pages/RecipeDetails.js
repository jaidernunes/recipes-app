import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Carousel, Button } from 'react-bootstrap';
import RecipeCard from '../components/RecipeCard';
import recipesContext from '../context/RecipesContext';
import { getCocktailDetails, getMealDetails } from '../services/detailsAPI';
import './RecipeDetails.css';

function RecipeDetails() {
  const numberSuggestions = 6;
  const { mealsRequest } = useContext(recipesContext);
  const { id } = useParams();
  const history = useHistory();
  const [recipe, setRecipe] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

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

  const getSuggestions = () => {
    const random = 0.5;
    let meals = suggestions;
    if (mealsRequest.length > 0) {
      meals = mealsRequest.sort(() => random - Math.random())
        .slice(0, numberSuggestions);
    }
    return meals;
  };

  useEffect(() => {
    fetchMeal();
  }, []);

  useEffect(() => {
    setSuggestions(getSuggestions());
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
              <Carousel>
                <Carousel.Item>
                  <RecipeCard
                    index={ 0 }
                    photo={ suggestions[0].strMealThumb }
                    name={ suggestions[0].strMeal }
                    index2={ 1 }
                    photo2={ suggestions[1].strMealThumb }
                    name2={ suggestions[1].strMeal }
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <RecipeCard
                    index={ 2 }
                    photo={ suggestions[2].strMealThumb }
                    name={ suggestions[2].strMeal }
                    index2={ 3 }
                    photo2={ suggestions[3].strMealThumb }
                    name2={ suggestions[3].strMeal }
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <RecipeCard
                    index={ 4 }
                    photo={ suggestions[4].strMealThumb }
                    name={ suggestions[4].strMeal }
                    index2={ 5 }
                    photo2={ suggestions[5].strMealThumb }
                    name2={ suggestions[5].strMeal }
                  />
                </Carousel.Item>
              </Carousel>
            )}
            <Button data-testid="start-recipe-btn">Start recipe</Button>
          </>
        )}
    </div>
  );
}

export default RecipeDetails;
