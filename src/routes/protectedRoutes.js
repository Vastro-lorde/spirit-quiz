import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { checkToken } from '../services/hooks';


export const ProtectedRoutes = () => {
  return (checkToken()?
    <Outlet/>
    : <Navigate to="/"/>
  )
}
