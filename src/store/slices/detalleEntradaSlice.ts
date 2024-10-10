
import { createSlice } from "@reduxjs/toolkit";
import { DetalleEntrada } from "../../marbella/types/entrada";
import { DetalleEntradaState } from "../interfaceState";

const initialDetalleEntrada: DetalleEntrada[] = [];

type PayloadAction<T> = {
    payload: T
};

export const detalleEntradaSlice = createSlice({
    name: 'detalleEntrada',
    initialState: {
        loading: false,
        detalleEntradas: initialDetalleEntrada,
        messageError: '',
        operationState: '',
    },
    reducers: {
        startLoading: (state: DetalleEntradaState) => {
            state.loading = true;
        },
        getAllDetalleEntrada: (state: DetalleEntradaState, { payload }: PayloadAction<DetalleEntrada[]>) => {
            state.detalleEntradas = payload;
            state.loading = false;
            state.messageError = '';
            state.operationState = '';
        },
        saveDetalleEntrada: (state: DetalleEntradaState, { payload }: PayloadAction<DetalleEntrada>) => {
            const index = state.detalleEntradas.findIndex(detalle => detalle.idProducto === payload.idProducto);
            if (index !== -1) {
                const detalle = state.detalleEntradas[index];
                state.detalleEntradas[index] = { ...detalle, cantidad: (detalle.cantidad as number) + (payload.cantidad as number) }
            } else {
                state.detalleEntradas = [...state.detalleEntradas, payload];
            }
            state.loading = false;
            state.messageError = '';
            state.operationState = 'Añadido';
        },
        updateAllDetalleEntrada: (state: DetalleEntradaState, { payload }: PayloadAction<DetalleEntrada[]>) => {
            state.detalleEntradas = payload;
            state.loading = false;
            state.messageError = '';
            state.operationState = 'Tes de prueba';
        }
    }
});

export const { getAllDetalleEntrada, saveDetalleEntrada, updateAllDetalleEntrada, startLoading } = detalleEntradaSlice.actions;