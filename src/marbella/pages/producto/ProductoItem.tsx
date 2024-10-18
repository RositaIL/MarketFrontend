import React from 'react'
import { Producto } from '../../types/Producto'
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/rootState';

type ProductoItemsProps = {
    producto: Producto;
    index: number,
    handleproducto: (producto: Producto) => void;
    openModalDelete: (idPro: number) => void;
}

export const ProductoItem: React.FC<ProductoItemsProps> = ({ producto, index, handleproducto, openModalDelete }) => {

    const { user } = useSelector((state: RootState) => state.auth)
    const rolUser = !user.rol.includes('ADMINISTRADOR');

    const { marcas, categorias, unidadMedidas } = useSelector((state: RootState) => state.dataSinPaginacion);

    const hanldeUpdateProducto = () => {
        handleproducto(producto);
    }
    const handleRemoveProducto = () => {
        openModalDelete(producto.idPro);
    }

    return (
        <tr className="hover:bg-gray-50">
            <td className="p-4 text-center text-gray-600">{index}</td>
            <td className="p-4 text-center text-gray-600">{producto.nombrePro}</td>
            <td className="p-4 text-center text-gray-600">
                {producto.descripcionPro}
            </td>
            <td className="p-4 text-center text-gray-600">{producto.precioPro}</td>
            <td className="p-4 text-center text-gray-600">{producto.stockActual}</td>
            <td className="p-4 text-center text-gray-600">{producto.stockMin}</td>
            <td className="p-4 text-center text-gray-600">{unidadMedidas.find(unidad => unidad.idMedida === producto.idMedida)?.nombreMedida}</td>
            <td className="p-4 text-center text-gray-600">{marcas.find(marca => marca.idMarca === producto.idMarca)?.nombreMarca}</td>
            <td className="p-4 text-center text-gray-600">{categorias.find(categoria => categoria.idCategoria === producto.idCategoria)?.nombreCategoria}</td>
            <td className="p-4 text-center">
                <button onClick={hanldeUpdateProducto} disabled={rolUser} className="mr-4" title="Editar">
                    <FiEdit
                        className={`w-6 h-6 text-${rolUser ? 'red-200' : 'blue-400'} hover:${rolUser ? 'red-200' : 'blue-600'}`}
                        style={{ color: rolUser ? '#ffa3a3' : 'blue-400' }}
                    />
                </button>
                <button className="mr-4" disabled={rolUser} title="Eliminar">
                    <RiDeleteBin5Line
                        onClick={handleRemoveProducto}
                        className={`w-6 h-6 text-${rolUser ? 'red-200' : 'red-500'} hover:${rolUser ? 'red-200' : 'red-700'}`}
                        style={{ color: rolUser ? '#ffa3a3' : 'red-500' }}
                    />
                </button>
            </td>
        </tr>
    )
}
