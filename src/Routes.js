import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Profile from './pages/Profile';

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      <Route path="/meals">
        <Meals />
      </Route>
      <Route path="/drinks">
        <Drinks />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
      <Route path="/done-recipes">
        <DoneRecipes />
      </Route>
      <Route path="/favorite-recipes">
        <FavoriteRecipes />
      </Route>
    </Switch>
  );
}

export default Routes;
