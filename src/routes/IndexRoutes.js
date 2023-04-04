import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from '../components/Dashboard';
import { SignIn } from '../components/SignIn';
import { ProtectedRoutes } from './protectedRoutes';
import { Overview } from '../components/Overview';
import { Results } from '../components/Results';
import { Quiz } from '../components/Quiz';

export const IndexRoutes = () => {
  return (
    <Router>
        <Routes>
            <Route path='/' element={<SignIn/>}/>
            <Route path='/dashboard' element={<ProtectedRoutes/>} >
              <Route path='/dashboard' element={<Dashboard/>}>
                  <Route index element={<Overview/>}/>
                  <Route path='result' element={<Results/>}/>
                  <Route path='quiz' element={<Quiz/>}/>
              </Route>
            </Route>
        </Routes>
    </Router>
  )
}
