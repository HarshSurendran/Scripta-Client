import OwnerArticleCard from '@/components/OwnerArticleCard';
import ArticleCardSkeleton from '@/components/skeleton/ArticleCardSkeleton';
import { getMyArticles } from '@/services/article';
import { Article } from '@/types/articleTypes';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const MyArticles: React.FC = () => {
    const [myArticles, setMyArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        fetchMyArticles();
    }, []);

    const fetchMyArticles = async () => {
        try {
            setLoading(true);
            const response = await getMyArticles();
            if (response.success) {
                setMyArticles(response.data);
            }
        } catch (error) {
            toast.error("Failed to fetch articles");
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <>
            {loading ? <div className="flex min-h-screen bg-gray-100">
                <div className="flex-1 bg-gray-50 p-6 ">
                    <div className="max-w-4xl mx-auto"> <ArticleCardSkeleton />
                    </div>
                </div>
            </div> :
            <div className="flex min-h-screen bg-gray-100">
                <div className="flex-1 bg-gray-50 p-6 ">
                    <div className="max-w-4xl mx-auto">
                        {
                            myArticles.length > 0 ? myArticles.map((article) => <OwnerArticleCard article={article} key={article._id} fetchMyArticles={fetchMyArticles} />) :
                                <div className="flex flex-col items-center justify-center h-full">
                                    <div className="text-gray-600 text-2xl font-bold">No articles yet! Please add some.</div>
                                </div>
                        }
                    </div>
                </div>
            </div>}
        </>
    );
};

export default MyArticles
