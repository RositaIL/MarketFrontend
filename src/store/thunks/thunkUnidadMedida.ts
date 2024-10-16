import { marbellaApi } from "../../api/marbellaApi";
import { PaginationResponse } from "../../marbella/types/paginationResponse";
import { UnidadMedida } from "../../marbella/types/unidadMedida";
import { getAllUnidadMedida } from "../slices/unidadMediaSlice";
import { StoreDispatch } from "../store"

export const obtenerUnidadMedida = () => {
    return async (dispatch: StoreDispatch) => {
        try {
            const { data } = await marbellaApi.get<PaginationResponse<UnidadMedida>>('/medida');
            dispatch(getAllUnidadMedida(data))
        } catch (Error) {
            console.log('ERROR; ', Error);
        };
    };
};