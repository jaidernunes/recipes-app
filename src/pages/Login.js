import React, { useState } from 'react';
import { useEffect } from 'react';

function Login() {
  const [loginValidator, setLoginValidator ] = useState('disabled');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const handleLoginValidator = () => {
      const minimumPassword = 6;
      const emailValidator = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
      
      if (emailValidator.test(email) && password.length > minimumPassword) {
        setLoginValidator(false);
      } else {
        setLoginValidator('disabled');
      }
    };

    handleLoginValidator()
  }, [email, password]);

  return (
    <>
      <h1>Login</h1>
      <form action="">
        <input type="text" name="emailInput" id="emailInput" data-testid="email-input" 
        onChange={({target}) => setEmail(target.value) }/>
        <input type="password" name="passwordInput" id="passwordInput" data-testid="password-input"
        onChange={({target}) => setPassword(target.value) }/>
        <button name="loginSubmitBtn" data-testid="login-submit-btn" disabled={loginValidator}
        >ENTER</button>
      </form>
    </>
  );
};

export default Login;
