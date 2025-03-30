import { Article } from "@/types/articleTypes";
import { apiInstance } from "./apiInstance";

export const createArticle = async (data: FormData) => {
    try {
        const response = await apiInstance.post('/articles', data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getArticles = async (interestedCategories: string[]) => {
    try {
        const response = await apiInstance.post('/articles/all', { interestedCategories });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateArticle = async (articleId: string, data: Partial<Article>) => {
    try {
        const response = await apiInstance.patch(`/articles/${articleId}`, data);
        return response;        
    } catch (error) {
        throw error;
    }
}

export const alterUserAction = async (articleId: string, action: {}) => {
    try {
        const response = await apiInstance.patch(`/articles/userActions/${articleId}`, action);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getMyArticles = async () => {
    try {
        const response = await apiInstance.get('/articles/');
        return response.data;
    } catch (error) {
        throw error;
    }
}

