// import { func } from 'prop-types';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RecipesContext from '../context/RecipesContext';
import './Checkboxes.css';

function Checkboxes({ recipeData }) {
  const { id } = useParams();
  // const { pathname } = useLocation();

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

  const [recipeObj] = useState(recipeData);
  // const [recipeType, setRecipeType] = useState('');
  // const [progressState, setProgressState] = useState({});
  const [boxChecked, setBoxChecked] = useState(initialObj);
  const [forceRender, setForceRender] = useState(0);
  const {
    recipeType,
    progressState,
    // boxChecked,
    // setBoxChecked,
    manyChecked, setManyChecked,
  } = useContext(RecipesContext);

  useState(() => {
    // const localChecks = SON.parse(
    //   window.localStorage.getItem('inProgressRecipes'),
    // );

    // if (pathname.includes('meals')) {
    //   setRecipeType('meals');
    // } else {
    //   setRecipeType('drinks');
    // }

    // console.log(localChecks);
    // setProgressState(localChecks);
    // if (progressState[recipeType][id]) {
    //   setBoxChecked(progressState[recipeType][id]);
    // } else {
    //   setBoxChecked(initialObj);
    // }
    // if (localChecks) {
    //   setBoxChecked(localChecks);
    // } else {
    //   setBoxChecked(initialObj);
    // }

    console.log(progressState[recipeType][id]);
    if (progressState[recipeType][id]) {
      setBoxChecked(progressState[recipeType][id]);
    } else {
      setBoxChecked(initialObj);
    }

    // setProgressState(localChecks);
    // console.log(localChecks);
    console.log(progressState);
    setForceRender(forceRender + 1);
  }, []);

  useEffect(() => {
    console.log('update state');
    // const completed = Object.values(boxChecked)
    //   .filter((e) => e === true).length;
    // setManyChecked(completed);
    // console.log(completed);
  }, [forceRender]);

  // const handleCheck = (e) => {
  //   const newObj = boxChecked;
  //   newObj[index] = e.target.checked;

  //   setForceRender(forceRender + 1);
  //   setBoxChecked(newObj);

  //   window.localStorage
  //     .setItem('inProgressRecipes', JSON.stringify(boxChecked));
  // };

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

              const localProgress = progressState;
              localProgress[recipeType][id] = boxChecked;

              window.localStorage
                .setItem('inProgressRecipes', JSON.stringify(localProgress));

              const completed = Object.values(boxChecked)
                .filter((el) => el === true).length;
              setManyChecked(completed);
              console.log(completed);
            } }
            checked={ boxChecked[index] }
            // onChange={ (e) => {
            //   const newObj = boxChecked;
            //   newObj[index] = e.target.checked;

            //   setForceRender(forceRender + 1);
            //   setBoxChecked(newObj);

            //   window.localStorage
            //     .setItem('inProgressRecipes', JSON.stringify(boxChecked));
            // } }
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
