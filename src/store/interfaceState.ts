import { Categoria } from "../marbella/types/categoria"
import { Marca } from "../marbella/types/marca"
import { Producto } from "../marbella/types/Producto"
import { Proveedor } from "../marbella/types/proveedor"
import { Rol } from "../marbella/types/rol"
import { Usuario } from "../marbella/types/Usuario"
import { UnidadMedida } from '../marbella/types/unidadMedida';
import { UserAuthenticate } from "./auth/userAuthenticate"
import { DetalleEntrada, EntradaProducto } from "../marbella/types/entrada"
import { DetalleSalida, SalidaProducto } from "../marbella/types/salida"


export type AuthState = {
    loading: boolean,
    authenticated: boolean,
    user: UserAuthenticate,
    messageError: string,
    operationState: string,
}
export type DataSinPagincionState = {
    marcas: Marca[];
    categorias: Categoria[];
    usuarios: Usuario[];
    proveedores: Proveedor[];
    productos: Producto[];
    unidadMedidas: UnidadMedida[];
}

export type RolState = {
    roles: Rol[],
}

export type UnidadMedidaState = {
    unidadMedidas: UnidadMedida[]
}

export type MarcaState = {
    loading: boolean,
    marcas: Marca[],
    messageError: string,
    operationState: string,
    paginaActual: number,
    totalPagina: number,
    pageSize: number,
}

export type CategoriaState = {
    loading: boolean,
    categorias: Categoria[],
    messageError: string,
    operationState: string,
    paginaActual: number,
    totalPagina: number,
    pageSize: number,
}
export type UsuarioState = {
    loading: boolean,
    usuarios: Usuario[],
    messageError: string,
    operationState: string,
    paginaActual: number,
    totalPagina: number,
    pageSize: number,
}
export type ProductoState = {
    loading: boolean,
    productos: Producto[],
    messageError: string,
    operationState: string,
    paginaActual: number,
    totalPagina: number,
    pageSize: number,
}
export type ProveedorState = {
    loading: boolean,
    proveedores: Proveedor[],
    messageError: string,
    operationState: string,
    paginaActual: number,
    totalPagina: number,
    pageSize: number,
}
export type EntradaProductoState = {
    loading: boolean,
    entradaProductos: EntradaProducto[],
    messageError: string,
    operationState: string,
    paginaActual: number,
    totalPagina: number,
    pageSize: number,
}
export type DetalleEntradaState = {
    loading: boolean,
    detalleEntradas: DetalleEntrada[],
    messageError: string,
    operationState: string,
}
export type SalidaProductoState = {
    loading: boolean,
    salidaProductos: SalidaProducto[],
    messageError: string,
    operationState: string,
    paginaActual: number,
    totalPagina: number,
    pageSize: number,
}
export type DetalleSalidaState = {
    loading: boolean,
    detalleSalidas: DetalleSalida[],
    messageError: string,
    operationState: string,
}
export type ReporteState = {
    loading: boolean,
    reporteStockBajo: Producto[],
    messageError: string,
}