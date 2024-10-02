
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../store/rootState";
import { AuthState } from "../store/interfaceState";
import { marbellaApi } from "../api/marbellaApi";
import axios from "axios";
import { checkingCredentials, clearErrorMessage, login, logout } from "../store/auth";

export const useAuthStore = () => {

    const { messageError, authenticated, status }: AuthState = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    const startLogin = async (username: String, password: String) => {

        dispatch(checkingCredentials())
        try {
            const response = await marbellaApi.post('/auth', { username, password });
            // localStorage.setItem('token', response.data);
            dispatch(login(response.data));
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.status === 404) {
                    dispatch(logout('Servidor no disponible'));
                }
            };

            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10)
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(logout(null));

        try {
            const response = await marbellaApi.get('/review');
            dispatch(login([response.data.username]))

        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.status !== 404) {
                    localStorage.clear();
                    dispatch(logout(null))
                }
            }
        }
    }

    return {
        startLogin,
        messageError,
        checkAuthToken,
        authenticated,
        status,
    };

}