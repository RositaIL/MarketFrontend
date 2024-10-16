import { DetalleSalida } from "../../marbella/types/salida";
import { deleteByIdProducto, saveDetalleSalida, startLoading } from "../slices/detalleSalidaSlice";
import { StoreDispatch } from "../store";

export const agregarDetalleSalida = (detalle: DetalleSalida) => {
    return async (dispatch: StoreDispatch) => {
        dispatch(startLoading());
        try {
            dispatch(saveDetalleSalida(detalle));
        } catch (Error) {
            console.log('Error: ', Error);
        };
    };
};

export const eliminarDetalleSalida = (idProducto: number) => {
    return async (dispatch: StoreDispatch) => {
        dispatch(startLoading())
        try {
            dispatch(deleteByIdProducto(idProducto));
        } catch (Error) {
            console.log('Error: ', Error);
        };
    };
};