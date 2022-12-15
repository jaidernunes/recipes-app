import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './helpers/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';

describe('Testa a tela de Receita em Progresso com o Local Storage preenchido', () => {
  // const drinkTestURL = '/drinks/178319/in-progress';
  const favMealLocal = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    },
  ];

  window.localStorage.setItem('favoriteRecipes', JSON.stringify(favMealLocal));

  test('1. Testa a função de botão de favoritar', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );

    history.push('/meals/52771/in-progress');

    const localFavorites = () => window.localStorage.getItem('favoriteRecipes');

    expect(JSON.parse(localFavorites())).toStrictEqual(favMealLocal);

    const blackHeart = await screen.findByRole('img', { name: /black heart/i });
    expect(blackHeart).toBeInTheDocument();

    const btnfavorite = await screen.findByTestId('favorite-btn');

    userEvent.click(btnfavorite);

    expect(JSON.parse(localFavorites())).toStrictEqual([]);

    const whiteHeart = screen.getByRole('img', { name: /white heart/i });

    expect(whiteHeart).toBeInTheDocument();

    // expect(JSON.parse(localFavorites())).toStrictEqual([
    //   {
    //     id: '178319',
    //     type: 'drink',
    //     nationality: '',
    //     category: 'Cocktail',
    //     alcoholicOrNot: 'Alcoholic',
    //     name: 'Aquamarine',
    //     image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    //   },
    // ]);

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
