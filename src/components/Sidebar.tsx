
import { motion } from 'framer-motion';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Home, PenTool, Settings } from 'lucide-react';
import { RootState } from '@/redux/store/store';
import { useSelector } from 'react-redux';


// Sidebar Menu Items
const SIDEBAR_MENU = [
    { 
      label: 'Dashboard', 
      icon: Home, 
      path: '/dashboard' 
    },
    { 
      label: 'Create Article', 
      icon: PenTool, 
      path: '/create' 
    },
    { 
      label: 'My Articles', 
      icon: BookOpen, 
      path: '/articles' 
    },
    { 
      label: 'Settings', 
      icon: Settings, 
      path: '/settings' 
    }
  ];

const Sidebar: React.FC<{ mobile?: boolean }> = ({ mobile }) => {
    const user = useSelector((state: RootState) => state.user);
    const navigate = useNavigate();
    
    return (
        <motion.div
            initial={{ opacity: mobile ? 0 : 1, x: mobile ? -50 : 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`bg-gray-900 text-white sticky top-0 h-screen
        ${mobile ? 'w-full p-4' : 'w-64 p-6'}
        space-y-6`}
        >
            {/* User Profile */}
            <div className="flex items-center space-x-4">
                <Avatar>
                    <AvatarImage src="/api/placeholder/50/50" />
                    <AvatarFallback className='text-black bg-gray-100'>{user.shortName}</AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="text-xl font-bold">{user.firstName + " " + user.lastName}</h2>
                    <p className="text-gray-400">@{user.firstName+""+user.lastName}</p>
                </div>
            </div>

            <Separator className="bg-gray-700" />

            {/* Navigation Menu */}
            <nav className="space-y-2">
                {SIDEBAR_MENU.map((item) => (
                    <Button
                        key={item.path}
                        variant={location.pathname === item.path ? 'secondary' : 'ghost'}
                        className="w-full justify-start hover:bg-gray-500"
                        onClick={() => navigate(item.path)}
                    >
                        <item.icon className="mr-2" /> {item.label}
                    </Button>
                ))}
            </nav>
        </motion.div>
    );
}
  

export default Sidebar;