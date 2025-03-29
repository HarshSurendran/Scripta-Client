import { User } from "@/types/userTypes";
import { apiInstance } from "./apiInstance";
import { Article } from "@/types/articleTypes";

export const alterInterestedCategories = async (interestedCategories: string[]) => {
    try {
        const response = await apiInstance.patch('/users', { interestedCategories });
        console.log(response,"Response form api");
        return response;
    } catch (error) {
        throw error;
    }
}

export const updateProfile = async (data: Partial<User>) => {
    try {
        const response = await apiInstance.patch('/users', data);
        return response;
    } catch (error) {
        throw error;
    }
}

export const getAllCategories = async () => {
    try {
        const response = await apiInstance.get('/categories');
        return response.data;
    } catch (error) {
        throw error;
    }
}

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

