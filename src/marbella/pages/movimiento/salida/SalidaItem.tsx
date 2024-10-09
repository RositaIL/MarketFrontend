import React from 'react'
import { SalidaProducto } from '../../../types/salida';
import { RiDeleteBin5Line } from 'react-icons/ri';

type SalidaItemProps = {
    salida: SalidaProducto
}

export const SalidaItem: React.FC<SalidaItemProps> = ({ salida }) => {

    const handleRemoveMarca = () => { }
    return (
        <tr className="hover:bg-gray-50">
            <td className="p-4 text-center text-gray-600">
                {salida.idSalida}
            </td>
            <td className="p-4 text-center text-gray-600">
                {salida.fechaSalida}
            </td>
            <td className="p-4 text-center text-gray-600">
                {salida.idUsuario}
            </td>
            <td className="p-4 text-center text-gray-600">
                {salida.idUsuario}
            </td>
            <td className="p-4 text-center">
                <button className="mr-4" title="Eliminar">
                    <RiDeleteBin5Line onClick={handleRemoveMarca} className="w-6 h-6 text-red-500 hover:text-red-700" />
                </button>
            </td>
        </tr>
    )
}
