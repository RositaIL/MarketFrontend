import { createSlice } from "@reduxjs/toolkit";
import { Proveedor } from "../../marbella/types/proveedor";
import { ProveedorState } from '../interfaceState';

const initialProveedor: Proveedor[] = []

type ActionPayload<T> = {
    payload: T
}

export const proveedorSlice = createSlice({
    name: 'proveedor',
    initialState: {
        proveedores: initialProveedor,
        loading: false,
        operationState: '',
        messageError: ''
    },
    reducers: {
        startLoading: (state: ProveedorState) => {
            state.loading = true;
        },
        clearOperationState: (state: ProveedorState) => {
            state.operationState = '';
        },
        handleErrorMessage: (state: ProveedorState, { payload }: ActionPayload<string>) => {
            state.messageError = payload;
            state.operationState = '';
        },
        clearHandleErrorMessage: (state: ProveedorState) => {
            state.messageError = '';
            state.operationState = '';
            state.loading = false;
        },
        getAllProveedor: (state: ProveedorState, { payload }: ActionPayload<Proveedor[]>) => {
            state.proveedores = payload;
            state.loading = false;
            state.messageError = '';
            state.operationState = '';
        },
        saveProveedor: (state: ProveedorState, { payload }: ActionPayload<Proveedor>) => {
            state.proveedores = [...state.proveedores, payload];
            state.loading = false;
            state.messageError = '';
            state.operationState = 'Agregado';
        },
        updateProveedor: (state: ProveedorState, { payload }: ActionPayload<Proveedor>) => {
            const index = state.proveedores.findIndex(proveedor => proveedor.idProveedor === payload.idProveedor);
            if (index !== -1) {
                state.proveedores[index] = payload;
                state.loading = false;
                state.messageError = '';
                state.operationState = 'Actualizadó';
            }
        },
        deleteProveedor: (state: ProveedorState, { payload }: ActionPayload<number>) => {
            const index = state.proveedores.findIndex(proveedor => proveedor.idProveedor === payload);
            if (index !== -1) {
                state.proveedores = state.proveedores.filter(proveedor => proveedor.idProveedor !== payload);
                state.loading = false;
                state.messageError = '';
                state.operationState = 'Eliminado';
            }
        }
    }
});

export const { getAllProveedor, saveProveedor, updateProveedor, deleteProveedor, clearOperationState, startLoading, handleErrorMessage, clearHandleErrorMessage } = proveedorSlice.actions;