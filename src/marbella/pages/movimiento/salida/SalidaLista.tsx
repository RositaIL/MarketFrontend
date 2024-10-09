
import { Button } from '../../../components/Button';
import { IoMdAdd } from 'react-icons/io';
import { DropdownMenu } from '../../../components/DropdownMenu';
import { Search } from '../../../components/Search';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/rootState';
import { Skeleton } from '../../../components/Skeleton';
import { SalidaItem } from './SalidaItem';
import { SalidaProducto } from '../../../types/salida';
import { useEffect, useState } from 'react';
import { MovimientoModal } from '../MoviminetoModal';
import { StoreDispatch } from '../../../../store/store';
import { obtenerSalidaProductos } from '../../../../store/thunks/thunkSalidaProducto';

export const SalidaLista = () => {

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const dispatch: StoreDispatch = useDispatch();
    const { salidaProductos, loading } = useSelector((state: RootState) => state.salidaProducto);

    const openModalAdd = () => setIsOpenModal(true);
    const closeModal = () => setIsOpenModal(false);

    useEffect(() => {
        dispatch(obtenerSalidaProductos());
    }, [])

    return (
        <>
            <div className="container flex items-center justify-between p-4">
                <Button onClick={openModalAdd} text={"base"}>
                    <IoMdAdd className="w-6 h-6" />
                    Agregar nueva salida
                </Button>
                <div className="flex items-center gap-9 ">
                    <DropdownMenu getDataWithLimit={() => { }} pageSize={6} />
                    <Search name={"marca"} hadleSearch={() => { }} />
                </div>
            </div>
            <table className="min-w-full bg-white">
                <thead className="bg-blue-200 whitespace-nowrap">
                    <tr>
                        <th className="p-4 text-center text-xs font-bold text-gray-700">
                            PRODUCTO
                        </th>
                        <th className="p-4 text-center text-xs font-bold text-gray-700">
                            DESCRIPCION
                        </th>
                        <th className="p-4 text-center text-xs font-bold text-gray-700">
                            CANTIDAD
                        </th>
                        <th className="p-4 text-center text-xs font-bold text-gray-700">
                            PRECIO
                        </th>
                        <th className="p-4 text-center text-xs font-bold text-gray-700">
                            ACCIONES
                        </th>
                    </tr>
                </thead>
                <tbody className="whitespace-nowrap">
                    {loading ? (
                        <tr>
                            <td colSpan={5} className="p-2">
                                <Skeleton times={5} className="h-10 w-full" />
                            </td>
                        </tr>
                    ) : (salidaProductos.map((salida: SalidaProducto) => {
                        return (
                            <SalidaItem
                                key={salida.idSalida}
                                salida={salida}
                            />
                        );
                    }))}
                </tbody>
            </table>
            {isOpenModal &&
                <MovimientoModal
                    handleCloseModal={closeModal}
                    isIngreso={false}
                />
            }
        </>
    )
}
