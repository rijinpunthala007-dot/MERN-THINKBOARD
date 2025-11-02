import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../context/UserContext.jsx';

const PrivateRoute = () => {
  const { user } = useUserContext();

  // If the user is logged in, render the child route component
  // Otherwise, redirect them to the login page
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;