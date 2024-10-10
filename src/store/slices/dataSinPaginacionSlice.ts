import { createSlice } from "@reduxjs/toolkit";
import { Marca } from "../../marbella/types/marca";
import { Producto } from "../../marbella/types/Producto";
import { Proveedor } from "../../marbella/types/proveedor";
import { Categoria } from "../../marbella/types/categoria";
import { UnidadMedida } from "../../marbella/types/unidadMedida";
import { DataSinPagincionState } from "../interfaceState";
import { Usuario } from "../../marbella/types/Usuario";


const marca: Marca[] = [];
const producto: Producto[] = [];
const proveedor: Proveedor[] = [];
const usuario: Usuario[] = [];
const categoria: Categoria[] = [];
const unidadMedida: UnidadMedida[] = [];

type PayloadAction<T> = {
    payload: T
};

export const dataSinPaginacionSlice = createSlice({
    name: 'dataSinPaginacion',
    initialState: {
        marcas: marca,
        productos: producto,
        usuarios: usuario,
        proveedores: proveedor,
        categorias: categoria,
        unidadMedidas: unidadMedida
    },

    reducers: {
        getAllMarcaNonPage: (state: DataSinPagincionState, { payload }: PayloadAction<Marca[]>) => {
            state.marcas = payload;
        },
        getAllCategoriaNonPage: (state: DataSinPagincionState, { payload }: PayloadAction<Categoria[]>) => {
            state.categorias = payload;
        },
        getAllUsuarioNonPage: (state: DataSinPagincionState, { payload }: PayloadAction<Usuario[]>) => {
            state.usuarios = payload;
        },
        getAllProductoNonPage: (state: DataSinPagincionState, { payload }: PayloadAction<Producto[]>) => {
            state.productos = payload;
        },
        getAllProveedorNonPage: (state: DataSinPagincionState, { payload }: PayloadAction<Proveedor[]>) => {
            state.proveedores = payload;
        },
        getAllUnidadMedidaNonPage: (state: DataSinPagincionState, { payload }: PayloadAction<UnidadMedida[]>) => {
            state.unidadMedidas = payload;
        },
    }
});

export const { getAllCategoriaNonPage, getAllMarcaNonPage, getAllUsuarioNonPage, getAllProductoNonPage, getAllProveedorNonPage, getAllUnidadMedidaNonPage } = dataSinPaginacionSlice.actions;