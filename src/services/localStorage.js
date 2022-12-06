if (!JSON.parse(localStorage.getItem('inProgressRecipes'))) {
  localStorage.setItem('inProgressRecipes', JSON.stringify([{ meals: {}, drinks: {} }]));
}

const readInProgress = () => JSON.parse(localStorage.getItem('inProgressRecipes'));

export const saveInProgress = (inProgress) => localStorage
  .setItem('inProgressRecipes', JSON.stringify(inProgress));

export const addInProgress = (newInProgress) => {
  const inProgress = readInProgress();
  saveInProgress([...inProgress, newInProgress]);
};
