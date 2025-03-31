import React from 'react';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const goBack = () => {
    window.history.back();
  };

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="relative">
          <h1 className="text-9xl font-extrabold tracking-widest opacity-80">404</h1>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <h1 className="text-9xl font-extrabold tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">404</h1>
          </div>
        </div>
        
        <div className="space-y-6 mt-8">
          <h2 className="text-2xl font-bold">Page Not Found</h2>
          <p className="text-gray-400">
            Oops! The page you're looking for seems to have vanished into the digital void.
          </p>

          <div className="flex items-center justify-center">
            <div className="h-px w-16 bg-gray-700"></div>
            <span className="px-3 text-gray-500">404</span>
            <div className="h-px w-16 bg-gray-700"></div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button 
              variant="outline" 
              className="flex text-black items-center gap-2 border-gray-700 hover:bg-gray-900 hover:text-white transition-all" 
              onClick={goBack}
            >
              <ArrowLeft size={16} />
              Go Back
            </Button>
            <Button 
              className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 transition-all" 
              onClick={goHome}
            >
              <Home size={16} />
              Home Page
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16 text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} Scripta. All rights reserved.
      </div>
    </div>
  );
};

export default ErrorPage;