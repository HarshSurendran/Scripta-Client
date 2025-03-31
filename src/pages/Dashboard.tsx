import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import ArticleCard from '@/components/ArticleCard';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import CategorySelectionModal from '@/components/CategorySelection';
import { getArticles } from '@/services/article';
import { Article } from '@/types/articleTypes';


const Dashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.user);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetchArticles();
  }, [user.interestedCategories]);

  const fetchArticles = async () => {
    try {
      const response = await getArticles(user.interestedCategories);
      if (response.success) {
        setArticles(response.data);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
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
          </div>
        </div>
      </div>
    </>
  );
};

  
export default Dashboard
