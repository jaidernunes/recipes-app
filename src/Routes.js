import React from 'react';
import { Route, Switch } from 'react-router-dom';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Login from './pages/Login';
import Meals from './pages/Meals';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
import RecipeInProgress from './pages/RecipeInProgress';

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      <Route exact path="/meals/:id">
        <RecipeDetails />
      </Route>
      <Route exact path="/drinks/:id">
        <RecipeDetails />
      </Route>
      <Route exact path="/meals/:id/in-progress">
        <RecipeInProgress />
      </Route>
      <Route exact path="/drinks/:id/in-progress">
        <RecipeInProgress />
      </Route>
      <Route exact path="/meals">
        <Meals />
      </Route>
      <Route exact path="/drinks">
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
