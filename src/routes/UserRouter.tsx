import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Landing from '../pages/Landing'
import Signup from '@/pages/Signup'
import Login from '@/pages/Login'
import Dashboard from '@/pages/Dashboard'

const UserRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path="/about" element={<h1 className='text-3xl'>About</h1>} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
  )
}

export default UserRouter
