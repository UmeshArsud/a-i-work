import React, { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // 1. Check if the user has a token in localStorage
  // (Make sure you set this 'token' key in your SignIn component upon success)
  const isAuthenticated = localStorage.getItem('token');

  if (!isAuthenticated) {
    // 'replace' prevents them from clicking back to return to the protected page
    return <Navigate to="/signin" replace />;
  }

  // 3. If logged in, render the child component (Dashboard)
  return <>{children}</>;
};

export default ProtectedRoute;