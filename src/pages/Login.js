import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [loginValidator, setLoginValidator] = useState('disabled');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  useEffect(() => {
    const handleLoginValidator = () => {
      const minimumPassword = 6;
      const emailValidator = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/i;
      if (emailValidator.test(email) && password.length > minimumPassword) {
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

  return (
    <>
      <h1>Login</h1>
      <form action="">
        <input
          type="text"
          name="emailInput"
          id="emailInput"
          data-testid="email-input"
          onChange={ ({ target }) => setEmail(target.value) }
        />

        <input
          type="password"
          name="passwordInput"
          id="passwordInput"
          data-testid="password-input"
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <button
          type="button"
          name="loginSubmitBtn"
          data-testid="login-submit-btn"
          disabled={ loginValidator }
          onClick={ handleLogin }
        >
          ENTER
        </button>
      </form>
    </>
  );
}

export default Login;
