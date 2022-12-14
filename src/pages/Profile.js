import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('user'))?.email;

  const clear = () => {
    history.push('/');
    localStorage.clear();
  };

  return (
    <div>
      <Header />
      <p data-testid="profile-email">{user}</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ clear }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
