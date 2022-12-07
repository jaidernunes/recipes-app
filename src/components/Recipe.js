import React from 'react';

function Recipe({title, image, category, measures, ingredients, instructions, video}) {
  return (
    <div className="recipe">
      <h1 data-testid="recipe-title">
        {`Recipe: ${title}`}
      </h1>
      <img
        data-testid="recipe-photo"
        src={ image }
        alt={ title }
        width="300"
      />
      <h2 data-testid="recipe-category">
        { `Category: ${category}`}
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
        { `Instructions: ${instructions}`}
      </p>
      <iframe
        data-testid="video"
        src={ video }
        title={ title }
      />
    </div>
  );
}

export default Recipe;
