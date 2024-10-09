
import axios from "axios"
import { getAllSalidaProducto, handleErrorMessage, saveSalidaProducto, startLoading } from "../slices/salidaProductoSlice"
import { StoreDispatch } from '../store';
import { marbellaApi } from "../../api/marbellaApi"
import { SalidaProducto } from "../../marbella/types/salida"
import { updateAllDetalleSalida } from "../slices/detalleSalidaSlice";

export const obtenerSalidaProductos = () => {
    return async (dispatch: StoreDispatch) => {
        dispatch(startLoading());
        try {
            const { data } = await marbellaApi.get<SalidaProducto[]>('/salida');
            dispatch(getAllSalidaProducto(data));
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
        };
    };
};

export const agregarSalidaProducto = (salida: SalidaProducto) => {
    return async (dispatch: StoreDispatch) => {
        dispatch(startLoading());
        try {
            const { data } = await marbellaApi.post<SalidaProducto>(`/salida`, salida);
            dispatch(saveSalidaProducto(data));
            dispatch(updateAllDetalleSalida([]));
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