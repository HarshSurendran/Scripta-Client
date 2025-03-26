import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Landing from '../pages/Landing'
import Signup from '@/pages/Signup'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'
import ArticleCreation from '@/pages/ArticleCreation'
import DashboardLayout from '@/layout/DashboardLayout'
import EditProfile from '@/pages/EditProfile'

const UserRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path="/about" element={<h1 className='text-3xl'>About</h1>} />
      <Route element={<DashboardLayout />} >        
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/create' element={<ArticleCreation />} />
        <Route path='/articles' element={<h1 className='text-3xl'>Articles</h1>} />
        <Route path='/settings' element={<EditProfile />} />
      </Route>
    </Routes>
  );
};

export default UserRouter
