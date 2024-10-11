import { createSlice } from "@reduxjs/toolkit";
import { Producto } from "../../marbella/types/Producto";
import { ReporteState } from "../interfaceState";

const initialReporteStockBajo: Producto[] = [];
type PayloadAction<T> = {
    payload: T
}

export const reporteSlice = createSlice({
    name: 'reporte',
    initialState: {
        loading: false,
        reporteStockBajo: initialReporteStockBajo,
        messageError: '',
    },
    reducers: {
        startLoading: (state: ReporteState) => {
            state.loading = true;
        },
        handleErrorMessage: (state: ReporteState, { payload }: PayloadAction<string>) => {
            state.messageError = payload;
        },
        clearHandleErrorMessage: (state: ReporteState) => {
            state.messageError = '';
            state.loading = false;
        },
        getAllReporteStockBajo: (state: ReporteState, { payload }: PayloadAction<Producto[]>) => {
            state.reporteStockBajo = payload;
            state.loading = false;
            state.messageError = '';
        }
    }
});

export const { getAllReporteStockBajo, startLoading, handleErrorMessage, clearHandleErrorMessage } = reporteSlice.actions;