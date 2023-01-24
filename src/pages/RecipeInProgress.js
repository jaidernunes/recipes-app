import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { Button, Alert, ButtonGroup } from 'react-bootstrap';
import copy from 'clipboard-copy';
import Checkboxes from '../components/Checkboxes';
import RecipesContext from '../context/RecipesContext';
import { getCocktailDetails, getMealDetails } from '../services/detailsAPI';
import './RecipeDetails.css';
import { readDoneRecipes, readFavoriteRecipes, saveDoneRecipes,
  saveFavoriteRecipes } from '../services/localStorage';
import ShareLogo from '../images/shareIcon.svg';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeInProgress() {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [recipe, setRecipe] = useState([]);
  const history = useHistory();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCopy, setIsCopy] = useState(false);
  const {
    recipeType,
    setRecipeType,
    setProgressState,
    manyChecked,
  } = useContext(RecipesContext);

  const fetchMeal = async () => {
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

  const defineRecipe = () => {
    let recipeInfo = {
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
        recipeId: recipe[0].idMeal,
        recipeTitle: recipe[0].strMeal,
        recipeImage: recipe[0].strMealThumb,
        recipeIngredients: ingredientsArr,
        recipeMeasures: measuresArr,
        recipeCategory: recipe[0].strCategory,
        recipeVideo: recipe[0].strYoutube,
        recipeInstructions: recipe[0].strInstructions,
        recipeNationality: recipe[0].strArea,
        recipeCategorySingle: recipe[0].strCategory,
        recipeTags: recipe[0].strTags.split(','),
      };
    } else if (recipe[0].strDrink) {
      recipeInfo = {
        recipeTitle: recipe[0].strDrink,
        recipeImage: recipe[0].strDrinkThumb,
        recipeIngredients: ingredientsArr,
        recipeMeasures: measuresArr,
        recipeCategory: `${recipe[0].strAlcoholic} ${recipe[0].strCategory}`,
        recipeVideo: recipe[0].strYoutube,
        recipeInstructions: recipe[0].strInstructions,
        recipeAlcoholic: recipe[0].strAlcoholic,
        recipeCategorySingle: recipe[0].strCategory,
        recipeTags: [],
      };
    }

    return recipeInfo;
  };

  const saveFavorite = () => {
    setIsFavorite(true);
    const localFavorites = readFavoriteRecipes();

    localFavorites.push({
      id,
      type: recipeType === 'meals' ? 'meal' : 'drink',
      nationality: recipeType === 'meals' ? defineRecipe().recipeNationality : '',
      category: defineRecipe().recipeCategorySingle,
      alcoholicOrNot: recipeType === 'meals' ? '' : defineRecipe().recipeAlcoholic,
      name: defineRecipe().recipeTitle,
      image: defineRecipe().recipeImage,
    });

    saveFavoriteRecipes(localFavorites);
  };

  const saveDone = () => {
    const localDone = readDoneRecipes();
    const day = new Date();
    localDone.push({
      id,
      type: recipeType === 'meals' ? 'meal' : 'drink',
      nationality: recipeType === 'meals' ? defineRecipe().recipeNationality : '',
      category: defineRecipe().recipeCategorySingle,
      alcoholicOrNot: recipeType === 'meals' ? '' : defineRecipe().recipeAlcoholic,
      name: defineRecipe().recipeTitle,
      image: defineRecipe().recipeImage,
      doneDate: day,
      tags: defineRecipe().recipeTags,
    });

    history.push('/done-recipes');
    saveDoneRecipes(localDone);
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
    copy(`http://localhost:3000/${recipeType}/${id}`);
  };

  useEffect(() => {
    fetchMeal();
    getFavorites();

    const localChecks = JSON.parse(
      window.localStorage.getItem('inProgressRecipes'),
    );

    if (pathname.includes('meals')) {
      setRecipeType('meals');
    } else {
      setRecipeType('drinks');
    }

    setProgressState(localChecks);
  }, []);

  return (
    <div>
      {recipe.length > 0
        && (
          <>
            <ButtonGroup
              className="share-button"
              data-testid="share-btn"
              onClick={ shareOnClick }
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

            <h1
              className="recipe-title"
              data-testid="recipe-title"
            >
              {defineRecipe().recipeTitle}
            </h1>
            <h2 className="recipe-title" data-testid="recipe-category">
              <br />
              <br />
              {defineRecipe().recipeCategory}
            </h2>
            <img
              className="recipe-photo"
              data-testid="recipe-photo"
              src={ defineRecipe().recipeImage }
              alt={ defineRecipe().recipeTitle }
              width="300"
            />

            <Checkboxes recipeData={ defineRecipe() } />

            <h2 className="instructions-title">Instructions</h2>
            <div className="instructions-item1">
              <p data-testid="instructions" className="instructions-text">
                {defineRecipe().recipeInstructions}
              </p>
            </div>

            <Button
              className="start-recipe"
              data-testid="finish-recipe-btn"
              onClick={ saveDone }
              disabled={ defineRecipe().recipeIngredients.length !== manyChecked }
            >
              FINISH RECIPE
            </Button>
          </>
        )}
    </div>
  );
}

export default RecipeInProgress;
