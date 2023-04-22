import React from 'react';
import PropTypes from 'prop-types';
// import './Recipe.css';
import DrinkRecipes from '../images/RecipeDetails/DrinkRecipes.png';
import MealsRecipes from '../images/RecipeDetails/MealsRecipes.png';

function Recipe({ title, image, category, measures, ingredients,
  instructions, video, alcoholic }) {
  return (
    <div className="recipe parent-container">
      <h1 data-testid="recipe-title" className="recipe-title">
        { title }
      </h1>
      <img
        data-testid="recipe-photo"
        className="recipe-photo"
        src={ image }
        alt={ title }
      />
      <h2 className="category-title" data-testid="recipe-category">
        {alcoholic !== undefined
          ? (
            <div className="DrinkRecipes">
              <img src={ DrinkRecipes } alt="DrinkRecipes" />
              {`${alcoholic} ${category}`}
            </div>
          )
          : (
            <div className="MealsRecipes">
              <img src={ MealsRecipes } alt="MealsRecipes" />
              { category }
            </div>
          )}
      </h2>

      <div className="align-self-left">
        <h2 className="ingredients-title">Ingredients</h2>
        <div className="ingredients-list">
          <ul>
            {measures.map((measure, index) => (
              <li data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
                {measure}
                {' of '}
                {ingredients[index]}
              </li>))}
          </ul>
        </div>
      </div>

      <div className="align-self-left">
        <h2 className="instructions-title">Instructions</h2>
        <div className="instructions-item1">
          <p data-testid="instructions" className="instructions-text">
            { instructions }
          </p>
        </div>
      </div>

      <div className="align-self-left">
        <h2 className="video-title">Video</h2>
        <div className="video-container">
          <iframe
            className="video-frame"
            data-testid="video"
            src={ video }
            title={ title }
          />
        </div>
      </div>
    </div>
  );
}

Recipe.propTypes = ({
  alcoholic: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  category: PropTypes.string,
  instructions: PropTypes.string,
  video: PropTypes.string,
  ingredients: PropTypes.arrayOf(PropTypes.string),
  measures: PropTypes.arrayOf(PropTypes.string),
}.isRequired);

export default Recipe;
