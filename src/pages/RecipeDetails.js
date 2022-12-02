import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Carousel from 'react-bootstrap/Carousel';
import recipesContext from '../context/RecipesContext';
import { getCocktailDetails, getMealDetails } from '../services/detailsAPI';

function RecipeDetails() {
  const numberSuggestions = 6;
  const { mealsRequest } = useContext(recipesContext);
  const { id } = useParams();
  const history = useHistory();
  const [recipe, setRecipe] = useState([]);

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

  useEffect(() => {
    fetchMeal();
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
            {mealsRequest.length > 0 && (
              <Carousel>
                {mealsRequest?.slice(0, numberSuggestions).map((meal, index) => (
                  <Carousel.Item
                    key={ index }
                    data-testid={ `${index}-recommendation-card` }
                  >
                    <img src={ meal.strMealThumb } alt={ meal.strMeal } width="200" />
                    <Carousel.Caption>
                      <h3 data-testid={ `${index}-recommendation-title` }>
                        { meal.strMeal }
                      </h3>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))}
              </Carousel>
            )}
          </>
        )}
    </div>
  );
}

export default RecipeDetails;
