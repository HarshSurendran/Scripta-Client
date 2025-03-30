import { User } from "@/types/userTypes";
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

export const updateProfile = async (data: Partial<User>) => {
    try {
        const response = await apiInstance.patch('/users', data);
        return response;
    } catch (error) {
        throw error;
    }
}

