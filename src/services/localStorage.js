if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
  localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: {}, drinks: {} }));
}

if (!JSON.parse(localStorage.getItem('favoriteRecipes'))) {
  localStorage.setItem('favoriteRecipes', JSON.stringify([]));
}

if (!JSON.parse(localStorage.getItem('doneRecipes'))) {
  localStorage.setItem('doneRecipes', JSON.stringify([]));
}

export const readInProgress = () => JSON.parse(localStorage.getItem('inProgressRecipes'));

export const saveInProgress = (getInProgress) => localStorage
  .setItem('inProgressRecipes', JSON.stringify(getInProgress));

export const readFavoriteRecipes = () => (
  JSON.parse(localStorage.getItem('favoriteRecipes')));

export const saveFavoriteRecipes = (getInProgress) => localStorage
  .setItem('favoriteRecipes', JSON.stringify(getInProgress));

export const readDoneRecipes = () => (
  JSON.parse(localStorage.getItem('doneRecipes')));

export const saveDoneRecipes = (getInProgress) => {
  localStorage.setItem('doneRecipes', JSON.stringify(getInProgress));
};
