import { createSlice } from "@reduxjs/toolkit";
import { EntradaProducto } from "../../marbella/types/entrada";
import { EntradaProductoState } from "../interfaceState";

const initialEntradaProducto: EntradaProducto[] = []

type PayloadAction<T> = {
    payload: T
};

export const entradaProductoSlice = createSlice({
    name: 'entradaProducto',
    initialState: {
        loading: false,
        entradaProductos: initialEntradaProducto,
        messageError: '',
        operationState: '',
    },
    reducers: {
        startLoading: (state: EntradaProductoState) => {
            state.loading = true;
        },
        clearOperationState: (state: EntradaProductoState) => {
            state.operationState = "";
        },
        handleErrorMessage: (state: EntradaProductoState, { payload }: PayloadAction<string>) => {
            state.messageError = payload;
        },
        clearHandleErrorMessage: (state: EntradaProductoState) => {
            state.messageError = '';
            state.operationState = '';
            state.loading = false;
        },
        getAllEntradaProducto: (state: EntradaProductoState, { payload }: PayloadAction<EntradaProducto[]>) => {
            state.entradaProductos = payload;
            state.loading = false;
            state.messageError = '';
            state.operationState = '';
        },
        saveEntradaProducto: (state: EntradaProductoState, { payload }: PayloadAction<EntradaProducto>) => {
            state.entradaProductos = [...state.entradaProductos, payload];
            state.loading = false;
            state.messageError = '';
            state.operationState = 'Añadido';
        }
    }
});

export const { getAllEntradaProducto, saveEntradaProducto, startLoading, clearHandleErrorMessage, clearOperationState, handleErrorMessage } = entradaProductoSlice.actions;