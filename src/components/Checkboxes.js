// import { func } from 'prop-types';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './Checkboxes.css';

function Checkboxes({ recipeData }) {
  const initialObj = {
    0: false,
    1: false,
    2: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false,
    16: false,
    17: false,
    18: false,
    19: false,
    20: false,
  };
  const [boxChecked, setBoxChecked] = useState(initialObj);
  const [recipeObj] = useState(recipeData);
  const [forceRender, setForceRender] = useState(0);

  useState(() => {
    const localChecks = JSON.parse(window.localStorage.getItem('inProgressRecipes'));

    if (localChecks) {
      setBoxChecked(localChecks);
    } else {
      setBoxChecked(initialObj);
    }

    setForceRender(forceRender + 1);
  }, []);

  useState(() => {
    console.log('update state');
  }, [forceRender]);

  return (
    <div>
      Ingredients:
      {forceRender > 0 && recipeObj.recipeMeasures.map((measure, index) => (
        <label
          key={ index }
          className={ boxChecked[index] ? 'checked' : 'unchecked' }
          htmlFor={ `ingredient-${index}` }
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            type="checkbox"
            name={ index }
            id={ `ingredient-${index}` }
            onChange={ (e) => {
              const newObj = boxChecked;
              newObj[index] = e.target.checked;

              setForceRender(forceRender + 1);
              setBoxChecked(newObj);

              window.localStorage
                .setItem('inProgressRecipes', JSON.stringify(boxChecked));
            } }
            checked={ boxChecked[index] }
          />
          { `${measure} of ${recipeObj.recipeIngredients[index]}`}
        </label>
      ))}
    </div>
  );
}

Checkboxes.propTypes = {
  recipeData: PropTypes.shape().isRequired,
};

export default Checkboxes;
