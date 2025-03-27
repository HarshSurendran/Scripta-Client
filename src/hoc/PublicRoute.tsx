import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface PublicRoute {
    component: React.ComponentType;
  }

const PublicRoute: React.FC<PublicRoute> = ({ component: Component }) => {
    const isAuthenticated = useSelector((state: any) => state.user.isAuthenticated);
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Component /> 
}

export default PublicRoute