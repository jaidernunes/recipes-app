import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './helpers/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';

describe('Testa a tela de Receita em Progresso', () => {
  const drinkTestURL = '/drinks/178319/in-progress';

  beforeEach(() => {
    const mockDate = new Date(1000, 0, 1, 0);
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('1. Testa se os elementos básicos da tela foram renderizados', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );

    history.push(drinkTestURL);

    expect(history.location.pathname).toBe(drinkTestURL);

    const drinkImg = await screen.findByRole('img', { name: /aquamarine/i });
    const category = screen.getByRole('heading', { name: /category: alcoholic cocktail/i });
    const igredientTitle = screen.getByText(/ingredients:/i);
    const ing0 = screen.getByText(/2 oz of hpnotiq/i);
    const ing1 = screen.getByText(/1 oz of pineapple juice/i);
    const ing2 = screen.getByText(/1 oz of banana liqueur/i);
    const instructions = screen.getByText(/instructions: shake well in a shaker with ice\. strain in a martini glass\./i);

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

    history.push(drinkTestURL);

    const localDone = () => window.localStorage.getItem('doneRecipes');
    const ing0 = await screen.findByTestId('0-ingredient-step');
    const ing1 = await screen.findByTestId('1-ingredient-step');
    const ing2 = await screen.findByTestId('2-ingredient-step');
    const btnDone = await screen.findByTestId('finish-recipe-btn');
    expect(btnDone).toBeDisabled();

    userEvent.click(ing0);
    userEvent.click(ing1);
    userEvent.click(ing2);

    expect(JSON.parse(localDone()).length).toBe(0);
    expect(JSON.parse(localDone())).toStrictEqual([]);
    expect(btnDone).not.toBeDisabled();

    userEvent.click(btnDone);

    expect(JSON.parse(localDone()).length).toBe(1);
    expect(JSON.parse(localDone())).toStrictEqual([
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        doneDate: '1000-01-01T03:06:28.000Z',
        tags: [],
      },
    ]);
  });

  test('2. Testa a função de botão de favoritar', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );

    history.push(drinkTestURL);

    const localFavorites = () => window.localStorage.getItem('favoriteRecipes');

    expect(JSON.parse(localFavorites())).toStrictEqual([]);

    const whiteHeart = await screen.findByRole('img', { name: /white heart/i });
    expect(whiteHeart).toBeInTheDocument();

    const btnfavorite = await screen.findByTestId('favorite-btn');
    userEvent.click(btnfavorite);

    const blackHeart = await screen.findByRole('img', { name: /black heart/i });
    expect(blackHeart).toBeInTheDocument();

    expect(JSON.parse(localFavorites())).toStrictEqual([
      {
        id: '178319',
        type: 'drink',
        nationality: '',
        category: 'Cocktail',
        alcoholicOrNot: 'Alcoholic',
        name: 'Aquamarine',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      },
    ]);

    // userEvent.click(btnfavorite);

    // expect(JSON.parse(localFavorites())).toStrictEqual([]);

    // expect(whiteHeart()).toBeInTheDocument();

    // const whiteHeart = screen.getByRole('img', { name: /white heart/i });

    // const unfavoriteBtn = screen.findByRole('img', { name: /black heart/i });
    // const unfavoriteBtn = screen.findByAltText(/black heart/i);
    // const favoriteBtn = screen.findByAltText(/white heart/i);
    // expect(unfavoriteBtn).toBeInTheDocument();
    // expect(favoriteBtn).toBeInTheDocument();
  });
});
