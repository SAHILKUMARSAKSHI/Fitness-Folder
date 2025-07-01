import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// This component checks if the user is logged in
// If they are, it renders the children components
// If not, it redirects to the home page with a login prompt
const ProtectedRoute = ({ children, isLoggedIn }) => {
  const location = useLocation();

  // If not logged in, redirect to home page
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  // If logged in, render the children components
  return children;
};

export default ProtectedRoute;
