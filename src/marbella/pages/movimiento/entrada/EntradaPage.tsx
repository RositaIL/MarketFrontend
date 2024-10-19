
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../store/rootState'
import { FaCircleCheck } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { EntradaLista } from './EntradaLista';
import { Pagination } from '../../../components/Pagination';
import { StoreDispatch } from '../../../../store/store';
import { obtenerEntradas } from '../../../../store/thunks/thunkEntradaProducto';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { clearHandleErrorMessage, clearOperationState } from '../../../../store/slices/entradaProductoSlice';

export const EntradaPage = () => {

    const dispatch: StoreDispatch = useDispatch();
    const { operationState, pageSize, paginaActual, totalPagina, messageError } = useSelector((state: RootState) => state.entradaProducto);

    const handlePageChange = (newPage: number) => {
        dispatch(obtenerEntradas(newPage, pageSize));
    };

    useEffect(() => {
        if (messageError) {
            Swal.fire("Error", messageError, "error");
            dispatch(clearHandleErrorMessage());
        }
    }, [dispatch, messageError]);

    useEffect(() => {
        if (operationState) {
            setTimeout(() => {
                dispatch(clearOperationState())
            }, 1500);
        }
    }, [dispatch, operationState])

    return (
        <div className="font-sans overflow-x-auto">
            {operationState && (
                <div className="bg-green-500 text-white absolute right-0 font-semibold tracking-wide flex items-center w-max max-w-sm p-4 rounded-md shadow-md shadow-green-200 mx-auto font-[sans-serif]" role="alert">
                    <FaCircleCheck className="w-5 h-5 shrink-0 fill-white inline mr-3" />
                    <span className="block sm:inline text-sm mr-3"> {operationState} correctamente</span>
                    <IoClose className="w-5 h-5 cursor-pointer shrink-0 fill-white ml-auto" />
                </div>
            )}
            <EntradaLista />
            <div className="md:flex m-4">
                <p className="text-sm text-gray-500 flex-1"></p>
                <div className="flex items-center max-md:mt-4">
                    <ul className="flex space-x-4 justify-center">
                        <Pagination paginaActual={paginaActual} totalPagina={totalPagina} handlePageChange={handlePageChange} />
                    </ul>
                </div>
            </div>
        </div>
    )
}
