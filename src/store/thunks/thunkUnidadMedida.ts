import { marbellaApi } from "../../api/marbellaApi";
import { UnidadMedida } from "../../marbella/types/unidadMedida";
import { getAllUnidadMedida } from "../slices/unidadMediaSlice";
import { StoreDispatch } from "../store"

export const obtenerUnidadMedida = () => {
    return async (dispatch: StoreDispatch) => {
        try {
            const { data } = await marbellaApi.get<UnidadMedida[]>('/medida');
            dispatch(getAllUnidadMedida(data))
        } catch (Error) {
            console.log('ERROR; ', Error);

        }
    }
}