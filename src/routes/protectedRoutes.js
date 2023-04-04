import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getUser } from '../services/hooks';


export const ProtectedRoutes = () => {
  return (getUser()?
    <Outlet/>
    : <Navigate to="/"/>
  )
}
