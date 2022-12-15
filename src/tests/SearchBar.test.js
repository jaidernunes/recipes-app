import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';
import RecipesProvider from '../context/RecipesProvider';
import chickenSearch from './mocks/chickenSearch';
import oneMeal from './mocks/oneMeal';
import emptyMeals from '../../cypress/mocks/emptyMeals';
import drinksByIngredient from '../../cypress/mocks/drinksByIngredient';
import emptyDrinks from '../../cypress/mocks/emptyDrinks';

const searchTopBtn = 'search-top-btn';
const searchInput = 'search-input';
const execSearchBtn = 'exec-search-btn';
const primeiraLetra = 'Primeira Letra';

describe('<Search Bar />', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('realiza uma pesquisa de primeira letr em meals', async () => {
    const { history, getByRole } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(chickenSearch),
    });

    const showSearchBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(showSearchBtn);
    const searchBar = screen.getByTestId(searchInput);
    expect(searchBar).toBeInTheDocument();
    const ingredientRadio = screen.getByLabelText(primeiraLetra);
    // expect(checkedRadio.value).toBe('i');
    const execSearch = screen.getByTestId(execSearchBtn);
    expect(ingredientRadio).toBeInTheDocument();
    userEvent.type(searchBar, 'c');
    userEvent.click(ingredientRadio);
    const checkedRadio = getByRole('radio', { checked: true });
    expect(checkedRadio.value).toBe('f');
    userEvent.click(execSearch);
    const firstRecipe = await screen.findByText('Chicken Alfredo Primavera');
    expect(firstRecipe).toBeInTheDocument();
  });

  test('realiza uma pesquisa de nome em meals', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });

    const showSearchBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(showSearchBtn);
    const searchBar = screen.getByTestId(searchInput);
    expect(searchBar).toBeInTheDocument();
    const ingredientRadio = screen.getByLabelText('Nome');
    const execSearch = screen.getByTestId(execSearchBtn);
    expect(ingredientRadio).toBeInTheDocument();
    userEvent.type(searchBar, 'Brown Stew');
    userEvent.click(ingredientRadio);
    act(() => userEvent.click(execSearch));
    waitFor(() => expect(history.location.pathname).toBe('/meals/52771'));
    console.log(history.location);
  });

  test('realiza uma pesquisa de ingrediente em meals', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(chickenSearch),
    });

    const showSearchBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(showSearchBtn);
    const searchBar = screen.getByTestId(searchInput);
    expect(searchBar).toBeInTheDocument();
    const ingredientRadio = screen.getByLabelText('Ingredient');
    const execSearch = screen.getByTestId(execSearchBtn);
    expect(ingredientRadio).toBeInTheDocument();
    userEvent.type(searchBar, 'chicken');
    userEvent.click(ingredientRadio);
    userEvent.click(execSearch);
    const firstRecipe = await screen.findByText('Chicken & mushroom Hotpot');
    expect(firstRecipe).toBeInTheDocument();
  });

  test('se um alert aparece se tem mais de uma letra em meals', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    window.alert = jest.fn();

    const showSearchBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(showSearchBtn);
    const searchBar = screen.getByTestId(searchInput);
    expect(searchBar).toBeInTheDocument();
    const ingredientRadio = screen.getByLabelText(primeiraLetra);
    const execSearch = screen.getByTestId(execSearchBtn);
    expect(ingredientRadio).toBeInTheDocument();
    userEvent.type(searchBar, 'chicken');
    userEvent.click(ingredientRadio);
    userEvent.click(execSearch);
    expect(window.alert).toHaveBeenCalled();
  });

  test('realiza uma pesquisa sem resultado em meals', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );

    act(() => {
      history.push('/meals');
    });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(emptyMeals),
    });
    const showSearchBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(showSearchBtn);
    const searchBar = screen.getByTestId(searchInput);
    expect(searchBar).toBeInTheDocument();
    const ingredientRadio = screen.getByLabelText('Ingredient');
    const execSearch = screen.getByTestId(execSearchBtn);
    expect(ingredientRadio).toBeInTheDocument();
    userEvent.type(searchBar, 'chicken');
    expect(searchBar.value).toBe('chicken');
    userEvent.click(ingredientRadio);
    act(() => userEvent.click(execSearch));
    waitFor(() => expect(global.alert).toBeCalledWith('Sorry, we haven\'t found any recipes for these filters.'));
  });

  test('realiza uma pesquisa de primeira letr em drinks', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );

    act(() => {
      history.push('/drinks');
    });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinksByIngredient),
    });

    const showSearchBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(showSearchBtn);
    const searchBar = screen.getByTestId(searchInput);
    expect(searchBar).toBeInTheDocument();
    const ingredientRadio = screen.getByLabelText(primeiraLetra);
    const execSearch = screen.getByTestId(execSearchBtn);
    expect(ingredientRadio).toBeInTheDocument();
    userEvent.type(searchBar, 'c');
    userEvent.click(ingredientRadio);
    userEvent.click(execSearch);
    const firstRecipe = await screen.findByText('Bacardi Cocktail');
    expect(firstRecipe).toBeInTheDocument();
  });

  test('realiza uma pesquisa sem resultado em meals', async () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <App />
      </RecipesProvider>,
    );

    act(() => {
      history.push('/drinks');
    });

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(emptyDrinks),
    });
    const showSearchBtn = screen.getByTestId(searchTopBtn);
    userEvent.click(showSearchBtn);
    const searchBar = screen.getByTestId(searchInput);
    expect(searchBar).toBeInTheDocument();
    const ingredientRadio = screen.getByLabelText('Ingredient');
    const execSearch = screen.getByTestId(execSearchBtn);
    expect(ingredientRadio).toBeInTheDocument();
    userEvent.type(searchBar, 'chicken');
    userEvent.click(ingredientRadio);
    act(() => userEvent.click(execSearch));
    waitFor(() => expect(global.alert).toBeCalledWith('Sorry, we haven\'t found any recipes for these filters.'));
  });
});
