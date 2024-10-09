

export type SalidaProducto = {
    idSalida: number;
    fechaSalida: string;
    idUsuario: number;
    detalleSalida: DetalleSalida[];
}

export type DetalleSalida = {
    idSalida: number;
    idProducto: number | string;
    cantidad: number | string;
    precio: number | string;
}