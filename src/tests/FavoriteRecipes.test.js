import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import RecipesProvider from '../context/RecipesProvider';

const spicy = 'Spicy Arrabiata Penne';
const data = '23/06/2020';
const horizontalImage = '0-horizontal-image';
const horizontalName = '0-horizontal-name';
const horizontalShare = '0-horizontal-share-btn';
const horizontalTopText = '0-horizontal-top-text';
const horizontalImage1 = '1-horizontal-image';
const horizontalTopText1 = '1-horizontal-top-text';
const horizontalName1 = '1-horizontal-name';
const imagem = 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg';
const favoriteRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: spicy,
    image: imagem,
    doneDate: data,
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];
const favoriteMeal = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: spicy,
    image: imagem,
    doneDate: data,
    tags: ['Pasta', 'Curry'],
  },
];
localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));

describe('1 - Implemente os elementos da tela de receitas favoritas (cumulativo com os atributos em comum com a tela de receitas feitas), respeitando os atributos descritos no protótipo', () => {
  it('Todos os data-testids, cumulativo com os atributos em comum com a tela de receitas feitas, estão disponíveis', () => {
    renderWithRouter(
      <RecipesProvider>
        <FavoriteRecipes />
      </RecipesProvider>,
    );

    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-meal-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
    expect(screen.getByTestId(horizontalImage)).toBeInTheDocument();
    expect(screen.getByTestId(horizontalTopText)).toBeInTheDocument();
    expect(screen.getByTestId(horizontalName)).toBeInTheDocument();
    expect(screen.getByTestId(horizontalShare)).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId(horizontalImage1)).toBeInTheDocument();
    expect(screen.getByTestId(horizontalTopText1)).toBeInTheDocument();
    expect(screen.getByTestId(horizontalName1)).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-favorite-btn')).toBeInTheDocument();
  });
});

describe('2 - Desenvolva a tela de modo que, caso a receita do card seja uma comida, ela deve possuir: a foto da receita,  nome, categoria, nacionalidade, um botão de compartilhar e um de "desfavoritar"', () => {
  it('O card possui os atributos corretos de uma comida', () => {
    renderWithRouter(
      <RecipesProvider>
        <FavoriteRecipes />
      </RecipesProvider>,
    );
    expect(screen.getByTestId(horizontalImage)).toHaveAttribute('src', imagem);
    expect(screen.getByTestId(horizontalTopText)).toHaveTextContent('Italian');
    expect(screen.getByTestId(horizontalName)).toHaveTextContent(spicy);
    expect(screen.getByTestId(horizontalShare)).toHaveAttribute('src', 'shareIcon.svg');
    expect(screen.getByTestId('0-horizontal-favorite-btn')).toHaveAttribute('src', 'blackHeartIcon.svg');
  });
});

describe('3 - Desenvolva a tela de modo que, caso a receita do card seja uma bebida, ela deve possuir: a foto da receita,  nome, se é alcoólica ou não, um botão de compartilhar e um de "desfavoritar"', () => {
  it('O card possui os atributos corretos de uma bebida', () => {
    renderWithRouter(
      <RecipesProvider>
        <FavoriteRecipes />
      </RecipesProvider>,
    );
    expect(screen.getByTestId(horizontalImage1)).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    expect(screen.getByTestId(horizontalTopText1)).toHaveTextContent('Alcoholic');
    expect(screen.getByTestId(horizontalName1)).toHaveTextContent('Aquamarine');
    expect(screen.getByTestId('1-horizontal-share-btn')).toHaveAttribute('src', 'shareIcon.svg');
    expect(screen.getByTestId('1-horizontal-favorite-btn')).toHaveAttribute('src', 'blackHeartIcon.svg');
  });
});

describe('4 - Desenvolva a solução de modo que o botão de compartilhar deve copiar a URL da tela de detalhes da receita para o clipboard', () => {
  it('Ao clicar no botão de compartilhar deve aparecer a mensagem "Link copied!"', () => {
    window.document.execCommand = jest.fn(() => true);
    renderWithRouter(
      <RecipesProvider>
        <FavoriteRecipes />
      </RecipesProvider>,
    );
    const buttonShare = screen.getByTestId(horizontalShare);
    userEvent.click(buttonShare);
    const msg = screen.getAllByText(/Link copied!/i);
    waitFor(() => expect(msg).toBeInTheDocument());
  });
});

describe('5 - Implemente 2 botões que filtram as receitas por comida ou bebida e um terceiro que remove todos os filtros', () => {
  it('Ao clicar no botão "Meal" as receitas devem ser filtradas por comidas', () => {
    renderWithRouter(
      <RecipesProvider>
        <FavoriteRecipes />
      </RecipesProvider>,
    );
    const buttonMeal = screen.getByTestId('filter-by-meal-btn');
    userEvent.click(buttonMeal);
    expect(screen.getByTestId(horizontalTopText)).toBeInTheDocument();
  });

  it('Ao clicar no botão "Drinks" as receitas devem ser filtradas por bebidas', () => {
    renderWithRouter(
      <RecipesProvider>
        <FavoriteRecipes />
      </RecipesProvider>,
    );
    const buttonDrink = screen.getByTestId('filter-by-drink-btn');
    userEvent.click(buttonDrink);
    expect(screen.getByTestId(horizontalTopText)).not.toBe();
    expect(screen.getByText('Alcoholic')).toBeInTheDocument();
  });

  it('Ao clicar no botão "All" o filtro deve ser removido', () => {
    renderWithRouter(
      <RecipesProvider>
        <FavoriteRecipes />
      </RecipesProvider>,
    );
    const buttonAll = screen.getByTestId('filter-by-all-btn');
    userEvent.click(buttonAll);
    expect(screen.getByTestId(horizontalTopText)).toBeInTheDocument();
    expect(screen.getByTestId(horizontalTopText1)).toBeInTheDocument();
  });
});

describe('6 - Redirecione a pessoa usuária ao clicar na foto ou no nome da receita, a rota deve mudar para a tela de detalhes daquela receita', () => {
  it('Ao clicar na foto da receita, a rota deve mudar para a tela de detalhes daquela receita', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <FavoriteRecipes />
      </RecipesProvider>,
    );
    const ImagemMeal = screen.getByTestId(horizontalImage);
    userEvent.click(ImagemMeal);
    act(() => history.push('/meals/52771'));
    expect(history.location.pathname).toBe('/meals/52771');
    expect(screen.getByText('Spicy Arrabiata Penne')).toBeInTheDocument();
  });

  it('Ao clicar no nome da receita, a rota deve mudar para a tela de detalhes daquela receita', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <FavoriteRecipes />
      </RecipesProvider>,
    );
    const ImagemMeal = screen.getByTestId(horizontalName1);
    userEvent.click(ImagemMeal);
    act(() => history.push('/drinks/178319'));
    expect(history.location.pathname).toBe('/drinks/178319');
    expect(screen.getByText('Aquamarine')).toBeInTheDocument();
  });
});

describe('7 - Desenvolva a solução de modo que o botão de "desfavoritar" deve remover a receita da lista de receitas favoritas do `localStorage` e da tela', () => {
  it('Ao clicar no botão de "desfavoritar" a respectiva receita é removida da tela', () => {
    renderWithRouter(
      <RecipesProvider>
        <FavoriteRecipes />
      </RecipesProvider>,
    );
    const buttonFavorite = screen.getByTestId('0-button-favorite');
    userEvent.click(buttonFavorite);
    expect(screen.getByTestId('0-horizontal-image')).not.toBe();
    const buttonFavorite1 = screen.getByTestId('1-button-favorite');
    userEvent.click(buttonFavorite1);
    expect(screen.getByTestId(horizontalImage1)).not.toBe();
  });

  it('Ao clicar no botão de "desfavoritar" a respectiva receita é removida do localStorage', () => {
    renderWithRouter(
      <RecipesProvider>
        <FavoriteRecipes />
      </RecipesProvider>,
    );
    expect(JSON.parse(window.localStorage.getItem('favoriteRecipes'))).toEqual(favoriteMeal);

    const buttonFavorite = screen.getByTestId('0-button-favorite');
    userEvent.click(buttonFavorite);
    expect(JSON.parse(window.localStorage.getItem('favoriteRecipes'))).toEqual([]);
  });
});
