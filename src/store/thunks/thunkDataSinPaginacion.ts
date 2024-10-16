import { marbellaApi } from "../../api/marbellaApi";
import { Categoria } from "../../marbella/types/categoria";
import { Marca } from "../../marbella/types/marca";
import { PaginationResponse } from "../../marbella/types/paginationResponse";
import { Producto } from "../../marbella/types/Producto";
import { Proveedor } from "../../marbella/types/proveedor";
import { UnidadMedida } from "../../marbella/types/unidadMedida";
import { Usuario } from "../../marbella/types/Usuario";
import { getAllCategoriaNonPage, getAllMarcaNonPage, getAllProductoNonPage, getAllProveedorNonPage, getAllUnidadMedidaNonPage, getAllUsuarioNonPage } from "../slices/dataSinPaginacionSlice";
import { StoreDispatch } from "../store";

export const listarMarcaSinPaginada = () => {
    return async (dispatch: StoreDispatch) => {
        try {
            const { data } = await marbellaApi.get<PaginationResponse<Marca>>(`/marca`);
            dispatch(getAllMarcaNonPage(data.content));
        } catch (Error) {
            console.log('ERROR EN LA PETICION', Error);
        };
    };
};

export const listarCategoriaSinPaginada = () => {
    return async (dispatch: StoreDispatch) => {
        try {
            const { data } = await marbellaApi.get<PaginationResponse<Categoria>>(`/categoria`);
            dispatch(getAllCategoriaNonPage(data.content));
        } catch (Error) {
            console.log('ERROR EN LA PETICION: ', Error);
        };
    };
};

export const listarProductoSinPaginada = () => {
    return async (dispatch: StoreDispatch) => {
        try {
            const { data } = await marbellaApi.get<PaginationResponse<Producto>>(`/producto`);
            dispatch(getAllProductoNonPage(data.content));
        } catch (Error) {
            console.log('ERROR EN LA PETICION: ', Error);
        };
    };
};

export const listarProveedorSinPaginada = () => {
    return async (dispatch: StoreDispatch) => {
        try {
            const { data } = await marbellaApi.get<PaginationResponse<Proveedor>>(`/proveedor`);
            dispatch(getAllProveedorNonPage(data.content));
        } catch (Error) {
            console.log('ERROR EN LA PETICION: ', Error);
        };
    };
};

export const listarUnidadMedidaSinPaginada = () => {
    return async (dispatch: StoreDispatch) => {
        try {
            const { data } = await marbellaApi.get<PaginationResponse<UnidadMedida>>(`/medida`);
            dispatch(getAllUnidadMedidaNonPage(data.content));
        } catch (Error) {
            console.log('ERROR EN LA PETICION: ', Error);
        };
    };
};

export const listarUsuarioSinPaginada = () => {
    return async (dispatch: StoreDispatch) => {
        try {
            const { data } = await marbellaApi.get<PaginationResponse<Usuario>>(`/usuario`);
            dispatch(getAllUsuarioNonPage(data.content));
        } catch (Error) {
            console.log('ERROR EN LA PETICION: ', Error);
        };
    };
};