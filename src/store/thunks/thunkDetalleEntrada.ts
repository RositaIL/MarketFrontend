import { DetalleEntrada } from "../../marbella/types/entrada";
import { saveDetalleEntrada, deleteByIdProducto, startLoading } from "../slices/detalleEntradaSlice"
import { StoreDispatch } from "../store"


export const agregarDetalleEntrada = (detalle: DetalleEntrada) => {
    return async (dispatch: StoreDispatch) => {
        dispatch(startLoading());
        try {
            dispatch(saveDetalleEntrada(detalle));
        } catch (Error) {
            console.log('Error: ', Error);
        };
    };
};

export const eliminarDetalleEntrada = (idProducto: number) => {
    return async (dispatch: StoreDispatch) => {
        dispatch(startLoading());
        try {
            dispatch(deleteByIdProducto(idProducto));
        } catch (Error) {
            console.log('Error: ', Error);
        };
    };
};