import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Carousel, Button } from 'react-bootstrap';
import RecipeCard from '../components/RecipeCard';
import Recipe from '../components/Recipe';
import { getCocktailDetails } from '../services/detailsAPI';
import { fetchMeals } from '../services/recipesAPI';
import './RecipeDetails.css';
// import readInProgress from '../services/localStorage';

function DrinksRecipe() {
  const numberSuggestions = 6;
  const history = useHistory();
  const { id } = useParams();
  const [suggestions, setSuggestions] = useState([]);
  const [recipe, setRecipe] = useState([]);

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

  useEffect(() => {
    const fetchRecipeAndSuggestions = async () => {
      const getDrink = await getCocktailDetails(id);
      const getMealsList = await fetchMeals();
      const meals = getMealsList.slice(0, numberSuggestions);
      setSuggestions(meals);
      defineRecipe(getDrink);
    };
    fetchRecipeAndSuggestions();
  }, []);

  const startRecipeOnClick = () => {
    history.push(`/drinks/${id}/in-progress`);
    // addInProgress(id);
  };

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
              Start recipe
              {/* {inProgress() ? 'Continue recipe' : 'Start recipe'} */}
            </Button>
          </>
        )}
    </div>
  );
}

export default DrinksRecipe;
