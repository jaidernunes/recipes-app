import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import rockGlass from './images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';

function App() {
  return (
    <BrowserRouter>
      <h1>Vamo timee!</h1>
      <Routes></Routes>
    </BrowserRouter>
  );
}

export default App;
