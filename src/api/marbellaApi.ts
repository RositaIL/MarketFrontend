
import axios from "axios";

const marbellaApi = axios.create({
    baseURL: 'http://localhost:8081',
});

marbellaApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export { marbellaApi };