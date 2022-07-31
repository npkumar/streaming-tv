import React from 'react';
import './App.css';
import HomePage from './pages/Homepage';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import MoviePage from './pages/MoviePage';
import NotFound from './pages/NotFound';
import MovieStreamsPage from './pages/MovieStreamsPage';
import Navbar from './pages/components/Navbar';

function App() {
  return (
      <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route
                path="/movies/:id"
                render={({ match }) => <MoviePage id={match.params.id} />}
            />
            <Route
                path="/streams/movies/:id"
                render={({ match }) => <MovieStreamsPage id={match.params.id} />}
            />
            <Route>
              <NotFound />
            </Route>
          </Switch>
      </BrowserRouter>
  );
}

export default App;
