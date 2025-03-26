import { SignupFormData } from "@/types/authTypes";
import { apiInstance } from "./apiInstance"



export const login = async (email: string, password: string) => {
    try {
        const response = await apiInstance.post('/login', { email, password });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const signup = async (formData: SignupFormData) => {
    try {
        const resposne = await apiInstance.post('/signup', formData);
        return resposne.data;
    } catch (error) {
        throw error;
    }
}