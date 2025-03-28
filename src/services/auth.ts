import { SignupFormData } from "@/types/authTypes";
import { apiInstance } from "./apiInstance"

export const login = async (identifier: string, password: string) => {
    try {
        const response = await apiInstance.post('auth/login', { identifier, password });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const signup = async (formData: Omit<SignupFormData, "confirmPassword">) => {
    try {
        const resposne = await apiInstance.post('auth/signup', formData);
        return resposne.data;
    } catch (error) {
        throw error;
    }
}

export const logout = async () => {
    try {
        const response = await apiInstance.post('auth/logout');
        return response.data;
    } catch (error) {
        throw error;
    }
}