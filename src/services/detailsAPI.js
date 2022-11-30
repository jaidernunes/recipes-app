export const getMealDetails = async (mealId) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
  const json = await response.json();
  const { meals } = json;
  return meals;
};

export const getCocktailDetails = async (cocktailId) => {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`);
  const json = await response.json();
  return json;
};
