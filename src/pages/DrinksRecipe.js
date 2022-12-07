import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Carousel, Button } from 'react-bootstrap';
import RecipeCard from '../components/RecipeCard';
import Recipe from '../components/Recipe';
import { getCocktailDetails } from '../services/detailsAPI';
import { fetchMeals } from '../services/recipesAPI';
import './RecipeDetails.css';
import { addInProgress } from '../services/localStorage';

function DrinksRecipe() {
  const numberSuggestions = 6;
  const { id } = useParams();
  const { history } = useHistory();
  const [drink, setDrink] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [recipe, setRecipe] = useState({
    recipeTitle: '',
    recipeImage: '',
    recipeIngredients: [],
    recipeMeasures: [],
    recipeCategory: '',
    recipeVideo: '',
  });

  const fetchRecipeAndSuggestions = async () => {
    const getDrink = await getCocktailDetails(id);
    const getMealsList = await fetchMeals();
    const meals = getMealsList.slice(0, numberSuggestions);
    setDrink(getDrink);
    setSuggestions(meals);
  };

  const defineRecipe = () => {
    const ingredientsArr = [];
    const measuresArr = [];

    Object.entries(drink[0]).forEach(([key, value]) => {
      if (key.includes('strIngredient') && value !== null && value.length > 0) {
        ingredientsArr.push(value);
      }

      if (key.includes('strMeasure') && value !== null && value.length > 0) {
        measuresArr.push(value);
      }
    });

    setRecipe({
      recipeTitle: recipe[0].strDrink,
      recipeImage: recipe[0].strDrinkThumb,
      recipeIngredients: ingredientsArr,
      recipeMeasures: measuresArr,
      recipeCategory: `${recipe[0].strAlcoholic} ${recipe[0].strCategory}`,
      recipeVideo: recipe[0].strYoutube,
      recipeInstructions: recipe[0].strInstructions,
    });
  };

  const startRecipeOnClick = () => {
    history.push(`/drinks/${id}/in-progress`);
    addInProgress(id);
  };

  const inProgress = () => {
    const localProgress = readInProgress();
    const getInProgress = localProgress.some((localId) => localId === id);
    return getInProgress;
  };

  useEffect(() => {
    fetchRecipeAndSuggestions();
    defineRecipe();
  }, []);

  return (
    <div>
      {recipe.length > 0
        && (
          <>
            <Recipe
              title={ recipe.recipeTitle }
              image={ recipe.recipeImage }
              category={ recipe.recipeCategory }
              measures={ recipe.recipeMeasures }
              ingredients={ recipe.recipeIngredients }
              instructions={ recipe.recipeInstructions }
              video={ recipe.recipeVideo }
            />
            {suggestions.length > 0 && (
              <Carousel
                interval={ null }
              >
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
            <Button
              data-testid="start-recipe-btn"
              onClick={ startRecipeOnClick }
            >
              {inProgress() ? 'Continue recipe' : 'Start recipe'}
            </Button>
          </>
        )}
    </div>
  );
}

export default DrinksRecipe;
