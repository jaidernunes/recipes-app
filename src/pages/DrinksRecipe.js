import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Carousel, Button } from 'react-bootstrap';
import RecipeCard from '../components/RecipeCard';
import Recipe from '../components/Recipe';
import { getCocktailDetails } from '../services/detailsAPI';
import { fetchMeals } from '../services/recipesAPI';
import './RecipeDetails.css';
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
      recipeCategory: `${drink[0].strAlcoholic} ${drink[0].strCategory}`,
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
      alcoholicOrNot: recipe[0].strAlcoholic,
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
            />
            <Button
              data-testid="share-btn"
            >
              <img src={ ShareLogo } alt="share logo" />
            </Button>
            {
              isFavorite
                ? (
                  <Button onClick={ removeFavorite }>
                    <img
                      data-testid="favorite-btn"
                      src={ BlackHeartIcon }
                      alt="black heart"
                    />
                  </Button>
                )
                : (
                  <Button onClick={ saveFavorite }>
                    <img
                      data-testid="favorite-btn"
                      src={ WhiteHeartIcon }
                      alt="white heart"
                    />
                  </Button>
                )
            }
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

export default DrinksRecipe;
