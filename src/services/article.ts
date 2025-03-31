import { apiInstance } from "./apiInstance";

export const createArticle = async (data: FormData) => {
    try {
        const response = await apiInstance.post('/articles', data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getArticles = async (interestedCategories: string[], page:number, limit:number) => {
    try {
        const response = await apiInstance.post(`/articles/all?page=${page}&limit=${limit}`, { interestedCategories });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const updateArticle = async (articleId: string, data: FormData) => {
    try {
        const response = await apiInstance.patch(`/articles/${articleId}`, data);
        return response.data;        
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

export const blockArticle = async (data: {userId: string, articleId: string, reason: string}) => {
    try {
        const response = await apiInstance.post(`/articles/block`, data);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteArticle = async (articleId: string) => {
    try {
        const response = await apiInstance.delete(`/articles/${articleId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getNoOfBlocks = async (articleId:string) => {
    try {
        const response = await apiInstance.get(`/articles/noofblocks/${articleId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

