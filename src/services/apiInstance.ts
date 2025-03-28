import axios from 'axios'
const BASE_URL = import.meta.env.VITE_BASE_URL

export const apiInstance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
});

apiInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('userToken');

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
});
