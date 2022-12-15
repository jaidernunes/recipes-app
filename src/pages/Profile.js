import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Profile.css';
import DoneRecipes from '../images/Profile/DoneRecipes.png';
import Favorite from '../images/Profile/Favorite.png';
import Logout from '../images/Profile/Logout.png';

function Profile() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'))?.email;

  const clear = () => {
    history.push('/');
    localStorage.clear();
  };

  return (
    <div className="profile">
      <Header />
      <p data-testid="profile-email" className="email">{user}</p>
      <div className="links">
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
          className="btndone"
        >
          <img src={ DoneRecipes } alt="DoneRecipes" />
          {' '}
          Done Recipes
        </button>
        <hr className="line" />
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
          className="btnfavorites"
        >
          <img src={ Favorite } alt="Favorite" />
          {' '}
          Favorite Recipes
        </button>
        <hr className="line" />
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ clear }
          className="btnlogout"
        >
          <img src={ Logout } alt="Logout" />
          {' '}
          Logout
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
