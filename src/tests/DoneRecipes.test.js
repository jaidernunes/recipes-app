import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import DoneRecipes from '../pages/DoneRecipes';
import RecipesProvider from '../context/RecipesProvider';

const spicy = 'Spicy Arrabiata Penne';
const data = '23/06/2020';
const horizontalImage = '0-horizontal-image';
const horizontalName = '0-horizontal-name';
const horizontalShare = '0-horizontal-share-btn';
const doneRecipes1 = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: spicy,
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
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
localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes1));

describe('Implemente os elementos da tela de receitas feitas respeitando os atributos descritos no protótipo', () => {
  it('Todos os data-testids estão disponíveis', () => {
    renderWithRouter(
      <RecipesProvider>
        <DoneRecipes />
      </RecipesProvider>,
    );

    expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-meal-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
    expect(screen.getByTestId(horizontalImage)).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(screen.getByTestId(horizontalName)).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-done-date')).toBeInTheDocument();
    expect(screen.getByTestId(horizontalShare)).toBeInTheDocument();
    expect(screen.getByTestId('0-Pasta-horizontal-tag')).toBeInTheDocument();
    expect(screen.getByTestId('0-Curry-horizontal-tag')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-image')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-top-text')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-name')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-done-date')).toBeInTheDocument();
  });
});

describe('Desenvolva a tela de modo que, caso a receita do card seja uma comida, ela deve possuir: a foto da receita,  nome, categoria, nacionalidade, a data em que a pessoa fez a receita, as 2 primeiras tags retornadas pela API e um botão de compartilhar', () => {
  it('O card possui os atributos corretos de uma comida', () => {
    renderWithRouter(
      <RecipesProvider>
        <DoneRecipes />
      </RecipesProvider>,
    );
    expect(screen.getByTestId(horizontalImage)).toHaveAttribute('src', 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg');
    expect(screen.getByTestId('0-horizontal-top-text')).toHaveTextContent('Italian');
    expect(screen.getByTestId(horizontalName)).toHaveTextContent(spicy);
    expect(screen.getByTestId('0-horizontal-done-date')).toHaveTextContent(data);
    expect(screen.getByTestId(horizontalShare)).toHaveAttribute('src', 'shareIcon.svg');
    expect(screen.getByTestId('0-Pasta-horizontal-tag')).toHaveTextContent('Pasta');
    expect(screen.getByTestId('0-Curry-horizontal-tag')).toHaveTextContent('Curry');
  });
});

describe('Desenvolva a tela de maneira que, caso a receita do card seja uma bebida, ela deve possuir: a foto da receita, o nome, se é alcoólica, a data em que a pessoa fez a receita e um botão de compartilhar', () => {
  it('O card possui os atributos corretos de uma bebida', () => {
    renderWithRouter(
      <RecipesProvider>
        <DoneRecipes />
      </RecipesProvider>,
    );
    expect(screen.getByTestId('1-horizontal-image')).toHaveAttribute('src', 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg');
    expect(screen.getByTestId('1-horizontal-top-text')).toHaveTextContent('Alcoholic');
    expect(screen.getByTestId('1-horizontal-name')).toHaveTextContent('Aquamarine');
    expect(screen.getByTestId('1-horizontal-done-date')).toHaveTextContent(data);
    expect(screen.getByTestId('1-horizontal-share-btn')).toHaveAttribute('src', 'shareIcon.svg');
  });
});

describe('Desenvolva a solução de modo que o botão de compartilhar deve copiar a URL da tela de detalhes da receita para o clipboard', () => {
  it('Ao clicar no botão de compartilhar deve aparecer a mensagem "Link copied!"', () => {
    window.document.execCommand = jest.fn(() => true);
    renderWithRouter(
      <RecipesProvider>
        <DoneRecipes />
      </RecipesProvider>,
    );
    const buttonShare = screen.getByTestId(horizontalShare);
    userEvent.click(buttonShare);
    const msg = screen.getAllByText(/Link copied!/i);
    waitFor(() => expect(msg).toBeInTheDocument());
  });

//   it('A URL da tela de detalhes da receita é copiada para o clipboard', () => {
//     renderWithRouter(
//       <RecipesProvider>
//         <DoneRecipes />
//       </RecipesProvider>,
//     );
//   });
});

describe('Implemente 2 botões que filtram as receitas por comida ou bebida e um terceiro que remove todos os filtros', () => {
  it('Ao clicar no botão "Meal" as receitas devem ser filtradas por comidas', () => {
    renderWithRouter(
      <RecipesProvider>
        <DoneRecipes />
      </RecipesProvider>,
    );
    const meals = screen.getByText('Meals');
    userEvent.click(meals);

    expect(screen.getByText(spicy)).toBeInTheDocument();
  });

  it('Ao clicar no botão "Drinks" as receitas devem ser filtradas por bebidas', () => {
    renderWithRouter(
      <RecipesProvider>
        <DoneRecipes />
      </RecipesProvider>,
    );
    const drinks = screen.getByText('Drinks');
    userEvent.click(drinks);
    const aquamarine = screen.getByText('Aquamarine');
    expect(aquamarine).toBeInTheDocument();
  });

  it('Ao clicar no botão "All" o filtro deve ser removido', () => {
    renderWithRouter(
      <RecipesProvider>
        <DoneRecipes />
      </RecipesProvider>,
    );
    const buttonAll = screen.getByTestId('filter-by-all-btn');
    userEvent.click(buttonAll);
    expect(screen.getByText(spicy)).toBeInTheDocument();
    expect(screen.getByText('Aquamarine')).toBeInTheDocument();
  });
});

describe('Redirecione para a tela de detalhes da receita caso seja clicado na foto ou no nome da receita', () => {
  it('Ao clicar na foto da receita, a rota deve mudar para a tela de detalhes daquela receita', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <DoneRecipes />
      </RecipesProvider>,
    );
    const buttonImg = screen.getByTestId(horizontalImage);
    userEvent.click(buttonImg);
    act(() => history.push('/meals/52771'));

    const pageTitle = screen.getByText('Meals');
    expect(pageTitle).toBeInTheDocument();
  });

  it('Ao clicar no nome da receita, a rota deve mudar para a tela de detalhes daquela receita', () => {
    const { history } = renderWithRouter(
      <RecipesProvider>
        <DoneRecipes />
      </RecipesProvider>,
    );
    const buttonName = screen.getByTestId(horizontalName);
    userEvent.click(buttonName);
    act(() => history.push('/meals/52771'));
    const pageTitle = screen.getByText('Meals');
    expect(pageTitle).toBeInTheDocument();
  });
});
