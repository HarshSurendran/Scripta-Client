import OwnerArticleCard from '@/components/OwnerArticleCard';
import { getMyArticles } from '@/services/article';
import { Article } from '@/types/articleTypes';
import React, { useEffect, useState } from 'react'

const MyArticles : React.FC = () => {
    const [myArticles, setMyArticles] = useState<Article[]>([]);

    useEffect(() => {
        fetchMyArticles();
    }, []);

    const fetchMyArticles = async () => {
        try {
            const response = await getMyArticles();
            if (response.success) {
                setMyArticles(response.data);
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
    <>
        {
            myArticles.length && myArticles.map((article) => <OwnerArticleCard article={article} />)
        }
          </>
      
  )
}

export default MyArticles
