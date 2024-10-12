

import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../store/rootState'
import React, { useEffect } from 'react';
import { obtenerProductos } from '../../../store/thunks/thunkProducto';
import { StoreDispatch } from '../../../store/store';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { eliminarDetalleEntrada } from '../../../store/thunks/thunkDetalleEntrada';
import { eliminarDetalleSalida } from '../../../store/thunks/thunkDetalleSalida';

type DetalleSalidaProps = {
    detalleLista: [];
    isIngreso: boolean;
}

export const DetalleTabla: React.FC<DetalleSalidaProps> = ({ detalleLista, isIngreso }) => {

    const dispatch: StoreDispatch = useDispatch();
    const { productos } = useSelector((state: RootState) => state.dataSinPaginacion);
    const deleteItemDeatelle = (id: number) => {
        if (!id) return;
        if (isIngreso) {
            dispatch(eliminarDetalleEntrada(id));
        } else dispatch(eliminarDetalleSalida(id));
    }


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
                    {isIngreso && (
                        <th className="p-2 text-center text-xs font-bold text-white">
                            PRECIO (S/.)
                        </th>
                    )}
                    <th className="p-2 text-center text-xs font-bold text-white">
                    </th>
                </tr>
            </thead>
            <tbody className="whitespace-nowrap">
                {detalleLista.map((detalle, index) => {
                    return (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="p-1 text-center text-gray-600">{productos.find(producto => producto.idPro === detalle['idProducto'])?.nombrePro}</td>
                            <td className="p-1 text-center text-gray-600">{productos.find(producto => producto.idPro === detalle['idProducto'])?.descripcionPro}</td>
                            <td className="p-1 text-center text-gray-600">{detalle['cantidad']}</td>
                            {isIngreso && <td className="p-1 text-center text-gray-600"> S/. {detalle['precio']}</td>}
                            <td className="p-1 text-center text-gray-600">
                                <button className="mr-4" title="Eliminar" type='button'>
                                    <RiDeleteBin5Line onClick={() => deleteItemDeatelle(detalle['idProducto'])} className="w-5 h-5 text-center text-red-500 hover:text-red-700" />
                                </button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}
