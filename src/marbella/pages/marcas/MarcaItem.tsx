
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { Marca } from "../../types/marca";
import React from "react";
import { RootState } from "../../../store/rootState";
import { useSelector } from "react-redux";

interface MarcaItemProps {
    marca: Marca,
    index: number,
    actualizarMarca: (marca: Marca) => void
    openShowDelete: (id: number) => void
}

export const MarcaItem: React.FC<MarcaItemProps> = ({ marca, index, actualizarMarca, openShowDelete }) => {

    const { user } = useSelector((state: RootState) => state.auth)

    const rolUser = !user.rol.includes('ADMINISTRADOR');

    const handleUpdateMarca = () => {
        actualizarMarca(marca);
    }
    const handleRemoveMarca = () => {
        openShowDelete(marca.idMarca);
    }

    return (
        <tr className="hover:bg-gray-50">
            <td className="p-4 text-center text-gray-600">
                {index}
            </td>
            <td className="p-4 text-center text-gray-600">
                {marca.nombreMarca}
            </td>
            <td className="p-4 text-center">
                <button onClick={handleUpdateMarca} disabled={rolUser} className="mr-4" title="Editar">
                    <FiEdit
                        className={`w-6 h-6 text-${rolUser ? 'red-200' : 'blue-400'} hover:${rolUser ? 'red-200' : 'blue-600'}`}
                        style={{ color: rolUser ? '#ffa3a3' : 'blue-400' }}
                    />
                </button>
                <button className="mr-4" disabled={rolUser} title="Eliminar">
                    <RiDeleteBin5Line
                        onClick={handleRemoveMarca}
                        className={`w-6 h-6 text-${rolUser ? 'red-200' : 'red-500'} hover:${rolUser ? 'red-200' : 'red-700'}`}
                        style={{ color: rolUser ? '#ffa3a3' : 'red-500' }}
                    />
                </button>
            </td>
        </tr>

    )
}
