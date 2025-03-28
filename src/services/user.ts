import { apiInstance } from "./apiInstance";

export const alterInterestedCategories = async (interestedCategories: string[]) => {
    try {
        const response = await apiInstance.patch('/users', { interestedCategories });
        console.log(response,"Response form api");
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