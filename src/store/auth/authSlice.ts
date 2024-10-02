
import { createSlice } from "@reduxjs/toolkit"

export const authSlice = createSlice(
    {
        name: 'auth',
        initialState: {
            status: 'checking',
            authenticated: false,
            user: {},
            messageError: null,

        },
        reducers: {
            login: (state, { payload }) => {
                state.status = 'authenticate';
                state.authenticated = true;
                state.user = payload;
                state.messageError = null;
            },
            logout: (state, { payload }) => {
                state.status = 'not-authenticate';
                state.authenticated = false;
                state.user = {};
                state.messageError = payload;
            },
            checkingCredentials: (state) => {
                state.status = 'checking';
                state.authenticated = false;
                state.user = {};
                state.messageError = null;
            },
            clearErrorMessage: (state) => {
                state.messageError = null;
            }
        }
    }
)

export const { login, logout, checkingCredentials, clearErrorMessage } = authSlice.actions;