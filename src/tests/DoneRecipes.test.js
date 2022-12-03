import { screen } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
// import userEvent from '@testing-library/user-event';
// import Profile from '../pages/Profile';
// import App from '../App';
import DoneRecipes from '../pages/DoneRecipes';
// import renderWithRouter from './helpers/renderWithRouter';
import RecipesContext from '../context/RecipesContext';

const doneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
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

describe('44 - Implemente os elementos da tela de receitas feitas respeitando os atributos descritos no protótipo', () => {
  it('Todos os data-testids estão disponíveis', async () => {
    // renderWithRouter(<DoneRecipes />);
    <RecipesContext.Provider value={ doneRecipes }>
      <DoneRecipes />
    </RecipesContext.Provider>;
    expect(await screen.findByTestId('filter-by-all-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-meal-btn')).toBeInTheDocument();
    expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
    expect(screen.getByTestId('horizontal-image')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-name')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-done-date')).toBeInTheDocument();
    expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('0-Pasta-horizontal-tag')).toBeInTheDocument();
    expect(screen.getByTestId('0-Curry-horizontal-tag')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-image')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-top-text')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-name')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('1-horizontal-done-date')).toBeInTheDocument();
  });
});

// describe('45 - Desenvolva a tela de modo que, caso a receita do card seja uma comida, ela deve possuir: a foto da receita,  nome, categoria, nacionalidade, a data em que a pessoa fez a receita, as 2 primeiras tags retornadas pela API e um botão de compartilhar', () => {
//   it('O card possui os atributos corretos de uma comida', () => {
//   });
// });

// describe('46 - Desenvolva a tela de maneira que, caso a receita do card seja uma bebida, ela deve possuir: a foto da receita, o nome, se é alcoólica, a data em que a pessoa fez a receita e um botão de compartilhar', () => {
//   it('O card possui os atributos corretos de uma bebida', () => {
//   });

//   it('Verifica a cobertura de 45% da tela de Receitas Feitas', () => {
//   });
// });

// describe('47 - Desenvolva a solução de modo que o botão de compartilhar deve copiar a URL da tela de detalhes da receita para o clipboard', () => {
//   it('Ao clicar no botão de compartilhar deve aparecer a mensagem "Link copied!"', () => {
//   });

//   it('A URL da tela de detalhes da receita é copiada para o clipboard', () => {
//   });
// });

// describe('48 - Implemente 2 botões que filtram as receitas por comida ou bebida e um terceiro que remove todos os filtros', () => {
//   it('Ao clicar no botão "Meal" as receitas devem ser filtradas por comidas', () => {
//   });

//   it('Ao clicar no botão "Drinks" as receitas devem ser filtradas por bebidas', () => {
//   });

//   it('Ao clicar no botão "All" o filtro deve ser removido', () => {
//   });
// });

// describe('49 - Redirecione para a tela de detalhes da receita caso seja clicado na foto ou no nome da receita', () => {
//   it('Ao clicar na foto da receita, a rota deve mudar para a tela de detalhes daquela receita', () => {
//   });

//   it('Ao clicar no nome da receita, a rota deve mudar para a tela de detalhes daquela receita', () => {
//   });

//   it('Verifica a cobertura de 90% da tela de Receitas Feitas', () => {
//   });
// });
