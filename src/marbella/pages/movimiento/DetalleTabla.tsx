

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootState'
import { useEffect } from 'react';
import { obtenerProductos } from '../../../store/thunks/thunkProducto';
import { StoreDispatch } from '../../../store/store';

export const DetalleTabla = () => {

    const dispatch: StoreDispatch = useDispatch();
    const { detalleEntradas } = useSelector((state: RootState) => state.detalleEntrada);
    const { productos } = useSelector((state: RootState) => state.producto);

    useEffect(() => {
        dispatch(obtenerProductos())
    }, [])
    return (
        <table className="min-w-full bg-white mt-3" style={{ border: '2px dashed lightgray' }}>
            <thead className="bg-[#007bff] whitespace-nowrap">
                <tr>
                    <th className="p-2 text-center text-xs font-bold text-white">
                        PRODUCTO
                    </th>
                    <th className="p-2 text-center text-xs font-bold text-white">
                        DESCRIPCION
                    </th>
                    <th className="p-2 text-center text-xs font-bold text-white">
                        CANTIDAD
                    </th>
                    <th className="p-2 text-center text-xs font-bold text-white">
                        PRECIO (S/.)
                    </th>
                </tr>
            </thead>
            <tbody className="whitespace-nowrap">
                {detalleEntradas.map((detalle, index) => {
                    return (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="p-1 text-center text-gray-600">{detalle.idProducto}</td>
                            <td className="p-1 text-center text-gray-600">{productos.find(producto => producto.idPro === detalle.idProducto)?.descripcionPro}</td>
                            <td className="p-1 text-center text-gray-600">{detalle.cantidad}</td>
                            <td className="p-1 text-center text-gray-600"> S/. {detalle.precio}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
