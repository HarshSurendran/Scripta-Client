import Sidebar from '@/components/Sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import {motion} from 'framer-motion'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';

const DashboardLayout: React.FC = () => {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const shortName = useSelector((state: RootState) => state.user.shortName);

return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop Sidebar - Hidden on mobile */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar - Sheet Component */}
      <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <SheetContent side="left" className="w-full p-0">
          <Sidebar mobile />
        </SheetContent>
      </Sheet>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-50">
        {/* Mobile Header with Sidebar Toggle */}
        <div className="md:hidden bg-gray-900 p-4 flex items-center justify-between">
          <Button
            variant="ghost" 
            onClick={() => setIsMobileSidebarOpen(true)}
            className="text-white"
          >
            <Menu />
          </Button>
          <div className="flex items-center space-x-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="/api/placeholder/50/50" />
            <AvatarFallback>{shortName}</AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-2 md:p-2 lg:p-4">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
  
}

export default DashboardLayout

