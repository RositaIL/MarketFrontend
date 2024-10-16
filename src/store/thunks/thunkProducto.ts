import { StoreDispatch } from "../store"
import axios from "axios";
import { marbellaApi } from "../../api/marbellaApi";
import { Producto } from "../../marbella/types/Producto";
import { getAllProducts, startLoading, handleErrorMessage, updateProducto, saveProducto, deleteProducto } from "../slices/productoSlice"
import { PaginationResponse } from "../../marbella/types/paginationResponse";

export const obtenerProductos = (page: number = 0, size: number = 3, name: string = '') => {
    return async (dispatch: StoreDispatch) => {
        dispatch(startLoading());
        try {
            const { data } = await marbellaApi.get<PaginationResponse<Producto>>(`/producto?page=${page}&size=${size}&nombre=${name}`);
            setTimeout(() => {
                dispatch(getAllProducts(data))
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

export const agregarProducto = (producto: Producto) => {
    return async (dispatch: StoreDispatch) => {
        dispatch(startLoading());
        try {
            await marbellaApi.post<Producto>('/producto', producto);
            dispatch(saveProducto());
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

export const actualizarProducto = (idProducto: number, producto: Producto) => {
    return async (dispatch: StoreDispatch) => {
        dispatch(startLoading());
        try {
            const { data } = await marbellaApi.put<Producto>(`/producto/${idProducto}`, producto);
            dispatch(updateProducto(data))
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

export const eliminarProducto = (idProducto: number) => {
    return async (dispatch: StoreDispatch) => {
        dispatch(startLoading());
        try {
            await marbellaApi.delete(`/producto/${idProducto}`);
            dispatch(deleteProducto(idProducto));
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

export const filtrarProductoPorNombre = (page: number = 0, size: number = 3, name: string = '') => {
    return async (dispatch: StoreDispatch) => {
        try {
            const { data } = await marbellaApi.get<PaginationResponse<Producto>>(`/producto?page=${page}&size=${size}&nombre=${name}`);
            dispatch(getAllProducts(data))
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

export const buscarPorIdProducto = async (idProducto: number) => {
    try {
        const { data } = await marbellaApi.get<Producto>(`/producto/${idProducto}`);
        return data;
    } catch (Error) {
        console.log("Error: ", Error);
    };
};