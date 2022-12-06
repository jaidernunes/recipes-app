export const fetchMeals = async () => {
  const requestMeals = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
  const results = await requestMeals.json();
  const { meals } = results;
  return meals;
};

export const fetchDrinks = async () => {
  const requestDrinks = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
  const results = await requestDrinks.json();
  const { drinks } = results;
  return drinks;
};
