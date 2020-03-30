import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

// import AboutPage from '../AboutPage/AboutPage';
import InfoPage from '../pages/InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../pages/LoginPage/LoginPage';
import RegisterPage from '../pages/RegisterPage/RegisterPage';
import ColorsPage from '../pages/ColorsPage/ColorsPage';
import BlocksPage from '../pages/BlocksPage/BlocksPage';
import AdminPage from '../Admin/AdminPage';
import UserPage from '../pages/UserPage/UserPage';
import ColorsSearchResultsPage from '../pages/ColorsPage/SearchResultsPage';


import './App.css';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#f0ad43'
    },
    secondary: {
      main: '#cb3e4b'
    }
  }
});

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <div>
            <Nav />
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
              <Redirect exact from="/" to="/home" />

              <Route
                exact
                path="/home"
                component={LandingPage}
              />
              {/* <Route
                exact
                path="/registration"
                component={RegisterPage}
                /> */}
              {/* For protected routes, the view could show one of several things on the same route.
              Visiting localhost:3000/user will show the UserPage if the user is logged in.
              If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
              Even though it seems like they are different pages, the user is always on localhost:3000/user */}
              <ProtectedRoute
                exact
                path="/admin"
                component={AdminPage}
              />
              <ProtectedRoute
                exact
                path="/colors"
                component={ColorsPage}
              />
              <ProtectedRoute
                exact
                path="/colorsSearchResults"
                component={ColorsSearchResultsPage}
              />
              <ProtectedRoute
                exact
                path="/blocks"
                component={BlocksPage}
              />
              <ProtectedRoute
                exact
                path="/user"
                component={UserPage}
              />
              <ProtectedRoute
                exact
                path="/info"
                component={InfoPage}
              />
              {/* This works the same as the other protected route, except that if the user is logged in,
              they will be redirected to the authRedirect path provided. */}
              <ProtectedRoute
                exact
                path="/login"
                authRedirect="/admin"
                component={LoginPage}
              />
              <ProtectedRoute
                exact
                path="/registration"
                authRedirect="/admin"
                component={RegisterPage}
              />
               {/* <ProtectedRoute
                exact
                path="/user"
                authRedirect="/admin"
                component={UserPage}
              /> */}
              {/* If none of the other routes matched, we will show a 404. */}
              <Route render={() => <h1>404</h1>} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
  )}
}

export default connect()(App);
