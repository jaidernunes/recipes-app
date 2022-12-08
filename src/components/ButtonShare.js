import React, { useContext } from 'react';
import copy from 'clipboard-copy';
import RecipesContext from '../context/RecipesContext';
import shareIcon from '../images/shareIcon.svg';

function ButtonShare() {
  const {
    setButtonShare,
    doneRecipes,
  } = useContext(RecipesContext);
  return (
       {
        doneRecipes?.map((done, index) => (
    <div>
      <button
        type="submit"
        onClick={ () => {
          copy(`http://localhost:3000/${done.type}s/${done.id}`);
          setButtonShare('sim');
        } }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          src={ shareIcon }
          alt="shareIcon"
          className="btnShare"
        />
      </button>
    </div>
     ))}
  );
}

export default ButtonShare;
