import React from 'react';
import { screen, act } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';
import mockMealDetails from './mocks/mockMealDetails';
import mockDrinkDetails from './mocks/mockDrinkDetails';

describe('Testa a tela de detalhes da receita', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('1. Testa se renderiza corretamente a tela meals', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );

    act(() => {
      history.push('/meals/52772');
    });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockMealDetails),
    });

    const mealTitle = await screen.findByTestId('recipe-title');
    expect(mealTitle).toHaveTextContent('Teriyaki Chicken Casserole');

    const mealPhoto = await screen.findByTestId('recipe-photo');
    expect(mealPhoto).toBeInTheDocument();

    const mealCategory = await screen.findByTestId('recipe-category');
    expect(mealCategory).toHaveTextContent('Chicken');

    const mealIngredient = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(mealIngredient).toHaveTextContent('soy sauce');
  });

  test('2. Testa se renderiza corretamente a tela drinks', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );

    act(() => {
      history.push('/drinks/11007');
    });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDrinkDetails),
    });

    const drinkTitle = await screen.findByTestId('recipe-title');
    expect(drinkTitle).toHaveTextContent('Margarita');

    const drinkPhoto = await screen.findByTestId('recipe-photo');
    expect(drinkPhoto).toBeInTheDocument();

    const drinkCategory = await screen.findByTestId('recipe-category');
    expect(drinkCategory).toHaveTextContent('Alcoholic Ordinary Drink');

    const drinkIngredient = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(drinkIngredient).toHaveTextContent('Tequila');
  });

  test('3. Testa se tem as sugestões na tela de meals', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );

    act(() => {
      history.push('/meals/52772');
    });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockMealDetails),
    });

    const recipeCardTitle = await screen.findByTestId('0-recommendation-title');
    expect(recipeCardTitle).toHaveTextContent('GG');

    const recipeCardTitle2 = await screen.findByTestId('1-recommendation-title');
    expect(recipeCardTitle2).toHaveTextContent('A1');
  });

  test('4. Testa se tem as sugestões na tela de drinks', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );

    act(() => {
      history.push('/drinks/11007');
    });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockDrinkDetails),
    });

    const recipeCardTitle3 = await screen.findByTestId('0-recommendation-title');
    expect(recipeCardTitle3).toHaveTextContent('Corba');

    const recipeCardTitle4 = await screen.findByTestId('1-recommendation-title');
    expect(recipeCardTitle4).toHaveTextContent('Burek');
  });
});
