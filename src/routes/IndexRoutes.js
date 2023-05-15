import React, { lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SignIn } from '../components/authComponents/SignIn';
import { ProtectedRoutes } from './protectedRoutes';
import { Overview } from '../components/Overview';
import { Results } from '../components/Results';
import { Quiz } from '../components/Quiz';
import { Register } from '../components/authComponents/Register';
import { ProfilePage } from '../components/ProfilePage';
import { RequestResetPassword } from '../components/authComponents/RequestResetPassword';
import { ResetPassword } from '../components/authComponents/ResetPassword';
const Dashboard = lazy(() => import('../components/Dashboard'));
const NotFound = lazy(()=> import('../components/NotFound'))

export const IndexRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<SignIn/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/reset-password' element={<ResetPassword/>}/>
            <Route path='/forgot-password' element={<RequestResetPassword/>}/>
            <Route path='*' element={<NotFound/>}/>
            <Route path='/dashboard' element={<ProtectedRoutes/>} >
              <Route path='/dashboard' element={<Dashboard/>}>
                  <Route index element={<Overview/>}/>
                  <Route path='result' element={<Results/>}/>
                  <Route path='quiz' element={<Quiz/>}/>
                  <Route path='profile' element={<ProfilePage/>}/>
                  <Route path='*' element={<NotFound/>}/>
              </Route>
            </Route>
        </Routes>
    </Router>
  )
}
