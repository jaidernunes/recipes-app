import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('<Search Bar />', () => {
  test('se a barra de busca aparece ao clicar no icone e realiza uma pesquisa de ingrediente', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });
    const showSearchBtn = screen.getByTestId('search-top-btn');
    userEvent.click(showSearchBtn);
    const searchBar = screen.getByTestId('search-input');
    expect(searchBar).toBeInTheDocument();
    const ingredientRadio = screen.getByLabelText('Ingredient');
    const execSearch = screen.getByTestId('exec-search-btn');
    expect(ingredientRadio).toBeInTheDocument();
    userEvent.type(searchBar, 'beef');
    userEvent.click(ingredientRadio);
    userEvent.click(execSearch);
  });
});
