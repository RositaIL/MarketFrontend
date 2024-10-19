import React, { useEffect } from 'react'
import { EntradaProducto } from '../../../types/entrada'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../store/rootState'
import { RiDeleteBin5Line } from 'react-icons/ri'
import { StoreDispatch } from '../../../../store/store'
import { listarProveedorSinPaginada, listarUsuarioSinPaginada } from '../../../../store/thunks/thunkDataSinPaginacion'

type EntradaItemProps = {
    entrada: EntradaProducto,
    index: number,
    eliminarItem: (id: number) => void;
}

export const EntradaItem: React.FC<EntradaItemProps> = ({ entrada, index, eliminarItem }) => {

    const { proveedores, usuarios } = useSelector((state: RootState) => state.dataSinPaginacion);
    const dispatch: StoreDispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth)
    const rolUser = !user.rol.includes('ADMINISTRADOR');

    const handleRemoveEntrada = () => {
        eliminarItem(entrada.idEntrada);
    };

    useEffect(() => {
        dispatch(listarUsuarioSinPaginada());
        dispatch(listarProveedorSinPaginada());
    }, [dispatch]);

    return (
        <tr className="hover:bg-gray-50">
            <td className="p-4 text-center text-gray-600">
                {index}
            </td>
            <td className="p-4 text-center text-gray-600">
                {entrada.fechaEntrada}
            </td>
            <td className="p-4 text-center text-gray-600">
                {usuarios.find(user => user.idUsuario === entrada.idUsuario)?.nombresApellidosUsu}
            </td>
            <td className="p-4 text-center">
                {proveedores.find(proveedor => proveedor.idProveedor === entrada.idProveedor)?.nombreProv}
            </td>
            <td className="p-4 text-center text-gray-600">
                <button className="mr-4" disabled={rolUser} title="Eliminar">
                    <RiDeleteBin5Line
                        onClick={handleRemoveEntrada}
                        className={`w-6 h-6 text-${rolUser ? 'red-200' : 'red-500'} hover:${rolUser ? 'red-200' : 'red-700'}`}
                        style={{ color: rolUser ? '#ffa3a3' : 'red-500' }}
                    />
                </button>
            </td>
        </tr>
    )
}
