import { apiInstance } from "./apiInstance";

export const getAllCategories = async () => {
    try {
        const response = await apiInstance.get('/categories');
        return response.data;
    } catch (error) {
        throw error;
    }
}