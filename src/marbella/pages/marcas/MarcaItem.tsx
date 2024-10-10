
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Marca } from "../../types/marca";
import React from "react";

interface MarcaItemProps {
    marca: Marca,
    actualizarMarca: (marca: Marca) => void
    openShowDelete: (id: number) => void
}

export const MarcaItem: React.FC<MarcaItemProps> = ({ marca, actualizarMarca, openShowDelete }) => {

    const handleUpdateMarca = () => {
        actualizarMarca(marca);
    }
    const handleRemoveMarca = () => {
        openShowDelete(marca.idMarca);
    }

    return (
        <tr className="hover:bg-gray-50">
            <td className="p-4 text-center text-gray-600">
                {marca.idMarca}
            </td>
            <td className="p-4 text-center text-gray-600">
                {marca.nombreMarca}
            </td>
            <td className="p-4 text-center">
                <button onClick={handleUpdateMarca} className="mr-4" title="Editar">
                    <FiEdit className="w-6 h-6 text-blue-400 hover:text-blue-600" />
                </button>
                <button className="mr-4" title="Eliminar">
                    <RiDeleteBin5Line onClick={handleRemoveMarca} className="w-6 h-6 text-red-500 hover:text-red-700" />
                </button>
            </td>
        </tr>

    )
}
