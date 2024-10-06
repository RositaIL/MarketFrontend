import { Categoria } from "../marbella/types/categoria"
import { Marca } from "../marbella/types/marca"
import { Producto } from "../marbella/types/Producto"
import { Proveedor } from "../marbella/types/proveedor"
import { Rol } from "../marbella/types/rol"
import { Usuario } from "../marbella/types/Usuario"
import { UnidadMedida } from '../marbella/types/unidadMedida';


export interface AuthState {
    status: string
    authenticated: boolean,
    user: Usuario
    messageError: string
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