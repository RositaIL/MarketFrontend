
import { Button } from '../../components/Button';
import { IoMdAdd } from 'react-icons/io';
import { Search } from '../../components/Search';
import { Skeleton } from '../../components/Skeleton';
import { Producto } from '../../types/Producto';
import { ProductoItem } from './ProductoItem';
import { ModalDelete } from '../../components/ModalDelete';
import { Formulario } from '../../components/Formulario';
import { UnidadMedida } from '../../types/unidadMedida';
import { Marca } from '../../types/marca';
import { Categoria } from '../../types/categoria';
import { DropdownMenu } from '../../components/DropdownMenu';
import { useProductoLista } from '../../hooks/useProductoLista';
import { FieldsProducts } from '../formFields';

export const ProductoLista = () => {

    const { loading, productos, pageSize, paginaActual,
        marcas, categorias, unidadMedidas,
        isEditMode, isOpenModalDelete, isOpenModalEdit,
        openModalEdit, closeModalEdit, closeModalDelete, handleproducto,
        openModalDelete, deleteProductoItem, onSubmitForm,
        getProductoWithLimit, hadleSearchProductoWithName, inicialValues } = useProductoLista();

    const fields = FieldsProducts;

    const selects = [
        {
            name: "idMedida",
            options: unidadMedidas.map(({ idMedida, nombreMedida }: UnidadMedida) => {
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
                    <Search name={"marca"} hadleSearch={hadleSearchProductoWithName} />
                </div>
            </div>
            <table className="min-w-full bg-white" style={{ border: '2px dashed lightgray' }}>
                <thead className="bg-blue-200 whitespace-nowrap">
                    <tr>
                        <th className="p-4 text-center text-xs font-bold text-gray-700">
                            N°
                        </th>
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
                        productos.map((prod: Producto, index) => {
                            return (
                                <ProductoItem
                                    key={prod.idPro}
                                    index={paginaActual * pageSize + index + 1}
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
