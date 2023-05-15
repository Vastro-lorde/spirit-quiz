import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { checkAdminClaim, checkToken } from '../services/hooks';


export const AdminRoutes = () => {
  return (checkToken() && checkAdminClaim()?
    <Outlet/>
    : <Navigate to="/"/>
  )
}
