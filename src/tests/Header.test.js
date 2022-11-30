import { act, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

describe('<Header />', () => {
  test('se aperece o titulo Meals na rota /meals', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/meals');
    });

    const title = screen.getAllByText('Meals');
    expect(title).toBeInTheDocument();
  });
});
