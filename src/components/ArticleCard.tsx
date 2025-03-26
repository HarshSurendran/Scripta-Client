import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ThumbsUp, 
  ThumbsDown, 
  Ban, 
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Article } from '@/pages/Dashboard';




const ArticleCard: React.FC<{ article: Article }> = ({ article }) => {
    const [userAction, setUserAction] = useState<'like' | 'dislike' | null>(null);

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-900 rounded-lg shadow-lg overflow-hidden mb-6"
      >
        {article.images.length > 0 && (
          <img 
            src={article.images[0]} 
            alt={article.title} 
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={article.author.avatar} />
                <AvatarFallback>{article.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-white font-bold">{article.author.name}</h3>
                <Badge variant="secondary">{article.category}</Badge>
              </div>
            </div>
          </div>
          
          <h2 className="text-xl font-bold text-white mb-2">{article.title}</h2>
          <p className="text-gray-300 mb-4">{article.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {article.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-white">{tag}</Badge>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <Button 
                variant={userAction === 'like' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setUserAction(userAction === 'like' ? null : 'like')}
                className="flex items-center space-x-2"
              >
                <ThumbsUp size={16} />
                <span>{article.likes}</span>
              </Button>
              
              <Button 
                variant={userAction === 'dislike' ? 'destructive' : 'outline'}
                size="sm"
                onClick={() => setUserAction(userAction === 'dislike' ? null : 'dislike')}
                className="flex items-center space-x-2"
              >
                <ThumbsDown size={16} />
                <span>{article.dislikes}</span>
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-red-500 hover:text-red-700"
              >
                <Ban size={16} className="mr-2" /> Block
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
};
  
export default ArticleCard