import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Carousel, Button, Alert, ButtonGroup } from 'react-bootstrap';
import copy from 'clipboard-copy';
import RecipeCard from './RecipeCard';
import Recipe from './Recipe';
import { getMealDetails } from '../services/detailsAPI';
import { fetchDrinks } from '../services/recipesAPI';
import '../pages/RecipeDetails.css';
import { readInProgress, saveInProgress,
  readFavoriteRecipes, saveFavoriteRecipes } from '../services/localStorage';
import ShareLogo from '../images/shareIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';

function MealsRecipe() {
  const numberSuggestions = 6;
  const history = useHistory();
  const { id } = useParams();
  const [suggestions, setSuggestions] = useState([]);
  const [recipe, setRecipe] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCopy, setIsCopy] = useState(false);

  const defineRecipe = (meal) => {
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

    setRecipe([{
      recipeTitle: meal[0].strMeal,
      recipeImage: meal[0].strMealThumb,
      recipeIngredients: ingredientsArr,
      recipeMeasures: measuresArr,
      recipeCategory: meal[0].strCategory,
      recipeVideo: meal[0].strYoutube,
      recipeInstructions: meal[0].strInstructions,
      recipeNationality: meal[0].strArea,
    }]);
  };

  const startRecipeOnClick = () => {
    history.push(`/meals/${id}/in-progress`);
    const localProgress = readInProgress();
    const ingredients = recipe[0].recipeIngredients;
    const getProgressIngredients = ingredients.map(() => false);
    localProgress.meals[id] = getProgressIngredients;
    saveInProgress(localProgress);
  };

  const inProgress = () => {
    const localProgress = readInProgress();
    const keysId = Object.keys(localProgress.meals);
    const isInProgress = keysId.some((keyId) => keyId === id);
    return isInProgress;
  };

  const saveFavorite = () => {
    setIsFavorite(true);
    const localFavorites = readFavoriteRecipes();
    const mealId = id;
    localFavorites.push({
      id: mealId,
      type: 'meal',
      nationality: recipe[0].recipeNationality,
      category: recipe[0].recipeCategory,
      alcoholicOrNot: '',
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
    copy(`http://localhost:3000/meals/${id}`);
  };

  useEffect(() => {
    const fetchMealAndSuggestions = async () => {
      const getMeal = await getMealDetails(id);
      const getDrinksList = await fetchDrinks();
      const drinks = getDrinksList.slice(0, numberSuggestions);
      setSuggestions(drinks);
      defineRecipe(getMeal);
    };
    fetchMealAndSuggestions();
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
            />
            <Button
              data-testid="share-btn"
              onClick={ shareOnClick }
            >
              <img src={ ShareLogo } alt="share logo" />
            </Button>
            {
              isFavorite
                ? (
                  <ButtonGroup className="btn btn-danger" onClick={ removeFavorite }>
                    <img
                      data-testid="favorite-btn"
                      src={ BlackHeartIcon }
                      alt="black heart"
                    />
                  </ButtonGroup>
                )
                : (
                  <ButtonGroup className="btn btn-danger" onClick={ saveFavorite }>
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
                className="carousel"
                interval={ null }
              >
                <Carousel.Item>
                  <RecipeCard
                    index={ 0 }
                    redirect={ () => history.push(`/drinks/${suggestions[0].idDrink}`) }
                    photo={ suggestions[0].strDrinkThumb }
                    name={ suggestions[0].strDrink }
                    redirect2={ () => history.push(`/drinks/${suggestions[1].idDrink}`) }
                    index2={ 1 }
                    photo2={ suggestions[1].strDrinkThumb }
                    name2={ suggestions[1].strDrink }
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <RecipeCard
                    index={ 2 }
                    redirect={ () => history.push(`/drinks/${suggestions[2].idDrink}`) }
                    photo={ suggestions[2].strDrinkThumb }
                    name={ suggestions[2].strDrink }
                    redirect2={ () => history.push(`/drinks/${suggestions[3].idDrink}`) }
                    index2={ 3 }
                    photo2={ suggestions[3].strDrinkThumb }
                    name2={ suggestions[3].strDrink }
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <RecipeCard
                    index={ 4 }
                    redirect={ () => history.push(`/drinks/${suggestions[4].idDrink}`) }
                    photo={ suggestions[4].strDrinkThumb }
                    name={ suggestions[4].strDrink }
                    redirect2={ () => history.push(`/drinks/${suggestions[5].idDrink}`) }
                    index2={ 5 }
                    photo2={ suggestions[5].strDrinkThumb }
                    name2={ suggestions[5].strDrink }
                  />
                </Carousel.Item>
              </Carousel>
            )}
            <Button
              className="start-recipe"
              data-testid="start-recipe-btn"
              onClick={ startRecipeOnClick }
            >
              { inProgress() ? 'Continue Recipe' : 'Start Recipe' }
            </Button>
          </>
        )}
    </div>
  );
}

export default MealsRecipe;
