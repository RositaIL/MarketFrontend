
import axios, { AxiosError } from "axios";
import { store } from "../store/store";
import { logout } from "../store/auth/authSlice";

const marbellaApi = axios.create({
    baseURL: 'http://localhost:8081',
});

marbellaApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

marbellaApi.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            localStorage.clear();
            store.dispatch(logout(''));
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export { marbellaApi };