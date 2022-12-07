if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
  localStorage.setItem('inProgressRecipes', JSON.stringify([]));
}

export const readInProgress = () => JSON.parse(localStorage.getItem('inProgressRecipes'));

export const saveInProgress = (getInProgress) => localStorage
  .setItem('inProgressRecipes', JSON.stringify(getInProgress));

export const addInProgress = (newInProgress) => {
  const inProgress = readInProgress();
  saveInProgress([...inProgress, newInProgress]);
};
