import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Landing from '../pages/Landing'
import Registeration from '../pages/Registeration'

const UserRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path='/signup' element={<Registeration />} />
      <Route path="/about" element={<h1 className='text-3xl'>About</h1>} />
    </Routes>
  )
}

export default UserRouter
