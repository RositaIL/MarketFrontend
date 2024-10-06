import { createSlice } from "@reduxjs/toolkit";
import { Producto } from "../../marbella/types/Producto";
import { ProductoState } from "../interfaceState";

const initialProduct: Producto[] = [];

type PayloadAction<T> = {
    payload: T;
};

export const productoSlice = createSlice({
    name: "producto",
    initialState: {
        loading: false,
        productos: initialProduct,
        messageError: "",
        operationState: "",
    },
    reducers: {
        startLoading: (state: ProductoState) => {
            state.loading = true;
        },

        clearOperationState: (state: ProductoState) => {
            state.operationState = "";
        },
        handleErrorMessage: (state: ProductoState, { payload }: PayloadAction<string>) => {
            state.messageError = payload;
        },
        clearHandleErrorMessage: (state: ProductoState) => {
            state.messageError = '';
            state.operationState = '';
            state.loading = false;
        },
        getAllProducts: (state: ProductoState, { payload }: PayloadAction<Producto[]>
        ) => {
            state.productos = payload;
            state.loading = false;
            state.messageError = "";
            state.operationState = "";
        },

        saveProducto: (state: ProductoState, { payload }: PayloadAction<Producto>) => {
            state.productos = [...state.productos, payload];
            state.loading = false;
            state.messageError = "";
            state.operationState = "Agregado";
        },

        updateProducto: (state: ProductoState, { payload }: PayloadAction<Producto>) => {
            const index = state.productos.findIndex((producto) => producto.idPro === payload.idPro);
            if (index !== -1) {
                state.productos[index] = payload;
                state.loading = false;
                state.messageError = "";
                state.operationState = "Actualizado";
            }
        },

        deleteProducto: (state: ProductoState, { payload }: PayloadAction<number>) => {
            const index = state.productos.findIndex((producto) => producto.idPro === payload);
            if (index !== -1) {
                state.productos = state.productos.filter(producto => producto.idPro !== payload);
                state.loading = false;
                state.messageError = '';
                state.operationState = 'Eliminando';
            }
        }
    },
});

export const { saveProducto, getAllProducts, updateProducto, deleteProducto, clearOperationState, startLoading, handleErrorMessage, clearHandleErrorMessage } = productoSlice.actions;