
import {
    AuthState,
    CategoriaState,
    DataSinPagincionState,
    DetalleEntradaState,
    DetalleSalidaState,
    EntradaProductoState,
    MarcaState,
    ProductoState,
    ProveedorState,
    ReporteState,
    RolState,
    SalidaProductoState,
    UnidadMedidaState,
    UsuarioState,
} from "./interfaceState";

export type RootState = {
    auth: AuthState;
    rol: RolState;
    dataSinPaginacion: DataSinPagincionState;
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
    reporte: ReporteState,
}
