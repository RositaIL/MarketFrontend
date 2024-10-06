import { createSlice } from "@reduxjs/toolkit";
import { Usuario } from '../../marbella/types/Usuario';
import { UsuarioState } from '../interfaceState';

const initialUsers: Usuario[] = []

type PayloadAction<T> = {
    payload: T
}

export const usuarioSlice = createSlice({
    name: "usuario",
    initialState: {
        loading: false,
        usuarios: initialUsers,
        messageError: '',
        operationState: '',
    },
    reducers: {
        startLoading: (state: UsuarioState) => {
            state.loading = true;
        },
        clearOperationState: (state: UsuarioState) => {
            state.operationState = '';
        },
        handleErrorMessage: (state: UsuarioState, { payload }: PayloadAction<string>) => {
            state.messageError = payload;
        },
        clearHandleErrorMessage: (state: UsuarioState) => {
            state.messageError = '';
            state.operationState = '';
            state.loading = false;
        },
        getAllUsuario: (state: UsuarioState, { payload }: PayloadAction<Usuario[]>) => {
            state.usuarios = payload;
            state.loading = false;
            state.messageError = '';
            state.operationState = '';
        },
        saveUsuario: (state: UsuarioState, { payload }: PayloadAction<Usuario>) => {
            state.usuarios = [...state.usuarios, payload];
            state.loading = false;
            state.messageError = '';
            state.operationState = 'Agregado';
        },
        updateUsuario: (state: UsuarioState, { payload }: PayloadAction<Usuario>) => {
            const index = state.usuarios.findIndex(user => user.idUsuario === payload.idUsuario);
            if (index !== -1) {
                state.usuarios[index] = payload;
                state.loading = false;
                state.messageError = '';
                state.operationState = 'Actualizado';
            }
        },
        deleteUsuario: (state: UsuarioState, { payload }: PayloadAction<number>) => {
            const index = state.usuarios.findIndex(user => user.idUsuario === payload);
            if (index !== -1) {
                state.usuarios = state.usuarios.filter(user => user.idUsuario !== payload);
                state.loading = false;
                state.messageError = '';
                state.operationState = 'Eliminado';
            }
        }
    }
});

export const { getAllUsuario, saveUsuario, updateUsuario, deleteUsuario, startLoading, clearOperationState, handleErrorMessage, clearHandleErrorMessage } = usuarioSlice.actions;