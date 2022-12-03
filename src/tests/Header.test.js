import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('<Header />', () => {
  test('se aperece o titulo Meals na rota /meals', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const title = screen.getAllByText('Meals')[0];
    expect(title).toBeInTheDocument();
  });

  // const title1 = screen.getAllByText('Meals');
  // console.log(title1);

  test('se aperece o titulo Meals na rota /drinks', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/drinks');
    });
    const title2 = screen.getAllByText('Drinks')[0];
    expect(title2).toBeInTheDocument();
  });

  test('se aperece o titulo Meals na rota /done-recipes', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/done-recipes');
    });
    const title3 = screen.getAllByText('Done Recipes')[0];
    expect(title3).toBeInTheDocument();
  });

  test('se aperece o titulo Meals na rota /profile', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/profile');
    });
    const title3 = screen.getAllByText('Profile')[0];
    expect(title3).toBeInTheDocument();
  });

  test('se aperece o titulo Meals na rota /favorite-recipes', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/favorite-recipes');
    });
    const title4 = screen.getAllByText('Favorite Recipes')[0];
    expect(title4).toBeInTheDocument();
  });

  test('se ao clicar no search aparece o input para busca', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const searchIcon = screen.getByTestId('search-top-btn');
    userEvent.click(searchIcon);
    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'comida');
  });
});
