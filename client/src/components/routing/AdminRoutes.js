import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Spinner from '../layouts/Spinner';

const AdminRoute = ({ component: Component, ...rest }) => {
  const userAuth = useSelector(state => state.auth);
  const { isAuthenticated, userInfo, loading } = userAuth;
  if (loading) return <main className='container'><Spinner /></main>;

  return isAuthenticated && userInfo && userInfo.role === 'admin' ? <main className='container'><Component {...rest} /></main> : <Navigate to="/login" />;

};
export default AdminRoute;