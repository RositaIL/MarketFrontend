
import { ModalDelete } from '../../components/ModalDelete';
import { Skeleton } from '../../components/Skeleton';
import { Button } from '../../components/Button';
import { IoMdAdd } from 'react-icons/io';
import { Search } from '../../components/Search';
import { ProveedorItem } from './ProveedorItem';
import { Proveedor } from '../../types/proveedor';
import { Formulario } from '../../components/Formulario';
import { DropdownMenu } from '../../components/DropdownMenu';
import { useProveedorLista } from '../../hooks/useProveedorLista';
import { ProveedorFields } from '../formFields';

export const ProveedorLista = () => {

    const { proveedores, loading, pageSize, paginaActual,
        isEditMode, closeModalEdit, isOpenModalDelete, isOpenModalEdit,
        handleProveedor, openModalDelete, closeModalDelete, openModalEdit,
        deleteProductoItem, onSubmitForm, getProveedorWithLimit,
        hadleSearchProveedorWithName, inicialValues } = useProveedorLista();

    const fields = ProveedorFields;

    return (
        <>
            <div className="container flex items-center justify-between p-4">
                <Button onClick={openModalEdit} text={"base"}>
                    <IoMdAdd className="w-6 h-6" />
                    Agregar nuevo proveedor
                </Button>
                <div className="flex items-center gap-9 ">
                    <DropdownMenu getDataWithLimit={getProveedorWithLimit} pageSize={pageSize} />
                    <Search name={"marca"} hadleSearch={hadleSearchProveedorWithName} />
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
                            DIRECCION
                        </th>
                        <th className="p-4 text-center text-xs font-bold text-gray-700">
                            TELEFONO
                        </th>
                        <th className="p-4 text-center text-xs font-bold text-gray-700">
                            RUC
                        </th>
                        <th className="p-4 text-center text-xs font-bold text-gray-700">
                            EMAIL
                        </th>
                        <th className="p-4 text-center text-xs font-bold text-gray-700">
                            REPRESENTANTE
                        </th>
                        <th className="p-4 text-center text-xs font-bold text-gray-700">
                            ACCIONES
                        </th>
                    </tr>
                </thead>
                <tbody className="whitespace-nowrap">
                    {loading ? (
                        <tr>
                            <td colSpan={8} className="p-2">
                                <Skeleton times={5} className="h-10 w-full" />
                            </td>
                        </tr>
                    ) : (
                        proveedores.map((prov: Proveedor, index) => {
                            return (
                                <ProveedorItem
                                    key={prov.idProveedor}
                                    index={paginaActual * pageSize + index + 1}
                                    proveedor={prov}
                                    handleproveedor={handleProveedor}
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
                    nameForm="proveedor"
                    isEditMode={isEditMode}
                />
            )}
        </>
    )
}