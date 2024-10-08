import React from 'react'
import { EntradaProducto } from '../../../types/entrada'

type EntradaItemProps = {
    entrada: EntradaProducto
}

export const EntradaItem: React.FC<EntradaItemProps> = ({ entrada }) => {
    return (
        <tr className="hover:bg-gray-50">
            <td className="p-4 text-center text-gray-600">
                {entrada.fechaEntrada}
            </td>
            <td className="p-4 text-center text-gray-600">
                {entrada.idUsuario}
            </td>
            <td className="p-4 text-center">
                {entrada.idProveedor}
                {/* <button onClick={handleUpdateMarca} className="mr-4" title="Editar">
                    <FiEdit className="w-6 h-6 text-blue-400 hover:text-blue-600" />
                </button>
                <button className="mr-4" title="Eliminar">
                    <RiDeleteBin5Line onClick={handleRemoveMarca} className="w-6 h-6 text-red-500 hover:text-red-700" />
                </button> */}
            </td>
        </tr>
    )
}
