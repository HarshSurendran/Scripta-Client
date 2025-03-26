import React from 'react';
import { 
  PenTool,
  Home,
  BookOpen,
  Settings, 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";



const Sidebar: React.FC = () => (
    <div className="h-full bg-gray-900 text-white w-64 p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar>
          <AvatarImage src="/api/placeholder/50/50" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-bold">John Doe</h2>
          <p className="text-gray-400">@johndoe</p>
        </div>
      </div>

      <Separator className="bg-gray-400" />

      <nav className="space-y-2">
        <Button 
          variant="ghost" 
          className="w-full justify-start hover:bg-gray-400"
        >
          <Home className="mr-2" /> Dashboard
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start hover:bg-gray-400"
        >
          <PenTool className="mr-2" /> Create Article
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start hover:bg-gray-400"
        >
          <BookOpen className="mr-2" /> My Articles
        </Button>
        <Button 
          variant="ghost" 
          className="w-full justify-start hover:bg-gray-400"
        >
          <Settings className="mr-2" /> Settings
        </Button>
      </nav>
    </div>
);
  
export default Sidebar