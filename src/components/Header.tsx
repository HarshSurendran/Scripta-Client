import React from 'react'
import { Button } from './ui/button'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
    const user = useSelector((state: any) => state.user);
    const navigate = useNavigate();

    return (
        <div className='flex justify-between items-center m-3'>
            <div className='flex gap-2 items-center'>
                <img src="./scripta_logo.png" alt="Logo" className='w-8 h-8' />
                <span><b>Scripta</b></span>
            </div>
            {user.isAuthenticated ? <p>Welcome, <b>{user.firstName} {user.lastName}</b></p> :
                <div className='flex gap-1'>
                    <Button variant={'ghost'} className='p-2' onClick={()=> navigate('/signup')}>SignUp</Button>
                    <span className='text-gray-400 mt-1'>/</span>
                    <Button variant={'ghost'} className='p-2' onClick={()=> navigate('/login')}>LogIn</Button>
                </div>
            }
        </div>
    )
};

export default Header
