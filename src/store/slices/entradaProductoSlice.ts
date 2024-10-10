import { createSlice } from "@reduxjs/toolkit";
import { EntradaProducto } from "../../marbella/types/entrada";
import { EntradaProductoState } from "../interfaceState";
import { PaginationResponse } from "../../marbella/types/paginationResponse";

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
        paginaActual: 0,
        totalPagina: 0,
        pageSize: 0,
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
        getAllEntradaProducto: (state: EntradaProductoState, { payload }: PayloadAction<PaginationResponse<EntradaProducto>>) => {
            state.entradaProductos = payload.content;
            state.pageSize = payload.page.size;
            state.totalPagina = payload.page.totalPages;
            state.paginaActual = payload.page.number;
            state.loading = false;
            state.messageError = '';
            state.operationState = '';
        },
        saveEntradaProducto: (state: EntradaProductoState, { payload }: PayloadAction<EntradaProducto>) => {
            state.entradaProductos = [...state.entradaProductos, payload];
            state.loading = false;
            state.messageError = '';
            state.operationState = 'Añadido';
        },
        deleteEntradaProducto: (state: EntradaProductoState, { payload }: PayloadAction<number>) => {
            const index = state.entradaProductos.findIndex(entrada => entrada.idEntrada === payload);
            if (index !== -1) {
                state.entradaProductos = state.entradaProductos.filter(entrada => entrada.idEntrada !== payload);
                state.loading = false;
                state.messageError = '';
                state.operationState = 'Eliminado';
            }
        }
    }
});

export const { getAllEntradaProducto, saveEntradaProducto, deleteEntradaProducto, startLoading, clearHandleErrorMessage, clearOperationState, handleErrorMessage } = entradaProductoSlice.actions;