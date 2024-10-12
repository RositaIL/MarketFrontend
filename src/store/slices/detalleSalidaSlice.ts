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
            const index = state.detalleSalidas.findIndex(detalle => detalle.idProducto === payload.idProducto);
            if (index !== -1) {
                const detalle = state.detalleSalidas[index];
                state.detalleSalidas[index] = { ...detalle, cantidad: (detalle.cantidad as number) + (payload.cantidad as number) }
            } else state.detalleSalidas = [...state.detalleSalidas, payload];

            state.loading = false;
            state.messageError = '';
            state.operationState = 'Añadido';
        },
        updateAllDetalleSalida: (state: DetalleSalidaState, { payload }: PayloadAction<DetalleSalida[]>) => {
            state.detalleSalidas = payload;
            state.loading = false;
            state.messageError = '';
            state.operationState = 'Tes de prueba';
        },
        deleteByIdProducto: (state: DetalleSalidaState, { payload }: PayloadAction<number>) => {
            const index = state.detalleSalidas.findIndex(detalle => detalle.idProducto === payload);
            if (index !== -1) {
                state.detalleSalidas = state.detalleSalidas.filter(detalle => detalle.idProducto !== payload);
                state.loading = false;
                state.messageError = '';
                state.operationState = 'Eliminado';
            }
        }
    }
});

export const { getAllDetalleSalida, saveDetalleSalida, updateAllDetalleSalida, deleteByIdProducto, startLoading } = detalleSalidaSlice.actions;