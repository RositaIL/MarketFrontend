
import { Button } from '../../../components/Button';
import { IoMdAdd } from 'react-icons/io';
import { DropdownMenu } from '../../../components/DropdownMenu';
import { Search } from '../../../components/Search';
import { Skeleton } from '../../../components/Skeleton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/rootState';
import { EntradaItem } from './EntradaItem';
import { EntradaProducto } from '../../../types/entrada';
import { useEffect, useState } from 'react';
import { MovimientoModal } from '../MoviminetoModal';
import { StoreDispatch } from '../../../../store/store';
import { obtenerEntradas } from '../../../../store/thunks/thunkEntradaProducto';

export const EntradaLista = () => {

    const [isOpenMOdal, setIsOpenModal] = useState<boolean>(false);
    const dispatch: StoreDispatch = useDispatch();
    const openModalAdd = () => setIsOpenModal(true);

    const { entradaProductos, loading } = useSelector((state: RootState) => state.entradaProducto);
    const closeModal = () => setIsOpenModal(false);

    useEffect(() => {
        dispatch(obtenerEntradas());
    }, [])
    return (
        <>
            <div className="container flex items-center justify-between p-4">
                <Button onClick={openModalAdd} text={"base"}>
                    <IoMdAdd className="w-6 h-6" />
                    Agregar nueva entrada
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
                            FECHA ENTRADA
                        </th>
                        <th className="p-4 text-center text-xs font-bold text-gray-700">
                            USUARIO
                        </th>
                        <th className="p-4 text-center text-xs font-bold text-gray-700">
                            PROVEEDOR
                        </th>
                    </tr>
                </thead>
                <tbody className="whitespace-nowrap">
                    {loading ? (
                        <tr>
                            <td colSpan={3} className="p-2">
                                <Skeleton times={5} className="h-10 w-full" />
                            </td>
                        </tr>
                    ) : (entradaProductos.map((entrada: EntradaProducto) => {
                        return (
                            <EntradaItem
                                key={entrada.idEntrada}
                                entrada={entrada}
                            />
                        );
                    }))}
                </tbody>
            </table>
            {isOpenMOdal && <MovimientoModal handleCloseModal={closeModal} />}
        </>
    )
}
