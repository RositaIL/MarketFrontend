
import axios from "axios";

export const marbellaApi = axios.create({
    baseURL: 'http://localhost:8081',
});

marbellaApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})