
import { createSlice } from "@reduxjs/toolkit"
import { UserAuthenticate } from "./userAuthenticate";
import { AuthState } from "../interfaceState";

const initialUserAuthenticate: UserAuthenticate = {
    sub: '',
    photoURL: '',
    userID: 0,
    nombre: '',
    correo: '',
    rol: '',
}

type PayloadAction<T> = {
    payload: T
}

export const authSlice = createSlice(
    {
        name: 'auth',
        initialState: {
            loading: false,
            authenticated: false,
            user: initialUserAuthenticate,
            messageError: '',
            operationState: '',
        },
        reducers: {
            startLoading: (state: AuthState) => {
                state.loading = true;
            },
            handleErrorMessage: (state: AuthState, { payload }: PayloadAction<string>) => {
                state.messageError = payload;
                state.loading = false;
            },
            clearErrorMessage: (state: AuthState) => {
                state.messageError = ''
            },
            login: (state: AuthState, { payload }: PayloadAction<UserAuthenticate>) => {
                state.authenticated = true;
                state.loading = false;
                state.user = payload;
                state.messageError = '';
            },
            logout: (state: AuthState, { payload }: PayloadAction<string>) => {
                state.authenticated = false;
                state.user = {} as UserAuthenticate;
                state.loading = false;
                state.messageError = payload;
            }

        }
    }
)

export const { login, logout, clearErrorMessage, startLoading, handleErrorMessage } = authSlice.actions;