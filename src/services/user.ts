import { apiInstance } from "./apiInstance";

export const alterInterestedCategories = async (categories: string[]) => {
    try {
        const response = await apiInstance.patch('/users', { categories });
        return response.data;
    } catch (error) {
        throw error;
    }
}