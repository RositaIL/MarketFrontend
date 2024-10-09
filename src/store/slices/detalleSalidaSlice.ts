import { createSlice } from "@reduxjs/toolkit";
import { DetalleSalidaState } from "../interfaceState";
import { DetalleSalida } from "../../marbella/types/salida";



const initialDetalleSalida: DetalleSalida[] = [];

type PayloadAction<T> = {
    payload: T
};

export const detalleSalidaSlice = createSlice({
    name: 'detalleSalida',
    initialState: {
        loading: false,
        detalleSalidas: initialDetalleSalida,
        messageError: '',
        operationState: '',
    },
    reducers: {
        startLoading: (state: DetalleSalidaState) => {
            state.loading = true;
        },
        getAllDetalleSalida: (state: DetalleSalidaState, { payload }: PayloadAction<DetalleSalida[]>) => {
            state.detalleSalidas = payload;
            state.loading = false;
            state.messageError = '';
            state.operationState = '';
        },
        saveDetalleSalida: (state: DetalleSalidaState, { payload }: PayloadAction<DetalleSalida>) => {
            state.detalleSalidas = [...state.detalleSalidas, payload];
            state.loading = false;
            state.messageError = '';
            state.operationState = 'Añadido';
        },
        updateAllDetalleSalida: (state: DetalleSalidaState, { payload }: PayloadAction<DetalleSalida[]>) => {
            state.detalleSalidas = payload;
            state.loading = false;
            state.messageError = '';
            state.operationState = 'Tes de prueba';
        }
    }
});

export const { getAllDetalleSalida, saveDetalleSalida, updateAllDetalleSalida, startLoading } = detalleSalidaSlice.actions;