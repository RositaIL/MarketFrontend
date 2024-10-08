
import {
    AuthState,
    CategoriaState,
    DetalleEntradaState,
    EntradaProductoState,
    MarcaState,
    ProductoState,
    ProveedorState,
    RolState,
    UnidadMedidaState,
    UsuarioState,
} from "./interfaceState";

export type RootState = {
    auth: AuthState;
    rol: RolState;
    unidadMedida: UnidadMedidaState;
    marca: MarcaState;
    categoria: CategoriaState;
    usuario: UsuarioState;
    producto: ProductoState;
    proveedor: ProveedorState,
    entradaProducto: EntradaProductoState,
    detalleEntrada: DetalleEntradaState,
}
