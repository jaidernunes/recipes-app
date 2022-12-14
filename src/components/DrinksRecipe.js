import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { Carousel, ButtonGroup, Alert } from 'react-bootstrap';
import RecipeCard from './RecipeCard';
import Recipe from './Recipe';
import { getCocktailDetails } from '../services/detailsAPI';
import { fetchMeals } from '../services/recipesAPI';
// import './RecipeDetails.css';
import { readInProgress, saveInProgress,
  readFavoriteRecipes, saveFavoriteRecipes } from '../services/localStorage';
import ShareLogo from '../images/shareIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';

function DrinksRecipe() {
  const numberSuggestions = 6;
  const history = useHistory();
  const { id } = useParams();
  const [suggestions, setSuggestions] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCopy, setIsCopy] = useState(false);

  const defineRecipe = (drink) => {
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

    setRecipe([{
      recipeTitle: drink[0].strDrink,
      recipeImage: drink[0].strDrinkThumb,
      recipeIngredients: ingredientsArr,
      recipeMeasures: measuresArr,
      recipeCategory: drink[0].strCategory,
      recipeAlcoholic: drink[0].strAlcoholic,
      recipeVideo: drink[0].strYoutube,
      recipeInstructions: drink[0].strInstructions,
    }]);
  };

  const startRecipeOnClick = () => {
    history.push(`/drinks/${id}/in-progress`);
    const localProgress = readInProgress();
    localProgress.drinks[id] = recipe[0].recipeIngredients;
    saveInProgress(localProgress);
  };

  const inProgress = () => {
    const localProgress = readInProgress();
    const keysId = Object.keys(localProgress.drinks);
    const isInProgress = keysId.some((keyId) => keyId === id);
    return isInProgress;
  };

  const saveFavorite = () => {
    setIsFavorite(true);
    const localFavorites = readFavoriteRecipes();
    const drinkId = id;
    localFavorites.push({
      id: drinkId,
      type: 'drink',
      nationality: '',
      category: recipe[0].recipeCategory,
      alcoholicOrNot: recipe[0].recipeAlcoholic,
      name: recipe[0].recipeTitle,
      image: recipe[0].recipeImage,
    });
    saveFavoriteRecipes(localFavorites);
  };

  const getFavorites = () => {
    const favorites = readFavoriteRecipes();
    const getFavorite = favorites.some((favorite) => favorite.id === id);
    if (getFavorite) {
      setIsFavorite(true);
    }
  };

  const removeFavorite = () => {
    const favorites = readFavoriteRecipes();
    const newFavorites = favorites.filter((favorite) => favorite.id !== id);
    saveFavoriteRecipes(newFavorites);
    setIsFavorite(false);
  };

  const shareOnClick = () => {
    setIsCopy(true);
    copy(`http://localhost:3000/drinks/${id}`);
  };

  useEffect(() => {
    const fetchRecipeAndSuggestions = async () => {
      const getDrink = await getCocktailDetails(id);
      const getMealsList = await fetchMeals();
      const meals = getMealsList.slice(0, numberSuggestions);
      setSuggestions(meals);
      defineRecipe(getDrink);
    };
    fetchRecipeAndSuggestions();
    getFavorites();
  }, []);

  return (
    <div>
      {recipe.length > 0
        && (
          <>
            <Recipe
              title={ recipe[0].recipeTitle }
              image={ recipe[0].recipeImage }
              category={ recipe[0].recipeCategory }
              measures={ recipe[0].recipeMeasures }
              ingredients={ recipe[0].recipeIngredients }
              instructions={ recipe[0].recipeInstructions }
              video={ recipe[0].recipeVideo }
              alcoholic={ recipe[0].recipeAlcoholic }
            />
            <ButtonGroup
              className="share-button"
              onClick={ shareOnClick }
              data-testid="share-btn"
            >
              <img src={ ShareLogo } alt="share logo" />
            </ButtonGroup>
            {
              isFavorite
                ? (
                  <ButtonGroup className="favorite-button" onClick={ removeFavorite }>
                    <img
                      data-testid="favorite-btn"
                      src={ BlackHeartIcon }
                      alt="black heart"
                    />
                  </ButtonGroup>
                )
                : (
                  <ButtonGroup className="favorite-button" onClick={ saveFavorite }>
                    <img
                      data-testid="favorite-btn"
                      src={ WhiteHeartIcon }
                      alt="white heart"
                    />
                  </ButtonGroup>
                )
            }
            {
              isCopy && <Alert>Link copied!</Alert>
            }
            {suggestions.length > 0 && (
              <Carousel
                interval={ null }
              >
                <Carousel.Item>
                  <RecipeCard
                    index={ 0 }
                    redirect={ () => history.push(`/meals/${suggestions[0].idMeal}`) }
                    photo={ suggestions[0].strMealThumb }
                    name={ suggestions[0].strMeal }
                    index2={ 1 }
                    redirect2={ () => history.push(`/meals/${suggestions[1].idMeal}`) }
                    photo2={ suggestions[1].strMealThumb }
                    name2={ suggestions[1].strMeal }
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <RecipeCard
                    index={ 2 }
                    redirect={ () => history.push(`/meals/${suggestions[2].idMeal}`) }
                    photo={ suggestions[2].strMealThumb }
                    name={ suggestions[2].strMeal }
                    index2={ 3 }
                    redirect2={ () => history.push(`/meals/${suggestions[3].idMeal}`) }
                    photo2={ suggestions[3].strMealThumb }
                    name2={ suggestions[3].strMeal }
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <RecipeCard
                    index={ 4 }
                    redirect={ () => history.push(`/meals/${suggestions[4].idMeal}`) }
                    photo={ suggestions[4].strMealThumb }
                    name={ suggestions[4].strMeal }
                    index2={ 5 }
                    redirect2={ () => history.push(`/meals/${suggestions[5].idMeal}`) }
                    photo2={ suggestions[5].strMealThumb }
                    name2={ suggestions[5].strMeal }
                  />
                </Carousel.Item>
              </Carousel>
            )}
            <ButtonGroup
              className="start-recipe"
              data-testid="start-recipe-btn"
              onClick={ startRecipeOnClick }
            >
              { inProgress() ? 'Continue Recipe' : 'Start Recipe' }
            </ButtonGroup>
          </>
        )}
    </div>
  );
}

export default DrinksRecipe;
