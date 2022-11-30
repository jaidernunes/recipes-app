import React, { useEffect, useState } from 'react';
// import { useHistory } from 'react-router-dom';
// import { useParams } from 'react-router-dom';
import { getMealDetails } from '../services/detailsAPI';

function RecipeDetails() {
  // const { id } = useParams();
  // const { match } = useHistory();
  const [recipe, setRecipe] = useState([]);

  const fetchMeal = async () => {
    const recipeId = 52772;
    const getMeal = await getMealDetails(recipeId);
    console.log(getMeal);
    setRecipe(getMeal[0].strlMeal);
    console.log(recipe);
  };

  useEffect(() => {
    fetchMeal();
  }, []);

  return (
    <h1>Receita</h1>
    // <h1>
    //   {`Receita de ${recipe[0].strMeal}`}
    // </h1>
  );
}

export default RecipeDetails;
