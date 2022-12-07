import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Carousel, Button } from 'react-bootstrap';
import RecipeCard from '../components/RecipeCard';
import Recipe from '../components/Recipe';
import { getMealDetails } from '../services/detailsAPI';
import { fetchDrinks } from '../services/recipesAPI';
import './RecipeDetails.css';
import { addInProgress } from '../services/localStorage';

function MealsRecipe() {
  const numberSuggestions = 6;
  const { history } = useHistory();
  const { id } = useParams();
  const [meal, setMeal] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [recipe, setRecipe] = useState({
    recipeTitle: '',
    recipeImage: '',
    recipeIngredients: [],
    recipeMeasures: [],
    recipeCategory: '',
    recipeVideo: '',
  });
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);

  const fetchMealAndSuggestions = async () => {
    const getMeal = await getMealDetails(id);
    const getDrinksList = await fetchDrinks();
    const drinks = getDrinksList.slice(0, numberSuggestions);
    setMeal(getMeal);
    setSuggestions(drinks);
  };

  const getIngredients = () => {
    const ingredientsArr = [];
    const measuresArr = [];

    Object.entries(meal[0]).forEach(([key, value]) => {
      if (key.includes('strIngredient') && value !== null && value.length > 0) {
        ingredientsArr.push(value);
      }

      if (key.includes('strMeasure') && value !== null && value.length > 0) {
        measuresArr.push(value);
      }
    });
    setIngredients(ingredientsArr);
    setMeasures(measuresArr);
  };

  const defineRecipe = () => {
    setRecipe({
      recipeTitle: meal[0].strMeal,
      recipeImage: meal[0].strMealThumb,
      recipeIngredients: ingredients,
      recipeMeasures: measures,
      recipeCategory: meal[0].strCategory,
      recipeVideo: meal[0].strYoutube,
      recipeInstructions: meal[0].strInstructions,
    });
  };

  useEffect(() => {
    fetchMealAndSuggestions();
    defineRecipe();
    getIngredients();
  }, []);

  const startRecipeOnClick = () => {
    history.push(`/meals/${id}/in-progress`);
    addInProgress(id);
  };

  const inProgress = () => {
    const localProgress = readInProgress();
    const getInProgress = localProgress.some((localId) => localId === id);
    return getInProgress;
  };

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
            {suggestions?.length > 0 && (
              <Carousel
                interval={ null }
              >
                <Carousel.Item>
                  <RecipeCard
                    index={ 0 }
                    photo={ suggestions[0].strDrinkThumb }
                    name={ suggestions[0].strDrink }
                    index2={ 1 }
                    photo2={ suggestions[1].strDrinkThumb }
                    name2={ suggestions[1].strDrink }
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <RecipeCard
                    index={ 2 }
                    photo={ suggestions[2].strDrinkThumb }
                    name={ suggestions[2].strDrink }
                    index2={ 3 }
                    photo2={ suggestions[3].strDrinkThumb }
                    name2={ suggestions[3].strDrink }
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <RecipeCard
                    index={ 4 }
                    photo={ suggestions[4].strDrinkThumb }
                    name={ suggestions[4].strDrink }
                    index2={ 5 }
                    photo2={ suggestions[5].strDrinkThumb }
                    name2={ suggestions[5].strDrink }
                  />
                </Carousel.Item>
              </Carousel>
            )}
            <Button
              data-testid="start-recipe-btn"
              onClick={ startRecipeOnClick }
            >
              { inProgress() ? 'Continue recipe' : 'Start recipe' }
            </Button>
          </>
        )}
    </div>
  );
}

export default MealsRecipe;
