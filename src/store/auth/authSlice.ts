
import { createSlice } from "@reduxjs/toolkit"
import { UserAuthenticate } from "./userAuthenticate";
import { AuthState } from "../interfaceState";

const initialUserAuthenticate: UserAuthenticate = {
    uid: '',
    accessToken: '',
    name: '',
    email: '',
    photoURL: '',
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
            },
            login: (state: AuthState, { payload }: PayloadAction<UserAuthenticate>) => {
                state.authenticated = false;
                state.user = payload;
                state.messageError = '';
            },
            logout: (state: AuthState, { payload }: PayloadAction<string>) => {
                state.authenticated = false;
                state.user = {} as UserAuthenticate;
                state.messageError = payload;
            },
            clearErrorMessage: (state: AuthState) => {
                state.messageError = ''
            }
        }
    }
)

export const { login, logout, clearErrorMessage, startLoading, handleErrorMessage } = authSlice.actions;