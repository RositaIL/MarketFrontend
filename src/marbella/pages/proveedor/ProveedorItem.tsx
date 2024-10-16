import React from 'react'
import { Proveedor } from '../../types/proveedor'
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin5Line } from 'react-icons/ri';

type ProveedorItemProps = {
    proveedor: Proveedor,
    index: number,
    handleproveedor: (proveedor: Proveedor) => void;
    openModalDelete: (idProveedor: number) => void;
}

export const ProveedorItem: React.FC<ProveedorItemProps> = ({ proveedor, index, handleproveedor, openModalDelete }) => {

    const handleRemoveProveedor = () => {
        openModalDelete(proveedor.idProveedor);
    }
    const hanldeUpdateProveedor = () => {
        handleproveedor(proveedor);
    }
    return (
        <tr className="hover:bg-gray-50">
            <td className="p-4 text-center text-gray-600">{index}</td>
            <td className="p-4 text-center text-gray-600">{proveedor.nombreProv}</td>
            <td className="p-4 text-center text-gray-600">
                {proveedor.direccProv}
            </td>
            <td className="p-4 text-center text-gray-600">{proveedor.telefProv}</td>
            <td className="p-4 text-center text-gray-600">{proveedor.rucProv}</td>
            <td className="p-4 text-center text-gray-600">{proveedor.emailProv}</td>
            <td className="p-4 text-center text-gray-600">{proveedor.nomRepresentante}</td>
            <td className="p-4 text-center">
                <button onClick={hanldeUpdateProveedor} className="mr-4" title="Editar">
                    <FiEdit className="w-6 h-6 text-blue-400 hover:text-blue-600" />
                </button>
                <button className="mr-4" title="Eliminar">
                    <RiDeleteBin5Line
                        onClick={handleRemoveProveedor}
                        className="w-6 h-6 text-red-500 hover:text-red-700"
                    />
                </button>
            </td>
        </tr>
    )
}
