import { checkingMarca, clearSuccessMessage, deleteByIdMarca, getAllMarca, handleErrorMessage, updateMarca } from "../slices/marcaSlice"
import { marbellaApi } from "../../api/marbellaApi";
import { Marca } from "../../marbella/interface/marca";
import axios from "axios";

export const obtenerMarcas = () => {
    return async (dispatch: any) => {
        dispatch(checkingMarca());
        try {
            const { data } = await marbellaApi.get<Marca[]>('/marca');
            setTimeout(() => {
                dispatch(getAllMarca(data))
            }, 1500);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                if (error.code === "ERR_NETWORK") {
                    dispatch(handleErrorMessage('El servidor no está disponible en este momento. Por favor, intente de nuevo más tarde'));
                    dispatch(checkingMarca());
                }
                console.log('ERROR: ', error);
            }
        }
    }
}

export const actualizarMarca = (id: string, marca: Marca) => {
    return async (dispatch: any) => {
        try {
            const { data } = await marbellaApi.put<Marca>(`/marca/${id}`, marca);
            dispatch(updateMarca(data))
            setTimeout(() => {
                dispatch(clearSuccessMessage());
            }, 1500)
        } catch (Error) {
            if (axios.isAxiosError(Error)) {
                if (Error.code === "ERR_NETWORK") {
                    dispatch(handleErrorMessage('El servidor no está disponible en este momento. Por favor, intente de nuevo más tarde'));
                } else {
                    const { error }: { error: string } = Error.response?.data;
                    dispatch(handleErrorMessage(error));
                }
            }
            console.log('Error: ', Error);
        }
    }
}

export const eliminarMarca = (id: string) => {
    return async (dispatch: any) => {
        try {
            await marbellaApi.delete(`/marca/${id}`);
            dispatch(deleteByIdMarca(id));
            setTimeout(() => {
                dispatch(clearSuccessMessage());
            }, 1500);
        } catch (Error) {
            if (axios.isAxiosError(Error)) {
                if (Error.code === "ERR_NETWORK") {
                    dispatch(handleErrorMessage('El servidor no está disponible en este momento. Por favor, intente de nuevo más tarde'));
                } else {
                    const { error }: { error: string } = Error.response?.data;
                    dispatch(handleErrorMessage(error));
                }
            }
            console.log('Error: ', Error);
        }
    }
}