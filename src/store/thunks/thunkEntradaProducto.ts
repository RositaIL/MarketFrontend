import axios from "axios"
import { marbellaApi } from "../../api/marbellaApi"
import { startLoading, handleErrorMessage, saveEntradaProducto, getAllEntradaProducto, deleteEntradaProducto } from "../slices/entradaProductoSlice"
import { StoreDispatch } from "../store"
import { EntradaProducto } from "../../marbella/types/entrada"
import { updateAllDetalleEntrada } from "../slices/detalleEntradaSlice"
import { PaginationResponse } from "../../marbella/types/paginationResponse"


export const obtenerEntradas = (page: number = 0, size: number = 3) => {
    return async (dispatch: StoreDispatch) => {
        dispatch(startLoading());
        try {
            const { data } = await marbellaApi.get<PaginationResponse<EntradaProducto>>(`/entrada?page=${page}&size=${size}`);
            dispatch(getAllEntradaProducto(data));
        } catch (Error) {
            if (axios.isAxiosError(Error)) {
                if (Error.code === "ERR_NETWORK") {
                    dispatch(handleErrorMessage("El servidor no está disponible en este momento. Por favor, intente de nuevo más tarde"));
                } else {
                    const { error }: { error: string } = Error.response!.data;
                    dispatch(handleErrorMessage(error));
                };
            };
        };
    };
};

export const guardarEntrada = (entrada: EntradaProducto) => {
    return async (dispatch: StoreDispatch) => {
        dispatch(startLoading());
        try {
            const { data } = await marbellaApi.post<EntradaProducto>('/entrada', entrada);
            dispatch(saveEntradaProducto(data));
            dispatch(updateAllDetalleEntrada([]));
        } catch (Error) {
            if (axios.isAxiosError(Error)) {
                if (Error.code === "ERR_NETWORK") {
                    dispatch(handleErrorMessage("El servidor no está disponible en este momento. Por favor, intente de nuevo más tarde"));
                } else {
                    const { error }: { error: string } = Error.response!.data;
                    dispatch(handleErrorMessage(error));
                };
            };
        };
    };
};

export const eliminarEntrada = (idEntrada: number) => {
    return async (dispatch: StoreDispatch) => {
        dispatch(startLoading());
        try {
            await marbellaApi.delete(`/entrada/${idEntrada}`);
            dispatch(deleteEntradaProducto(idEntrada));
        } catch (Error) {
            if (axios.isAxiosError(Error)) {
                if (Error.code === "ERR_NETWORK") {
                    dispatch(handleErrorMessage("El servidor no está disponible en este momento. Por favor, intente de nuevo más tarde"));
                } else {
                    const { error }: { error: string } = Error.response!.data;
                    dispatch(handleErrorMessage(error));
                };
            };
        };
    };
};