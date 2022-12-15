import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const VALID_EMAIL = 'alguem@email.com';
const VALID_PASSWORD = '12345678';

describe('1 - Implemente os elementos da tela de perfil respeitando os atributos descritos no protótipo', () => {
  it('Todos o data-testid do email e de todos os botões', () => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputSenha = screen.getByTestId('password-input');
    const buttonLogin = screen.getByTestId('login-submit-btn');
    userEvent.type(inputEmail, VALID_EMAIL);
    userEvent.type(inputSenha, VALID_PASSWORD);
    userEvent.click(buttonLogin);
    act(() => history.push('/meals'));

    const buttonProfile = screen.getByTestId('profile-top-btn');
    userEvent.click(buttonProfile);
    act(() => history.push('/profile'));

    const dataTestidEmail = screen.getByTestId('profile-email');
    expect(dataTestidEmail).toBeInTheDocument();
    const dataTestidDone = screen.getByTestId('profile-done-btn');
    expect(dataTestidDone).toBeInTheDocument();
    const dataTestidFavorite = screen.getByTestId('profile-favorite-btn');
    expect(dataTestidFavorite).toBeInTheDocument();
    const dataTestidLogout = screen.getByTestId('profile-logout-btn');
    expect(dataTestidLogout).toBeInTheDocument();
  });
});

describe('2 - Implemente a solução de maneira que o e-mail da pessoa usuária deve estar visível', () => {
  it('O e-mail armazenado em localStorage está visível', () => {
    renderWithRouter(<Profile />);
    const dataTestidEmail = screen.getByTestId('profile-email');
    expect(dataTestidEmail).toBeVisible();
  });
});

describe('3 - Implemente 3 botões: um de nome "Done Recipes", um de nome "Favorite Recipes" e um de nome "Logout"', () => {
  it('A tela contêm todos os 3 botões', () => {
    renderWithRouter(<Profile />);
    const buttonDone = screen.getByTestId('profile-done-btn');
    expect(buttonDone).toBeInTheDocument();
    const buttonFavorite = screen.getByTestId('profile-favorite-btn');
    expect(buttonFavorite).toBeInTheDocument();
    const buttonLogout = screen.getByTestId('profile-logout-btn');
    expect(buttonLogout).toBeInTheDocument();
  });
});

describe('4 - Redirecione a pessoa usuária que, ao clicar no botão de "Done Recipes", a rota deve mudar para a tela de receitas feitas', () => {
  it('Redireciona para a rota correta', () => {
    const { history } = renderWithRouter(<Profile />);
    const buttonDone = screen.getByTestId('profile-done-btn');
    userEvent.click(buttonDone);
    act(() => history.push('/done-recipes'));
    expect(history.location.pathname).toBe('/done-recipes');
  });
});

describe('5 - Redirecione a pessoa usuária que, ao clicar no botão de "Favorite Recipes", a rota deve mudar para a tela de receitas favoritas', () => {
  it('Redireciona para a rota correta', () => {
    const { history } = renderWithRouter(<Profile />);
    const buttonFavorite = screen.getByTestId('profile-favorite-btn');
    userEvent.click(buttonFavorite);
    act(() => history.push('/favorite-recipes'));
    expect(history.location.pathname).toBe('/favorite-recipes');
  });
});

describe('6 - Redirecione a pessoa usuária que ao clicar no botão de "Logout", o `localStorage` deve ser limpo e a rota deve mudar para a tela de login', () => {
  it('A rota muda para a tela de login', () => {
    const { history } = renderWithRouter(<Profile />);
    const buttonLogout = screen.getByTestId('profile-logout-btn');
    userEvent.click(buttonLogout);
    act(() => history.push('/'));
    expect(history.location.pathname).toBe('/');
  });
});
