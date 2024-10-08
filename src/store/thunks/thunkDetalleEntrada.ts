import { DetalleEntrada } from "../../marbella/types/entrada";
import { saveDetalleEntrada, startLoading } from "../slices/detalleEntradaSlice"
import { StoreDispatch } from "../store"


export const agregarDetalleEntrada = (detalle: DetalleEntrada) => {
    return async (dispatch: StoreDispatch) => {
        dispatch(startLoading());
        try {
            dispatch(saveDetalleEntrada(detalle));
        } catch (Error) {
            console.log('Error: ', Error);

        }
    }
}