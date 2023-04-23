import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import logoRecipesApp from '../images/logoRecipesApp.svg';
import tomate from '../images/tomate.png';

function Login() {
  const [loginValidator, setLoginValidator] = useState('disabled');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  useEffect(() => {
    const handleLoginValidator = () => {
      const minimumPassword = 6;
      const emailValidator = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
      if (emailValidator.test(email) && password.length >= minimumPassword) {
        setLoginValidator(false);
      } else {
        setLoginValidator('disabled');
      }
    };

    handleLoginValidator();
  }, [email, password]);

  const handleLogin = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  const handleKeyPress = useCallback((event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // prevent the default form submission
      if (!loginValidator) { // check if the login button is enabled
        handleLogin(); // call the handleLogin function
      }
    }
  }, [loginValidator, handleLogin]);

  return (
    <div className="container">
      <div className="square-purple">
        <img
          src={ logoRecipesApp }
          alt="app de receitas logo"
          className="logo"
        />
        <img
          src={ tomate }
          alt="tomate"
          className="tomato-image"
        />
      </div>
      <h1 className="login-title">Login</h1>
      <form action="" className="form-login">
        <input
          className="input-email"
          type="text"
          name="emailInput"
          id="emailInput"
          data-testid="email-input"
          placeholder="Insert valid email"
          onChange={ ({ target }) => setEmail(target.value) }
        />

        <input
          className="input-password"
          type="password"
          name="passwordInput"
          id="passwordInput"
          data-testid="password-input"
          placeholder="Insert 6 digit password"
          onChange={ ({ target }) => setPassword(target.value) }
          onKeyPress={ handleKeyPress }
        />
        <button
          className="button-submit"
          type="button"
          name="loginSubmitBtn"
          data-testid="login-submit-btn"
          disabled={ loginValidator }
          onClick={ handleLogin }
        >
          ENTER
        </button>
      </form>
    </div>
  );
}

export default Login;
