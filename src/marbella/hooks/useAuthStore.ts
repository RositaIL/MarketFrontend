import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/rootState";
import { StoreDispatch } from "../../store/store";
import { handleErrorMessage, login, startLoading, logout, clearErrorMessage } from "../../store/auth/authSlice";
import { Login } from "../auth/signIn/Login";
import { UserAuthenticate } from "../../store/auth/userAuthenticate";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { marbellaApi } from "../../api/marbellaApi";

interface CustomJwtPayload extends JwtPayload {
    sub?: string;
    exp: number;
    iat: number;
    aud?: string | string[];
    userID?: number,
    nombre?: string,
    correo?: string,
    rol: string,
}

export const useAuthStore = () => {

    const { messageError, authenticated, loading, user } = useSelector((state: RootState) => state.auth);
    const dispatch: StoreDispatch = useDispatch();
    const navegate: NavigateFunction = useNavigate();

    const decodeToken = (token: string) => {
        return jwtDecode<CustomJwtPayload>(token);
    };

    const startAuthenticate = async (usuario: Login) => {
        dispatch(startLoading())
        try {
            const { data } = await axios.post<string>('http://localhost:8081/auth/login', usuario);
            localStorage.setItem('token', data);
            const user = userAutheticado(data);
            dispatch(login(user));
        } catch (Error) {
            if (axios.isAxiosError(Error)) {
                if (Error.code === "ERR_NETWORK") {
                    dispatch(handleErrorMessage("El servidor no está disponible en este momento. Por favor, intente de nuevo más tarde"));
                } else {
                    const { error }: { error: string } = Error.response!.data;
                    dispatch(handleErrorMessage(error));
                };
            };
        };
    };

    const checkAuthToken = () => {
        const token = localStorage.getItem('token');
        try {
            if (!token) {
                logoutUser('');
                return;
            };
            if (!decodeToken(token).exp || isExperidToken(decodeToken(token).exp!)) {
                logoutUser('El token a expirado');
                return;
            };
            const user = userAutheticado(token);
            localStorage.setItem('token', token);
            dispatch(login(user));
        } catch (error) {
            console.log('ERROR: ', error);
        };
    };

    const userAutheticado = (token: string): UserAuthenticate => {
        const decodificado = decodeToken(token);
        return {
            userID: decodificado.userID,
            sub: decodificado.sub!,
            nombre: decodificado.nombre,
            rol: decodificado.rol,
            correo: decodificado.rol,
            photoURL: ''
        };
    };

    const isExperidToken = (time: number) => {
        const currentTime = Math.floor(Date.now() / 1000);
        if (time < currentTime) {
            return true;
        };
        return false;
    };

    const logoutUser = async (message: string) => {
        try {
            await marbellaApi.post('/auth/logout');
            localStorage.clear();
            dispatch(logout(message));
            navegate('/login', { replace: true });
        } catch (Error) {
            console.log('ERROR LOGOUT: ', Error);
        };
    };

    return {
        startAuthenticate,
        messageError,
        checkAuthToken,
        authenticated,
        logoutUser,
        loading, user,
        clearErrorMessage,
    };

}