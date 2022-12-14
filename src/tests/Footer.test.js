import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import Footer from '../components/Footer';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';

describe('16 - Implemente o menu inferior posicionando-o de forma fixa e contendo 2 ícones: um para comidas e outro para bebidas', () => {
  it('O menu inferior existe e contém os ícones corretos', () => {
    renderWithRouter(
      <RecipesProvider>
        <Footer />
      </RecipesProvider>,
    );
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
    const btnDrinks = screen.getByTestId('drinks-bottom-btn');
    expect(btnDrinks).toBeInTheDocument();
    expect(btnDrinks).toHaveAttribute('src', 'drinkIcon.svg');
    const btnMeals = screen.getByTestId('meals-bottom-btn');
    expect(btnMeals).toBeInTheDocument();
    expect(btnMeals).toHaveAttribute('src', 'mealIcon.svg');
  });
});

describe('17 - Exiba o menu inferior apenas nas telas indicadas pelo protótipo', () => {
  it('Rota "/meals": deve ter footer', () => {
    renderWithRouter(
      <RecipesProvider>
        <Meals />
      </RecipesProvider>,
    );
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('Rota "/drinks": deve ter footer', () => {
    renderWithRouter(
      <RecipesProvider>
        <Drinks />
      </RecipesProvider>,
    );
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });

  it('Rota "/profile": deve ter footer', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );
    act(() => { history.push('/profile'); });
    expect(await screen.findByTestId('footer')).toBeInTheDocument();
  });
});

describe('18 - Redirecione a pessoa usuária para a tela correta ao clicar em cada ícone no menu inferior', () => {
  it('Redireciona para a lista de bebidas ao clicar no ícone de bebidas', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Meals />
      </RecipesProvider>,
    );
    const btnDrinks = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(btnDrinks);
    act(() => history.push('/drinks'));
    expect(history.location.pathname).toBe('/drinks');
  });

  it('Redireciona para a lista de comidas ao clicar no ícone de comidas', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <Meals />
      </RecipesProvider>,
    );
    const btnMeals = screen.getByTestId('meals-bottom-btn');
    userEvent.click(btnMeals);
    act(() => history.push('/Meals'));
    expect(history.location.pathname).toBe('/Meals');
  });
});
