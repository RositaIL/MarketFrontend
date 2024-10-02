import { Marca } from "../marbella/interface/marca"
import { Usuario } from "./auth/usuario"


export interface AuthState {
    status: String
    authenticated: boolean,
    user: Usuario
    messageError: string
}

export interface MarcaState {
    loading: boolean,
    marcas: Marca[],
    messageError: string,
    status: string,
}