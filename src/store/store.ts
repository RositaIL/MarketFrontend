
import { configureStore } from "@reduxjs/toolkit"
import { marcaSlice } from "./slices/marcaSlice"
import { categoriaSlice } from "./slices/categoriaSlice"
import { productoSlice } from "./slices/productoSlice"
import { proveedorSlice } from "./slices/proveedorSlice"
import { usuarioSlice } from "./slices/usuarioSlice"
import { rolSlice } from "./slices/rolSlice"
import { unidadMedidaSlice } from "./slices/unidadMediaSlice"
import { authSlice } from "./auth/authSlice"
import { detalleEntradaSlice } from "./slices/detalleEntradaSlice"
import { entradaProductoSlice } from "./slices/entradaProductoSlice"
import { salidaProductoSlice } from "./slices/salidaProductoSlice"
import { detalleSalidaSlice } from "./slices/detalleSalidaSlice"
import { dataSinPaginacionSlice } from "./slices/dataSinPaginacionSlice"
import { reporteSlice } from "./slices/reporteSlice"

export const store = configureStore(
    {
        reducer: {
            auth: authSlice.reducer,
            rol: rolSlice.reducer,
            dataSinPaginacion: dataSinPaginacionSlice.reducer,
            unidadMedida: unidadMedidaSlice.reducer,
            marca: marcaSlice.reducer,
            categoria: categoriaSlice.reducer,
            producto: productoSlice.reducer,
            proveedor: proveedorSlice.reducer,
            usuario: usuarioSlice.reducer,
            entradaProducto: entradaProductoSlice.reducer,
            detalleEntrada: detalleEntradaSlice.reducer,
            salidaProducto: salidaProductoSlice.reducer,
            detalleSalida: detalleSalidaSlice.reducer,
            reporte: reporteSlice.reducer,
        },
    }
)

export type StoreDispatch = typeof store.dispatch;
