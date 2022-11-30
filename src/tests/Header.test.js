import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWithRouter';

const VALID_EMAIL = 'alguem@email.com';
const VALID_PASSWORD = '12345678';

describe('<Header />', () => {
  test('se aperece o titulo Meals na rota /meals', () => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputSenha = screen.getByTestId('password-input');
    const buttonLogin = screen.getByTestId('login-submit-btn');
    userEvent.type(inputEmail, VALID_EMAIL);
    userEvent.type(inputSenha, VALID_PASSWORD);
    userEvent.click(buttonLogin);
    act(() => history.push('/meals'));

    const title = screen.getByTestId('page-title');
    expect(title).toBeInTheDocument();
  });
});
