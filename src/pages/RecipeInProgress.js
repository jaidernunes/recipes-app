import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Checkboxes from '../components/Checkboxes';
import { getCocktailDetails, getMealDetails } from '../services/detailsAPI';
// import './RecipeInProgress.css';

function RecipeInProgress() {
  const { id } = useParams();
  const history = useHistory();
  const [recipe, setRecipe] = useState([]);
  // const { pathname } = history.location;
  // console.log(history);

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
      checkboxesObj: {},
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
      };
    }

    return recipeInfo;
  };

  // const startRecipeOnClick = () => {
  //   if (pathname.includes('/meals')) {
  //     history.push(`/meals/${id}/in-progress`);
  //     window.localStorage
  //       .setItem('inProgressRecipes', JSON.stringify({ meals: { [id]: [] } }));
  //   } else if (pathname.includes('drinks')) {
  //     history.push(`/drinks/${id}/in-progress`);
  //     window.localStorage
  //       .setItem('inProgressRecipes', JSON.stringify({ drinks: { [id]: [] } }));
  //   }
  // };

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

            <Checkboxes recipeData={ defineRecipe() } />

            <p data-testid="instructions">
              { `Instructions: ${defineRecipe().recipeInstructions}`}
            </p>
            <iframe
              data-testid="video"
              src={ defineRecipe().recipeVideo }
              title={ defineRecipe().recipeTitle }
            />

            <div id="inProgress">
              <button
                data-testid="share-btn"
                type="button"
              >
                SHARE
              </button>

              <button
                data-testid="favorite-btn"
                type="button"
              >
                FAVORTITE
              </button>

              <button
                data-testid="finish-recipe-btn"
                type="button"
              >
                FINISH RECIPE
              </button>
            </div>
          </>
        )}
    </div>
  );
}

export default RecipeInProgress;
