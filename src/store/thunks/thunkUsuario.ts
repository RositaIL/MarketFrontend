
import { marbellaApi } from "../../api/marbellaApi";
import axios from "axios";
import { StoreDispatch } from "../store";
import { Usuario } from "../../marbella/types/Usuario";
import { getAllUsuario, saveUsuario, updateUsuario, deleteUsuario, handleErrorMessage, startLoading } from "../slices/usuarioSlice";
import { PaginationResponse } from "../../marbella/types/paginationResponse";

export const obtenerUsuarios = (page: number = 0, size: number = 3, name: string = '') => {
    return async (dispatch: StoreDispatch) => {
        dispatch(startLoading());
        try {
            const { data } = await marbellaApi.get<PaginationResponse<Usuario>>(`/usuario?page=${page}&size=${size}&nombre=${name}`);
            setTimeout(() => {
                dispatch(getAllUsuario(data));
            }, 1400)
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

export const guardarUsuario = (usuario: Usuario) => {
    return async (dispatch: StoreDispatch) => {
        dispatch(startLoading());
        try {
            await marbellaApi.post<Usuario>('/usuario', usuario);
            dispatch(saveUsuario());
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

export const actualizarUsuario = (idUsuario: number, usuario: Usuario) => {
    return async (dispatch: StoreDispatch) => {
        dispatch(startLoading());
        try {
            const { data } = await marbellaApi.put<Usuario>(`/usuario/${idUsuario}`, usuario);
            dispatch(updateUsuario(data));
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

export const eliminarUsuario = (idUsuario: number) => {
    return async (dispatch: StoreDispatch) => {
        dispatch(startLoading());
        try {
            await marbellaApi.delete(`/usuario/${idUsuario}`);
            dispatch(deleteUsuario(idUsuario));
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

export const filtrarUsuarioPorNombre = (page: number = 0, size: number = 3, name: string = '') => {
    return async (dispatch: StoreDispatch) => {
        try {
            const { data } = await marbellaApi.get<PaginationResponse<Usuario>>(`/usuario?page=${page}&size=${size}&nombre=${name}`);
            dispatch(getAllUsuario(data));
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