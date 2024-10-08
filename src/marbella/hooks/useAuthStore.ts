import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/rootState";
import { AuthState } from "../../store/interfaceState";
import { marbellaApi } from "../../api/marbellaApi";

import { StoreDispatch } from "../../store/store";
import { handleErrorMessage, login, startLoading, logout } from "../../store/auth/authSlice";
import { Login } from "../auth/signIn/Login";
import { UserAuthenticate } from "../../store/auth/userAuthenticate";

export const useAuthStore = () => {

    const { messageError, authenticated }: AuthState = useSelector((state: RootState) => state.auth);
    const dispatch: StoreDispatch = useDispatch();

    const decodeToken = (token: string) => {
        const jwtDecodificado = jwtDecode(token) as UserAuthenticate;
        const user: UserAuthenticate = {
            ...jwtDecodificado,
            accessToken: token,
            photoURL: ''
        }
        return user;
    }

    const startAuthenticate = async (usuario: Login) => {
        dispatch(startLoading())
        try {
            const { data } = await marbellaApi.post<string>('/auth/login', usuario);
            localStorage.setItem('token', data);
            const user: UserAuthenticate = decodeToken(data)
            dispatch(login(user));
        } catch (Error) {
            if (axios.isAxiosError(Error)) {
                if (Error.code === "ERR_NETWORK") {
                    dispatch(handleErrorMessage("El servidor no está disponible en este momento. Por favor, intente de nuevo más tarde"));
                } else {
                    const { error }: { error: string } = Error.response!.data;
                    dispatch(handleErrorMessage(error));
                }
            }
            console.log("Error: ", Error);
        }
    }

    const checkAuthToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) return dispatch(logout(''));
        try {
            const user: UserAuthenticate = decodeToken(token)
            dispatch(login(user))
        } catch (error) {
            console.log('ERROR: ', error);
        }
    }

    return {
        startAuthenticate,
        messageError,
        checkAuthToken,
        authenticated,
        status,
    };

}