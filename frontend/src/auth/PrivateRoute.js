import { Children } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export const PrivateRoute = ( { Children }) => {
    const authToken = localStorage.getItem('authToken');

    if(!authToken){
        return  <Navigate to="/login" />
    }
    return Children ? Children : <Outlet />
}