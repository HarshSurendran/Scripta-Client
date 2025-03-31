import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import ArticleCard from '@/components/ArticleCard';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import CategorySelectionModal from '@/components/CategorySelection';
import { getArticles } from '@/services/article';
import { Article } from '@/types/articleTypes';
import ArticleCardSkeleton from '@/components/skeleton/ArticleCardSkeleton';
import { Skeleton } from '@/components/ui/skeleton';


const Dashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, [user.interestedCategories]);

  const fetchArticles = async () => {
    try {
      setLoading(true);
      const response = await getArticles(user.interestedCategories);
      if (response.success) {
        setArticles(response.data);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = selectedCategory
    ? articles.filter(article => article.category === selectedCategory)
    : articles;
  
  
  return (    
    <>
      {user.interestedCategories.length == 0 && (
        <CategorySelectionModal />
      )}
      {loading ?<div className="flex min-h-screen bg-gray-100">
        <div className="flex-1 bg-gray-50 p-6 ">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-6">
              <Skeleton className="h-10 w-24 bg-gray-700 rounded-md" />
              <Skeleton className="h-10 w-24 bg-gray-700  rounded-md" />
              <Skeleton className="h-10 w-24 bg-gray-700  rounded-md" />
              <Skeleton className="h-10 w-24 bg-gray-700  rounded-md" />
              <Skeleton className="h-10 w-24 bg-gray-700  rounded-md" />
              <Skeleton className="h-10 w-24 bg-gray-700  rounded-md" />  
              </div>
            <ArticleCardSkeleton />
          </div>
        </div>
        </div>
          
          :
        <div className="flex min-h-screen bg-gray-100">
        <div className="flex-1 bg-gray-50 p-6 ">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-6">
              <Button
                variant={selectedCategory === null ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(null)}
              >
                All
              </Button>
              {user.interestedCategories.map(category => (
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
              <ArticleCard key={article._id} article={article} fetchArticles={fetchArticles} />
            ))}
              {filteredArticles.length === 0 && <p className="text-gray-600 text-center mt-4 text-lg ">No articles found</p>}
          </div>
        </div>
      </div>}
    </>
  );
};

  
export default Dashboard
