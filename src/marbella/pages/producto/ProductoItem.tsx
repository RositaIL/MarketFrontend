import React from 'react'
import { Producto } from '../../types/Producto'
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FiEdit } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/rootState';

type ProductoItemsProps = {
    producto: Producto;
    handleproducto: (producto: Producto) => void;
    openModalDelete: (idPro: number) => void;
}

export const ProductoItem: React.FC<ProductoItemsProps> = ({ producto, handleproducto, openModalDelete }) => {

    const { marcas, categorias, unidadMedidas } = useSelector((state: RootState) => state.dataSinPaginacion);

    const hanldeUpdateProducto = () => {
        handleproducto(producto);
    }
    const handleRemoveProducto = () => {
        openModalDelete(producto.idPro);
    }

    return (
        <tr className="hover:bg-gray-50">
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
                <button onClick={hanldeUpdateProducto} className="mr-4" title="Editar">
                    <FiEdit className="w-6 h-6 text-blue-400 hover:text-blue-600" />
                </button>
                <button className="mr-4" title="Eliminar">
                    <RiDeleteBin5Line
                        onClick={handleRemoveProducto}
                        className="w-6 h-6 text-red-500 hover:text-red-700"
                    />
                </button>
            </td>
        </tr>
    )
}
