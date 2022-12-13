import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <div data-testid="footer">
      <button
        type="button"
        onClick={ () => history.push('/drinks') }
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drinkIcon"
        />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/meals') }
      >
        <img
          data-testid="meals-bottom-btn"
          src={ mealIcon }
          alt="mealIcon"
        />
      </button>
    </div>
  );
}

export default Footer;
