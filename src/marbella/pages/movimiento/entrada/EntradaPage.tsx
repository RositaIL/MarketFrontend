
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store/rootState'
import { FaCircleCheck } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { EntradaLista } from './EntradaLista';

export const EntradaPage = () => {


    const { operationState } = useSelector((state: RootState) => state.entradaProducto);

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
            {/* <div className="md:flex m-4">
                <p className="text-sm text-gray-500 flex-1">Mostrando {paginaActual} a {pageSize} de {totalPagina} entradas</p>
                <div className="flex items-center max-md:mt-4">
                    <ul className="flex space-x-4 justify-center">
                        <Pagination paginaActual={paginaActual} totalPagina={totalPagina} handlePageChange={handlePageChange} />
                    </ul>
                </div>
            </div> */}
        </div>
    )
}