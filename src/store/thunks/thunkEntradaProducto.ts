import axios from "axios"
import { marbellaApi } from "../../api/marbellaApi"
import { startLoading, handleErrorMessage, saveEntradaProducto, getAllEntradaProducto } from "../slices/entradaProductoSlice"
import { StoreDispatch } from "../store"
import { EntradaProducto } from "../../marbella/types/entrada"
import { updateAllDetalleEntrada } from "../slices/detalleEntradaSlice"


export const obtenerEntradas = () => {
    return async (dispatch: StoreDispatch) => {
        dispatch(startLoading());
        try {
            const { data } = await marbellaApi.get<EntradaProducto[]>('/entrada');
            dispatch(getAllEntradaProducto(data));
        } catch (Error) {
            if (axios.isAxiosError(Error)) {
                if (Error.code === "ERR_NETWORK") {
                    dispatch(handleErrorMessage("El servidor no está disponible en este momento. Por favor, intente de nuevo más tarde"));
                } else {
                    const { error }: { error: string } = Error.response!.data;
                    dispatch(handleErrorMessage(error));
                }
            }
            console.log("Error: ", Error);
        }
    }
}

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
                }
            }
            console.log("Error: ", Error);
        }
    }
}