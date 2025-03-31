import OwnerArticleCard from '@/components/OwnerArticleCard';
import { getMyArticles } from '@/services/article';
import { Article } from '@/types/articleTypes';
import React, { useEffect, useState } from 'react'

const MyArticles: React.FC = () => {
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
            <div className="flex min-h-screen bg-gray-100">
                <div className="flex-1 bg-gray-50 p-6 ">
                    <div className="max-w-4xl mx-auto">
                        {
                            myArticles.length && myArticles.map((article) => <OwnerArticleCard article={article} key={article._id} fetchMyArticles={fetchMyArticles} />)
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyArticles
