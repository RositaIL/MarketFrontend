import axios from "axios";
import { marbellaApi } from "../../api/marbellaApi";
import { Marca } from "../../marbella/types/marca";
import { StoreDispatch } from "../store";
import { getAllMarca, saveMarca, updateMarca, deleteMarca, startLoading, handleErrorMessage, searchMarca, } from "../slices/marcaSlice"
import { PaginationResponse } from "../../marbella/types/paginationResponse";

export const obtenerMarcas = (page: number = 0, size: number = 5, name: string = '') => {
    return async (dispatch: StoreDispatch) => {
        dispatch(startLoading());
        try {
            const { data } = await marbellaApi.get<PaginationResponse<Marca>>(`/marca?page=${page}&size=${size}&nombre=${name}`);
            setTimeout(() => {
                dispatch(getAllMarca(data))
            }, 1000);
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

export const actualizarMarca = (id: number, marca: Marca) => {
    return async (dispatch: StoreDispatch) => {
        dispatch(startLoading());
        try {
            const { data } = await marbellaApi.put<Marca>(`/marca/${id}`, marca);
            dispatch(updateMarca(data));
        } catch (Error) {
            if (axios.isAxiosError(Error)) {
                if (Error.code === "ERR_NETWORK") {
                    dispatch(handleErrorMessage('El servidor no está disponible en este momento. Por favor, intente de nuevo más tarde'));
                } else {
                    const { error }: { error: string } = Error.response!.data;
                    dispatch(handleErrorMessage(error));
                };
            };
        };
    };
};

export const eliminarMarca = (id: number) => {
    return async (dispatch: StoreDispatch) => {
        dispatch(startLoading());
        try {
            await marbellaApi.delete(`/marca/${id}`);
            dispatch(deleteMarca(id));
        } catch (Error) {
            if (axios.isAxiosError(Error)) {
                if (Error.code === "ERR_NETWORK") {
                    dispatch(handleErrorMessage('El servidor no está disponible en este momento. Por favor, intente de nuevo más tarde'));
                } else {
                    const { error }: { error: string } = Error.response!.data;
                    dispatch(handleErrorMessage(error));
                };
            };
        };
    };
};

export const agregarMarca = (marca: Marca) => {
    return async (dispatch: StoreDispatch) => {
        dispatch(startLoading());
        try {
            await marbellaApi.post('marca', marca);
            dispatch(saveMarca());
        } catch (Error) {
            if (axios.isAxiosError(Error)) {
                if (Error.code === "ERR_NETWORK") {
                    dispatch(handleErrorMessage('El servidor no está disponible en este momento. Por favor, intente de nuevo más tarde'));
                } else {
                    const { error }: { error: string } = Error.response!.data;
                    dispatch(handleErrorMessage(error));
                };
            };
        };
    };
};

export const filtrarMarcaPorNombre = (page: number = 0, size: number = 3, name: string = '') => {
    return async (dispatch: StoreDispatch) => {
        try {
            const { data } = await marbellaApi.get<PaginationResponse<Marca>>(`/marca?page=${page}&size=${size}&nombre=${name}`);
            dispatch(searchMarca(data));
        } catch (Error) {
            if (axios.isAxiosError(Error)) {
                if (Error.code === "ERR_NETWORK") {
                    dispatch(handleErrorMessage('El servidor no está disponible en este momento. Por favor, intente de nuevo más tarde'));
                } else {
                    const { error }: { error: string } = Error.response!.data;
                    dispatch(handleErrorMessage(error));
                };
            };
        };
    };
};