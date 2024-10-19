
import { Button } from '../../../components/Button';
import { IoMdAdd } from 'react-icons/io';
import { DropdownMenu } from '../../../components/DropdownMenu';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/rootState';
import { Skeleton } from '../../../components/Skeleton';
import { SalidaItem } from './SalidaItem';
import { SalidaProducto } from '../../../types/salida';
import { useEffect, useState } from 'react';
import { MovimientoModal } from '../MoviminetoModal';
import { StoreDispatch } from '../../../../store/store';
import { eliminarSalidaProducto, obtenerSalidaProductos } from '../../../../store/thunks/thunkSalidaProducto';
import { ModalDelete } from '../../../components/ModalDelete';

export const SalidaLista = () => {

    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [isOpenModalDelete, setOpenModalDelete] = useState<boolean>(false);
    const [idSalida, setIdSalida] = useState<number>(0);
    const dispatch: StoreDispatch = useDispatch();
    const { salidaProductos, loading, pageSize, paginaActual } = useSelector((state: RootState) => state.salidaProducto);

    const openModalAdd = () => setIsOpenModal(true);
    const closeModal = () => setIsOpenModal(false);

    const handleSalidaWithLimit = (size: number) => {
        dispatch(obtenerSalidaProductos(0, size))
    }
    const closeModalDelete = () => {
        setOpenModalDelete(false);
    };

    const handleIDSalida = (id: number) => {
        setIdSalida(id);
        setOpenModalDelete(true);
    };

    const removeItemSalida = () => {
        dispatch(eliminarSalidaProducto(idSalida));
        closeModalDelete();
    }

    useEffect(() => {
        dispatch(obtenerSalidaProductos());
    }, [dispatch])

    return (
        <>
            <div className="container flex items-center justify-between p-4">
                <Button onClick={openModalAdd} text={"base"} movimiento={true}>
                    <IoMdAdd className="w-6 h-6" />
                    Agregar nueva salida
                </Button>
                <div className="flex items-center gap-9 ">
                    <DropdownMenu getDataWithLimit={handleSalidaWithLimit} pageSize={pageSize} />
                    {/* <Search name={"marca"} hadleSearch={() => { }} /> */}
                </div>
            </div>
            <table className="min-w-full bg-white">
                <thead className="bg-blue-200 whitespace-nowrap">
                    <tr>
                        <th className="p-4 text-center text-xs font-bold text-gray-700">
                            N°
                        </th>
                        <th className="p-4 text-center text-xs font-bold text-gray-700">
                            FECHA SALIDA
                        </th>
                        <th className="p-4 text-center text-xs font-bold text-gray-700">
                            USUARIO
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
                    ) : (salidaProductos.map((salida: SalidaProducto, index) => {
                        return (
                            <SalidaItem
                                key={salida.idSalida}
                                index={paginaActual * pageSize + index + 1}
                                salida={salida}
                                removeItemSalida={handleIDSalida}
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
            {isOpenModalDelete && (
                <ModalDelete
                    handleDeleteItem={removeItemSalida}
                    closeModalDetele={closeModalDelete}
                />
            )}
        </>
    )
}
