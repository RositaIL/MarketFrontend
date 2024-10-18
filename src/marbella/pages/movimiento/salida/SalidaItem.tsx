import React, { useEffect } from 'react'
import { SalidaProducto } from '../../../types/salida';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { StoreDispatch } from '../../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { listarUsuarioSinPaginada } from '../../../../store/thunks/thunkDataSinPaginacion';
import { RootState } from '../../../../store/rootState';

type SalidaItemProps = {
    salida: SalidaProducto,
    index: number,
    removeItemSalida: (idSalida: number) => void
}

export const SalidaItem: React.FC<SalidaItemProps> = ({ salida, index, removeItemSalida }) => {

    const dispatch: StoreDispatch = useDispatch();
    const { usuarios } = useSelector((state: RootState) => state.dataSinPaginacion);
    const { user } = useSelector((state: RootState) => state.auth)
    const rolUser = !user.rol.includes('ADMINISTRADOR');

    const handleRemoveMarca = () => removeItemSalida(salida.idSalida)
    useEffect(() => {
        dispatch(listarUsuarioSinPaginada());
    }, [dispatch])
    return (
        <tr className="hover:bg-gray-50">
            <td className="p-4 text-center text-gray-600">
                {index}
            </td>
            <td className="p-4 text-center text-gray-600">
                {salida.fechaSalida}
            </td>
            <td className="p-4 text-center text-gray-600">
                {usuarios.find(user => user.idUsuario === salida.idUsuario)?.nombresApellidosUsu}
            </td>
            <td className="p-4 text-center">
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
