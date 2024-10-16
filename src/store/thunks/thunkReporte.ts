import axios from "axios";
import { startLoading, handleErrorMessage, getAllReporteStockBajo } from "../slices/reporteSlice"
import { StoreDispatch } from "../store"
import { marbellaApi } from "../../api/marbellaApi";
import { Producto } from "../../marbella/types/Producto";


export const obtenerReporteStockBajo = () => {
    return async (dispatch: StoreDispatch) => {
        dispatch(startLoading());
        try {
            const { data } = await marbellaApi.get<Producto[]>('/producto/reporte');
            dispatch(getAllReporteStockBajo(data));
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