if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
  localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: {}, drinks: {} }));
}

if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
  localStorage.setItem('favoriteRecipes', JSON.stringify([]));
}

export const readInProgress = () => JSON.parse(localStorage.getItem('inProgressRecipes'));

export const saveInProgress = (getInProgress) => localStorage
  .setItem('inProgressRecipes', JSON.stringify(getInProgress));

export const readFavoriteRecipes = () => (
  JSON.parse(localStorage.getItem('favoriteRecipes')));

export const saveFavoriteRecipes = (getInProgress) => localStorage
  .setItem('favoriteRecipes', JSON.stringify(getInProgress));
