
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/rootState";
import { AuthState } from "../../store/interfaceState";
import { marbellaApi } from "../../api/marbellaApi";
import axios from "axios";
import { StoreDispatch } from "../../store/store";
import { handleErrorMessage, login, startLoading } from "../../store/auth/authSlice";

export const useAuthStore = () => {

    const { messageError, authenticated }: AuthState = useSelector((state: RootState) => state.auth);
    const dispatch: StoreDispatch = useDispatch();

    const startAuthenticate = async (username: string, password: string) => {
        dispatch(startLoading())
        try {
            const response = await marbellaApi.post('/auth', { username, password });
            // localStorage.setItem('token', response.data);
            dispatch(login(response.data));
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

    // const checkAuthToken = async () => {
    //     const token = localStorage.getItem('token');
    //     if (!token) return dispatch(logout(null));

    //     try {
    //         const response = await marbellaApi.get('/review');
    //         dispatch(login([response.data.username]))

    //     } catch (error) {
    //         if (axios.isAxiosError(error)) {
    //             // if (error.status !== 404) {
    //             //     localStorage.clear();
    //             //     dispatch(logout(null))
    //             // }
    //         }
    //     }
    // }

    return {
        startAuthenticate,
        messageError,
        // checkAuthToken,
        authenticated,
        status,
    };

}