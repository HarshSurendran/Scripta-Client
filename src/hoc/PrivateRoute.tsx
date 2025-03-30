import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

interface PrivateRoute {
    component: React.ComponentType;
  }

const PrivateRoute: React.FC<PrivateRoute> = ({ component: Component }) => {
    const  user = useSelector((state: any) => state.user);
    return user.isAuthenticated && user._id? <Component /> : <Navigate to="/login" />;
}

export default PrivateRoute