
import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "./auth"
import { marcaSlice } from "./slices/marcaSlice"
import { categoriaSlice } from "./slices/categoriaSlice"
import { productoSlice } from "./slices/productoSlice"
import { proveedorSlice } from "./slices/proveedorSlice"
import { usuarioSlice } from "./slices/usuarioSlice"
import { rolSlice } from "./slices/rolSlice"
import { unidadMedidaSlice } from "./slices/unidadMediaSlice"

export const store = configureStore(
    {
        reducer: {
            auth: authSlice.reducer,
            rol: rolSlice.reducer,
            unidadMedida: unidadMedidaSlice.reducer,
            marca: marcaSlice.reducer,
            categoria: categoriaSlice.reducer,
            producto: productoSlice.reducer,
            proveedor: proveedorSlice.reducer,
            usuario: usuarioSlice.reducer,
        },
    }
)

export type StoreDispatch = typeof store.dispatch;
