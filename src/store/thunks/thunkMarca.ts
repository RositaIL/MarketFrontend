import axios from "axios";
import { marbellaApi } from "../../api/marbellaApi";
import { Marca } from "../../marbella/types/marca";
import { StoreDispatch } from "../store";
import { getAllMarca, saveMarca, updateMarca, deleteMarca, startLoading, handleErrorMessage, } from "../slices/marcaSlice"

export const obtenerMarcas = () => {
    return async (dispatch: StoreDispatch) => {
        dispatch(startLoading());
        try {
            const { data } = await marbellaApi.get<Marca[]>('/marca');
            setTimeout(() => {
                dispatch(getAllMarca(data))
            }, 1500);
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
                }
            }
            console.log('Error: ', Error);
        }
    }
}

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
                }
            }
            console.log('Error: ', Error);
        }
    }
}

export const agregarMarca = (marca: Marca) => {
    return async (dispatch: StoreDispatch) => {
        dispatch(startLoading());
        try {
            const { data } = await marbellaApi.post('marca', marca);
            dispatch(saveMarca(data));
        } catch (Error) {
            if (axios.isAxiosError(Error)) {
                if (Error.code === "ERR_NETWORK") {
                    dispatch(handleErrorMessage('El servidor no está disponible en este momento. Por favor, intente de nuevo más tarde'));
                } else {
                    const { error }: { error: string } = Error.response!.data;
                    dispatch(handleErrorMessage(error));
                    console.log('Error: ', Error);
                }
            }


        }
    }
}