import { marbellaApi } from "../../api/marbellaApi";
import axios from "axios";
import { Proveedor } from "../../marbella/types/proveedor";
import { StoreDispatch } from "../store";
import { deleteProveedor, getAllProveedor, handleErrorMessage, saveProveedor, startLoading, updateProveedor } from "../slices/proveedorSlice";
import { PaginationResponse } from "../../marbella/types/paginationResponse";



export const obtenerProveedores = (page: number = 0, size: number = 3, name: string = '') => {
    return async (dispatch: StoreDispatch) => {
        dispatch(startLoading());
        try {
            const { data } = await marbellaApi.get<PaginationResponse<Proveedor>>(`/proveedor?page=${page}&size=${size}&nombre=${name}`);
            setTimeout(() => {
                dispatch(getAllProveedor(data));
            }, 1400);
        } catch (Error) {
            if (axios.isAxiosError(Error)) {
                if (Error.code === "ERR_NETWORK") {
                    dispatch(handleErrorMessage("El servidor no está disponible en este momento. Por favor, intente de nuevo más tarde"));
                };
            };
        };
    };
};

export const agregarProveedor = (proveedor: Proveedor) => {
    return async (dispatch: StoreDispatch) => {
        dispatch(startLoading());
        try {
            const { data } = await marbellaApi.post<Proveedor>('/proveedor', proveedor);
            dispatch(saveProveedor(data));
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

export const actualizarProveedor = (idProveedor: number, proveedor: Proveedor) => {
    return async (dispatch: StoreDispatch) => {
        dispatch(startLoading());
        try {
            const { data } = await marbellaApi.put<Proveedor>(`proveedor/${idProveedor}`, proveedor);
            dispatch(updateProveedor(data))
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

export const eliminarProveedor = (idProveedor: number) => {
    return async (dispatch: StoreDispatch) => {
        dispatch(startLoading());
        try {
            await marbellaApi.delete(`/proveedor/${idProveedor}`);
            dispatch(deleteProveedor(idProveedor));
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

export const filtrarProveedorPorNombre = (page: number = 0, size: number = 3, name: string = '') => {
    return async (dispatch: StoreDispatch) => {
        try {
            const { data } = await marbellaApi.get<PaginationResponse<Proveedor>>(`/proveedor?page=${page}&size=${size}&nombre=${name}`);
            dispatch(getAllProveedor(data));
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