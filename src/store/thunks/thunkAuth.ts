
import { logoutFirebase, singInWithGoole } from "../../firebase/provider";
import { checkingCredentials, login, logout } from "../auth/authSlice"

export const startGooleSingIn = () => {
    return async (dispatch: any) => {
        dispatch(checkingCredentials())
        try {
            const response = await singInWithGoole()
            if (response === "auth/user-cancelled") return dispatch(logout(null));
            dispatch(login(response));
        } catch (error) {
            console.log("ERROR ", error)
        }
    }
}

export const startLogout = () => {
    return async (dispatch: any) => {
        await logoutFirebase()
        dispatch(logout(null));
        localStorage.clear();
    }
}