import React from 'react';
import { screen, act } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';
import mockDetails from './mocks/mockDetails';

describe('Testa a tela de detalhes da receita', () => {
  afterEach(() => jest.clearAllMocks());
  test('1. Testa se renderiza os itens corretamente', async () => {
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
      json: jest.fn().mockResolvedValue(mockDetails),
    });

    const title = await screen.findByTestId('recipe-title');
    expect(title).toHaveTextContent('Teriyaki Chicken Casserole');

    const photo = await screen.findByTestId('recipe-photo');
    expect(photo).toBeInTheDocument();

    const category = await screen.findByTestId('recipe-category');
    expect(category).toHaveTextContent('Chicken');

    const ingredient = await screen.findByTestId('0-ingredient-name-and-measure');
    expect(ingredient).toHaveTextContent('soy sauce');
  });
});
