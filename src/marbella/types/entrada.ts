
export type EntradaProducto = {
    idEntrada: number;
    fechaEntrada: string;
    idUsuario: number;
    idProveedor: number;
    detalleEntrada: DetalleEntrada[];
}

export type DetalleEntrada = {
    idProducto: number | string;
    cantidad: number | string;
    precio: number | string;
}
