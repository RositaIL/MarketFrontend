import { useEffect, useState } from 'react'
import { ModalDelete } from '../../components/ModalDelete';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/rootState';
import { Skeleton } from '../../components/Skeleton';
import { Button } from '../../components/Button';
import { IoMdAdd } from 'react-icons/io';
import { Search } from '../../components/Search';
import { ProveedorItem } from './ProveedorItem';
import { Proveedor } from '../../types/proveedor';
import { StoreDispatch } from '../../../store/store';
import { actualizarProveedor, agregarProveedor, eliminarProveedor, obtenerProveedores } from '../../../store/thunks/thunkProveedor';
import { Formulario } from '../../components/Formulario';
import { DropdownMenu } from '../../components/DropdownMenu';

const initialValuesProveedor: Proveedor = {
    idProveedor: -1,
    nombreProv: '',
    direccProv: '',
    telefProv: '',
    rucProv: '',
    emailProv: '',
    nomRepresentante: '',
}

export const ProveedorLista = () => {

    const [proveedor, setProveedor] = useState<Proveedor>(initialValuesProveedor);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
    const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);

    const dispatch: StoreDispatch = useDispatch();

    const { proveedores, loading, pageSize } = useSelector((state: RootState) => state.proveedor);

    const handleProveedor = (prov: Proveedor) => {
        setProveedor(prov);
        setIsEditMode(true);
        setIsOpenModalEdit(true);
    }

    const openModalDelete = (idProveedor: number) => {
        setProveedor({ ...proveedor, idProveedor: idProveedor });
        setIsOpenModalDelete(true);
    }
    const closeModalDelete = () => setIsOpenModalDelete(false);

    const openModalEdit = () => {
        setIsEditMode(false);
        setIsOpenModalEdit(true);
    }
    const closeModalEdit = () => {
        setIsOpenModalEdit(false);
    }

    const deleteProductoItem = () => {
        dispatch(eliminarProveedor(proveedor.idProveedor));
        closeModalDelete();
    }
    const onSubmitForm = (values: Proveedor) => {
        if (isEditMode) {
            dispatch(actualizarProveedor(values.idProveedor, values));
        } else {
            dispatch(agregarProveedor(values));
        }
        closeModalEdit()
    };

    const getProveedorWithLimit = (size: number) => {
        dispatch(obtenerProveedores(0, size));
    };

    const inicialValues: Proveedor = isEditMode ? proveedor : initialValuesProveedor;
    const fields = [
        {
            name: "nombreProv",
            label: "Proveedor",
            type: "text",
            placeholder: "Ingrese el proveedor",
        },
        {
            name: "direccProv",
            label: "Dirección",
            type: "text",
            placeholder: "Ingrese su direccion",
        },
        {
            name: "telefProv",
            label: "Telefono",
            type: "text",
            placeholder: "Ingrese el telefono",
        },
        {
            name: "rucProv",
            label: "Ruc",
            type: "text",
            placeholder: "Ingrese el ruc",
        },
        {
            name: "emailProv",
            label: "Email",
            type: "text",
            placeholder: "Ingrese el correo",
        },
        {
            name: "nomRepresentante",
            label: "Representante",
            type: "text",
            placeholder: "Ingrese el representante",
        },
    ]
    useEffect(() => {
        dispatch(obtenerProveedores());
    }, [])
    return (
        <>
            <div className="container flex items-center justify-between p-4">
                <Button onClick={openModalEdit} text={"base"}>
                    <IoMdAdd className="w-6 h-6" />
                    Agregar nuevo proveedor
                </Button>
                <div className="flex items-center gap-9 ">
                    <DropdownMenu getDataWithLimit={getProveedorWithLimit} pageSize={pageSize} />
                    <Search name={"marca"} hadleSearch={() => { }} />
                </div>
            </div>
            <table className="min-w-full bg-white" style={{ border: '2px dashed lightgray' }}>
                <thead className="bg-blue-200 whitespace-nowrap">
                    <tr>
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
                            <td colSpan={7} className="p-2">
                                <Skeleton times={5} className="h-10 w-full" />
                            </td>
                        </tr>
                    ) : (
                        proveedores.map((prov: Proveedor) => {
                            return (
                                <ProveedorItem
                                    key={prov.idProveedor}
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
