import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Landing from '../pages/Landing'
import Signup from '@/pages/Signup'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import ArticleCreation from '@/pages/ArticleCreation'
import DashboardLayout from '@/layout/DashboardLayout'
import EditProfile from '@/pages/EditProfile'
import PrivateRoute from '@/hoc/privateRoute'
import PublicRoute from '@/hoc/publicRoute'

const UserRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute component={Landing} /> } />
      <Route path='/signup' element={<PublicRoute component={Signup} /> } />
      <Route path='/login' element={<PublicRoute component={Login} /> }/>
      <Route path="/about" element={<h1 className='text-3xl'>About</h1>} />
      <Route element={<PrivateRoute component={DashboardLayout} />}>        
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/create' element={<ArticleCreation />} />
        <Route path='/articles' element={<h1 className='text-3xl'>Articles</h1>} />
        <Route path='/settings' element={<EditProfile />} />
      </Route>
    </Routes>
  );
};

export default UserRouter
