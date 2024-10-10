import { useEffect, useState } from 'react'
import { Button } from '../../components/Button';
import { IoMdAdd } from 'react-icons/io';
import { Search } from '../../components/Search';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/rootState';
import { Skeleton } from '../../components/Skeleton';
import { Producto } from '../../types/Producto';
import { ProductoItem } from './ProductoItem';
import { StoreDispatch } from '../../../store/store';
import { actualizarProducto, agregarProducto, eliminarProducto, obtenerProductos } from '../../../store/thunks/thunkProducto';
import { obtenerUnidadMedida } from '../../../store/thunks/thunkUnidadMedida';
import { obtenerMarcas } from '../../../store/thunks/thunkMarca';
import { obtenerCategorias } from '../../../store/thunks/thunkCategory';
import { ModalDelete } from '../../components/ModalDelete';
import { Formulario } from '../../components/Formulario';
import { UnidadMedida } from '../../types/unidadMedida';
import { Marca } from '../../types/marca';
import { Categoria } from '../../types/categoria';
import { DropdownMenu } from '../../components/DropdownMenu';

const initialProducto: Producto = {
    idPro: 0,
    nombrePro: '',
    descripcionPro: '',
    precioPro: 0,
    stockActual: 0,
    stockMin: 0,
    idMedida: 0,
    idMarca: 0,
    idCategoria: 0,
}

export const ProductoLista = () => {

    const [producto, setProducto] = useState<Producto>(initialProducto);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
    const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);

    const { loading, productos, pageSize } = useSelector((state: RootState) => state.producto);
    const { categorias } = useSelector((state: RootState) => state.categoria);
    const { marcas } = useSelector((state: RootState) => state.marca);
    const { unidadMedidas } = useSelector((state: RootState) => state.unidadMedida);

    const dispatch: StoreDispatch = useDispatch();

    const openModalEdit = () => {
        setIsOpenModalEdit(true);
        setIsEditMode(false);
    }
    const closeModalEdit = () => {
        setIsOpenModalEdit(false);
    };
    const handleproducto = (producto: Producto) => {
        setProducto(producto);
        setIsEditMode(true);
        setIsOpenModalEdit(true);
    }
    const openModalDelete = (idProd: number) => {
        setProducto({ ...producto, idPro: idProd });
        setIsOpenModalDelete(true);
    }
    const closeModalDelete = () => {
        setIsOpenModalDelete(false);
    }
    const deleteProductoItem = () => {
        dispatch(eliminarProducto(producto.idPro));
        closeModalDelete();
    };

    const onSubmitForm = (values: Producto) => {
        if (isEditMode) {
            dispatch(actualizarProducto(values.idPro, values));
        } else dispatch(agregarProducto(values));
        closeModalEdit();

    }

    const getProductoWithLimit = (size: number) => {
        dispatch(obtenerProductos(0, size));
    }
    useEffect(() => {
        dispatch(obtenerProductos());
        dispatch(obtenerUnidadMedida());
        dispatch(obtenerMarcas());
        dispatch(obtenerCategorias());
    }, [dispatch]);

    const inicialValues: Producto = isEditMode ? producto : initialProducto;
    const fields = [
        {
            name: "nombrePro",
            label: "producto",
            type: "text",
            placeholder: "Ingrese el producto",
        },
        {
            name: "descripcionPro",
            label: "descrpcion",
            type: "text",
            placeholder: "Ingrese la descripion",
        },
        {
            name: "precioPro",
            label: "precio",
            type: "number",
            placeholder: "Ingrese el precio",
        },
        {
            name: "stockActual",
            label: "stock actual",
            type: "number",
            placeholder: "Ingrese stock actual",
        },
        {
            name: "stockMin",
            label: "stock minimo",
            type: "number",
            placeholder: "Ingrese stock minimo",
        }
    ]
    const selects = [
        {
            name: "idMedida",
            options: unidadMedidas?.map(({ idMedida, nombreMedida }: UnidadMedida) => {
                return {
                    value: idMedida,
                    label: nombreMedida,
                };
            })
        },
        {
            name: "idMarca",
            options: marcas.map(({ idMarca, nombreMarca }: Marca) => {
                return {
                    value: idMarca,
                    label: nombreMarca,
                };
            })
        },
        {
            name: "idCategoria",
            options: categorias.map(({ idCategoria, nombreCategoria }: Categoria) => {
                return {
                    value: idCategoria,
                    label: nombreCategoria,
                };
            })
        }
    ]


    return (
        <>
            <div className="container flex items-center justify-between p-4">
                <Button onClick={openModalEdit} text={"base"}>
                    <IoMdAdd className="w-6 h-6" />
                    Agregar nuevo producto
                </Button>
                <div className="flex items-center gap-9 ">
                    <DropdownMenu getDataWithLimit={getProductoWithLimit} pageSize={pageSize} />
                    <Search name={"marca"} hadleSearch={() => { }} />
                </div>
            </div>
            <table className="min-w-full bg-white">
                <thead className="bg-blue-200 whitespace-nowrap">
                    <tr>
                        <th className="p-4 text-center text-xs font-bold text-gray-700">
                            NOMBRE
                        </th>
                        <th className="p-4 text-center text-xs font-bold text-gray-700">
                            DESCRIPCION
                        </th>
                        <th className="p-4 text-center text-xs font-bold text-gray-700">
                            PRECIO (S/.)
                        </th>
                        <th className="p-4 text-center text-xs font-bold text-gray-700">
                            STOCK ACTUAL
                        </th>
                        <th className="p-4 text-center text-xs font-bold text-gray-700">
                            STOCK MINIMO
                        </th>
                        <th className="p-4 text-center text-xs font-bold text-gray-700">
                            UNIDAD MEDIDA
                        </th>
                        <th className="p-4 text-center text-xs font-bold text-gray-700">
                            MARCA
                        </th>
                        <th className="p-4 text-center text-xs font-bold text-gray-700">
                            CATEGORIA
                        </th>
                        <th className="p-4 text-center text-xs font-bold text-gray-700">
                            ACCIONES
                        </th>
                    </tr>
                </thead>
                <tbody className="whitespace-nowrap">
                    {loading ? (
                        <tr>
                            <td colSpan={10} className="p-2">
                                <Skeleton times={5} className="h-10 w-full" />
                            </td>
                        </tr>
                    ) : (
                        productos.map((prod: Producto) => {
                            return (
                                <ProductoItem
                                    key={prod.idPro}
                                    producto={prod}
                                    handleproducto={handleproducto}
                                    openModalDelete={openModalDelete}
                                />
                            );
                        })
                    )}
                </tbody>
            </table>
            {isOpenModalDelete && (
                <ModalDelete
                    handleDeleteItem={deleteProductoItem}
                    closeModalDetele={closeModalDelete}
                />
            )}
            {isOpenModalEdit && (
                <Formulario
                    initialValue={inicialValues}
                    fields={fields}
                    onSubmitForm={onSubmitForm}
                    onCancelForm={closeModalEdit}
                    nameForm="producto"
                    isEditMode={isEditMode}
                    selects={selects}
                />
            )}
        </>
    )
}
