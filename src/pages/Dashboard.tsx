import React, { useState } from 'react';
import { 
  Filter, 
} from 'lucide-react';

import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  SheetContent, 
} from "@/components/ui/sheet";
import Sidebar from '@/components/Sidebar';
import ArticleCard from '@/components/ArticleCard';

// Article Interface
export interface Article {
  id: string;
  title: string;
  description: string;
  images: string[];
  tags: string[];
  category: string;
  author: {
    name: string;
    avatar: string;
  };
  likes: number;
  dislikes: number;
}

// Sample Categories
const CATEGORIES = [
  'Technology', 
  'Science', 
  'Arts', 
  'Culture', 
  'Sports', 
  'Health', 
  'Travel'
];

// Sample Articles
const SAMPLE_ARTICLES: Article[] = [
  {
    id: '1',
    title: 'The Future of AI',
    description: 'An in-depth look at artificial intelligence and its potential impact.',
    images: ['/api/placeholder/600/400'],
    tags: ['AI', 'Technology', 'Innovation'],
    category: 'Technology',
    author: {
      name: 'John Doe',
      avatar: '/api/placeholder/50/50'
    },
    likes: 124,
    dislikes: 12
  },
  {
    id: '2',
    title: 'The Future of AI',
    description: 'An in-depth look at artificial intelligence and its potential impact.',
    images: ['/api/placeholder/600/400'],
    tags: ['AI', 'Technology', 'Innovation'],
    category: 'Technology',
    author: {
      name: 'John Doe',
      avatar: '/api/placeholder/50/50'
    },
    likes: 124,
    dislikes: 12
  },
  {
    id: '3',
    title: 'The Future of AI',
    description: 'An in-depth look at artificial intelligence and its potential impact.',
    images: ['/api/placeholder/600/400'],
    tags: ['AI', 'Technology', 'Innovation'],
    category: 'Science',
    author: {
      name: 'John Doe',
      avatar: '/api/placeholder/50/50'
    },
    likes: 124,
    dislikes: 12
  },
];

const Dashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredArticles = selectedCategory 
    ? SAMPLE_ARTICLES.filter(article => article.category === selectedCategory)
    : SAMPLE_ARTICLES;
  
  
    return (
      <div className="flex min-h-screen bg-gray-100">
        {/* Desktop Sidebar */}
        <div className="hidden md:block sticky top-0 h-screen ">
            <Sidebar />
        </div>
  
        {/* Mobile Sidebar */}
        <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
          <SheetContent side="left" className="w-64 bg-gray-900">
            <Sidebar />
          </SheetContent>
        </Sheet>
  
        <div className="flex-1 bg-gray-50 p-6 md:p-10">
          <div className="max-w-4xl mx-auto">
            {/* Mobile Sidebar Toggle */}
            <div className="md:hidden mb-6">
              <Button 
                variant="outline" 
                onClick={() => setIsSidebarOpen(true)}
                className="flex items-center space-x-2"
              >
                <Filter /> <span>Menu</span>
              </Button>
            </div>
  
            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Button 
                variant={selectedCategory === null ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Button>
              {CATEGORIES.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
  
            {/* Articles */}
            {filteredArticles.map(article => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  
export default Dashboard
