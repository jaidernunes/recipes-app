import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';
// import Routes.js from '../Routes.js'

describe('Testa a tela de Receita em Progresso', () => {
  const drinkTestURL = '/drinks/178319/in-progress';

  // test('0', async () => {
  //   const { history } = renderWithRouter(
  //     <RecipesProvider>
  //       <App />
  //     </RecipesProvider>,
  //   );

  //   history.push(drinkTestURL);

  //   expect(history.location.pathname).toBe(drinkTestURL);
  // });

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
});
