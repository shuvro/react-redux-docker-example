import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import ROUTES from '../utils/routes';


const PrivateRoute = ({ component: Component, auth, path }) => {
  let isAuthenticated = false;
  if (auth.loginToken && auth.otpToken && auth.tokenExpiredAt && auth.tokenExpiredAt > new Date()) {
    // if (true) {
    isAuthenticated = true;
  }
  return (
    <Route exact path={path} render={props => (isAuthenticated ? <Component {...props} /> : <Redirect to={ROUTES.LOG_IN} />)} />
  )
}

export default withRouter(PrivateRoute);
