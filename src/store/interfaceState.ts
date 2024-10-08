import { Categoria } from "../marbella/types/categoria"
import { Marca } from "../marbella/types/marca"
import { Producto } from "../marbella/types/Producto"
import { Proveedor } from "../marbella/types/proveedor"
import { Rol } from "../marbella/types/rol"
import { Usuario } from "../marbella/types/Usuario"
import { UnidadMedida } from '../marbella/types/unidadMedida';
import { UserAuthenticate } from "./auth/userAuthenticate"
import { DetalleEntrada, EntradaProducto } from "../marbella/types/entrada"


export type AuthState = {
    loading: boolean,
    authenticated: boolean,
    user: UserAuthenticate,
    messageError: string,
    operationState: string,
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
}
export type UsuarioState = {
    loading: boolean,
    usuarios: Usuario[],
    messageError: string,
    operationState: string,
}
export type ProductoState = {
    loading: boolean,
    productos: Producto[],
    messageError: string,
    operationState: string,
}
export type ProveedorState = {
    loading: boolean,
    proveedores: Proveedor[],
    messageError: string,
    operationState: string,
}
export type EntradaProductoState = {
    loading: boolean,
    entradaProductos: EntradaProducto[],
    messageError: string,
    operationState: string,
}
export type DetalleEntradaState = {
    loading: boolean,
    detalleEntradas: DetalleEntrada[],
    messageError: string,
    operationState: string,
}