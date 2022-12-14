import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';

describe('Testa a tela de Receita em Progresso', () => {
  const mealTestURL = '/meals/52771/in-progress';
  // const favMealLocal = [
  //   {
  //     id: '52771',
  //     type: 'meal',
  //     nationality: 'Italian',
  //     category: 'Vegetarian',
  //     alcoholicOrNot: '',
  //     name: 'Spicy Arrabiata Penne',
  //     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  //   },
  // ];

  beforeEach(() => {
    const mockDate = new Date(1000, 0, 1, 0);
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
  });

  // afterEach(() => {
  //   jest.restoreAllMocks();
  // });

  test('1. Testa se os elementos básicos da tela foram renderizados', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );

    history.push(mealTestURL);

    expect(history.location.pathname).toBe(mealTestURL);

    const drinkImg = await screen.findByRole('img', { name: /Spicy Arrabiata Penne/i });
    const category = screen.getByRole('heading', { name: /Category: Vegetarian/i });
    const igredientTitle = screen.getByText(/ingredients:/i);
    const ing0 = screen.getByText(/1 pound of penne rigate/i);
    const ing1 = screen.getByText('1/4 cup of olive oil');
    const ing2 = screen.getByText(/3 cloves of garlic/i);
    const instructions = screen.getByText(/Bring a large pot of water to a boil./i);

    expect(drinkImg).toBeInTheDocument();
    expect(category).toBeInTheDocument();
    expect(igredientTitle).toBeInTheDocument();
    expect(ing0).toBeInTheDocument();
    expect(ing1).toBeInTheDocument();
    expect(ing2).toBeInTheDocument();
    expect(instructions).toBeInTheDocument();
  });

  test('2. Testa a função do botão de conluir a receita', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );

    history.push(mealTestURL);

    const localDone = () => window.localStorage.getItem('doneRecipes');
    const ing0 = await screen.findByTestId('0-ingredient-step');
    const ing1 = await screen.findByTestId('1-ingredient-step');
    const ing2 = await screen.findByTestId('2-ingredient-step');
    const ing3 = await screen.findByTestId('3-ingredient-step');
    const ing4 = await screen.findByTestId('4-ingredient-step');
    const ing5 = await screen.findByTestId('5-ingredient-step');
    const ing6 = await screen.findByTestId('6-ingredient-step');
    const ing7 = await screen.findByTestId('7-ingredient-step');
    const btnDone = await screen.findByTestId('finish-recipe-btn');
    expect(btnDone).toBeDisabled();

    userEvent.click(ing0);
    userEvent.click(ing1);
    userEvent.click(ing2);
    userEvent.click(ing3);
    userEvent.click(ing4);
    userEvent.click(ing5);
    userEvent.click(ing6);
    userEvent.click(ing7);

    expect(JSON.parse(localDone()).length).toBe(0);
    expect(JSON.parse(localDone())).toStrictEqual([]);
    expect(btnDone).not.toBeDisabled();

    userEvent.click(btnDone);

    console.log(JSON.parse(localDone()));
    expect(JSON.parse(localDone()).length).toBe(1);
    // expect(JSON.parse(localDone())).toStrictEqual([
    //   {
    //     id: '52771',
    //     type: 'meal',
    //     nationality: 'Italian',
    //     category: 'Vegetarian',
    //     alcoholicOrNot: '',
    //     name: 'Spicy Arrabiata Penne',
    //     image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    //     doneDate: '1000-01-01T03:06:28.000Z',
    //     tags: ['Pasta', 'Curry'],
    //   },
    // ]);
  });

  test('3. Testa a função de botão de favoritar', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );

    history.push(mealTestURL);

    const localFavorites = () => window.localStorage.getItem('favoriteRecipes');

    expect(JSON.parse(localFavorites())).toStrictEqual([]);

    const whiteHeart = await screen.findByRole('img', { name: /white heart/i });

    const btnfavorite = await screen.findByTestId('favorite-btn');
    userEvent.click(btnfavorite);

    expect(JSON.parse(localFavorites())).toStrictEqual([
      {
        id: '52771',
        type: 'meal',
        nationality: 'Italian',
        category: 'Vegetarian',
        alcoholicOrNot: '',
        name: 'Spicy Arrabiata Penne',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      },
    ]);

    const blackHeart = await screen.findByRole('img', { name: /black heart/i });
    expect(blackHeart).toBeInTheDocument();

    expect(whiteHeart).toBeInTheDocument();
  });
});
