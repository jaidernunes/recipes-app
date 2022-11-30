import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import App from '../App';
// import Routes.js from '../Routes.js'

describe('Testa a tela de login', () => {
  const testEmail = 'tryber@teste.com';
  const testPassword = '12345678';

  const email = 'email-input';
  const password = 'password-input';
  test('1. Testa se renderiza os inputs corretamente', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );

    const inputEmail = screen.getByTestId(email);
    const inputPassword = screen.getByTestId(password);

    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });

  test('2. Testa se renderiza o botão', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );

    const button = screen.getByTestId('login-submit-btn');

    expect(button).toBeInTheDocument();
  });

  test('3. Testa se dá para modificar os valores do input', () => {
    renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );

    const inputEmail = screen.getByTestId(email);
    const inputPassword = screen.getByTestId(password);

    act(() => {
      userEvent.type(inputEmail, testEmail);
      userEvent.type(inputPassword, testPassword);
    });

    expect(inputEmail).toHaveValue(testEmail);
    expect(inputPassword).toHaveValue(testPassword);
  });

  test('4. Testa se ao clicar no botão redireciona para a página "/meals"', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );

    expect(history.location.pathname).toBe('/');

    const inputEmail = screen.getByTestId(email);
    userEvent.type(inputEmail, testEmail);
    const inputPassword = screen.getByTestId(password);
    userEvent.type(inputPassword, testPassword);
    const button = screen.getByTestId('login-submit-btn');
    userEvent.click(button);

    expect(history.location.pathname).toBe('/meals');
  });
});
