import React from 'react';
import PropTypes from 'prop-types';

function Recipe({ title, image, category, measures, ingredients,
  instructions, video, alcoholic }) {
  return (
    <div className="recipe">
      <h1 data-testid="recipe-title">
        { `Recipe: ${title}` }
      </h1>
      <img
        data-testid="recipe-photo"
        src={ image }
        alt={ title }
        width="300"
      />
      <h2 data-testid="recipe-category">
        {alcoholic !== undefined
          ? `Category: ${alcoholic} ${category}`
          : `Category: ${category}`}
      </h2>
      <ul>
        Ingredients:
        {measures.map((measure, index) => (
          <li data-testid={ `${index}-ingredient-name-and-measure` } key={ index }>
            {measure}
            {' of '}
            {ingredients[index]}
          </li>))}
      </ul>

      <p data-testid="instructions">
        {`Instructions: ${instructions}`}
      </p>
      <iframe
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
