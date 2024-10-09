import { createSlice } from "@reduxjs/toolkit";
import { SalidaProducto } from "../../marbella/types/salida";
import { SalidaProductoState } from "../interfaceState";
import { PaginationResponse } from "../../marbella/types/paginationResponse";

const initialSalidaProducto: SalidaProducto[] = [];

type PayloadAction<T> = {
    payload: T
};

export const salidaProductoSlice = createSlice({
    name: 'salidaProducto',
    initialState: {
        loading: false,
        salidaProductos: initialSalidaProducto,
        messageError: '',
        operationState: '',
        paginaActual: 0,
        totalPagina: 0,
        pageSize: 0,
    },
    reducers: {
        startLoading: (state: SalidaProductoState) => {
            state.loading = true;
        },
        clearOperationState: (state: SalidaProductoState) => {
            state.operationState = "";
        },
        handleErrorMessage: (state: SalidaProductoState, { payload }: PayloadAction<string>) => {
            state.messageError = payload;
        },
        clearHandleErrorMessage: (state: SalidaProductoState) => {
            state.messageError = '';
            state.operationState = '';
            state.loading = false;
        },
        getAllSalidaProducto: (state: SalidaProductoState, { payload }: PayloadAction<PaginationResponse<SalidaProducto>>) => {
            state.salidaProductos = payload.content;
            state.totalPagina = payload.page.totalPages;
            state.paginaActual = payload.page.number;
            state.pageSize = payload.page.size;
            state.loading = false;
            state.messageError = '';
            state.operationState = '';
        },
        saveSalidaProducto: (state: SalidaProductoState, { payload }: PayloadAction<SalidaProducto>) => {
            state.salidaProductos = [...state.salidaProductos, payload];
            state.loading = false;
            state.messageError = '';
            state.operationState = 'Añadido';
        }
    }
});

export const { getAllSalidaProducto, saveSalidaProducto, startLoading, handleErrorMessage, clearHandleErrorMessage, clearOperationState } = salidaProductoSlice.actions;