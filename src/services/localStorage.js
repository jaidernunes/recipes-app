if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
  localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: {}, drinks: {} }));
}

export const readInProgress = () => JSON.parse(localStorage.getItem('inProgressRecipes'));

export const saveInProgress = (getInProgress) => localStorage
  .setItem('inProgressRecipes', JSON.stringify(getInProgress));

export const addInProgressMeals = (inProgressRecipes) => {
  const inProgress = readInProgress();
  saveInProgress({ ...inProgress.meals, inProgressRecipes });
};
