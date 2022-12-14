import React from 'react';
import PropTypes from 'prop-types';
import './Recipe.css';

function Recipe({ title, image, category, measures, ingredients,
  instructions, video, alcoholic }) {
  return (
    <div className="recipe">
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
          ? `${alcoholic} ${category}`
          : `${category}`}
      </h2>
      <h2 className="ingredients-title">Ingredients</h2>
      <div className="ingredients-list">
        <ul>
          Ingredients:
          {measures.map((measure, index) => (
            <li data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
              {measure}
              {' of '}
              {ingredients[index]}
            </li>))}
        </ul>
      </div>
      <h2 className="instructions-title">Instructions</h2>
      <p data-testid="instructions" className="instructions-text">
        {`Instructions: ${instructions}`}
      </p>
      <h2 className="video-title">Video</h2>
      <iframe
        className="video"
        data-testid="video"
        src={ video }
        title={ title }
      />
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
