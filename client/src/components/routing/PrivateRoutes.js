import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from '../layouts/Spinner';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userAuth = useSelector(state => state.auth);
  const { isAuthenticated, loading } = userAuth;

  return (
    <Route
      {...rest}
      render={props =>
        loading ? (
          <Spinner />
        ) : !loading && isAuthenticated ? (
          <Component {...props} />
        ) : (
          // when logging out redirect to...
          <Navigate to="/" />
        )
      }
    />
  );
};
export default PrivateRoute;