import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import copy from 'clipboard-copy';
import renderWithRouter from './helpers/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';

jest.mock('clipboard-copy');
const drinkTestURL = '/drinks/178319/in-progress';

test('4. Testa a função do botão de compartilhar', async () => {
  copy.mockImplementation(() => {});

  const { history } = renderWithRouter(
    <RecipesProvider>
      <App />
    </RecipesProvider>,
  );

  history.push(drinkTestURL);

  const btnShare = await screen.findByTestId('share-btn');

  userEvent.click(btnShare);

  const copyAlert = await screen.findByText(/link copied!/i);

  expect(copyAlert).toBeInTheDocument();
});
