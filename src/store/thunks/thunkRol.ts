import { marbellaApi } from "../../api/marbellaApi"
import { Rol } from "../../marbella/types/rol"
import { getAllRols } from "../slices/rolSlice"
import { StoreDispatch } from "../store"


export const obtenerRoles = () => {
    return async (dispatch: StoreDispatch) => {
        try {
            const { data } = await marbellaApi.get<Rol[]>('/rol');
            dispatch(getAllRols(data))
        } catch (Error) {
            console.log('ERROR: ', Error);
        };
    };
};