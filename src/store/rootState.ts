
import {
    AuthState,
    CategoriaState,
    DetalleEntradaState,
    DetalleSalidaState,
    EntradaProductoState,
    MarcaState,
    ProductoState,
    ProveedorState,
    RolState,
    SalidaProductoState,
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
    salidaProducto: SalidaProductoState,
    detalleSalida: DetalleSalidaState,
}
