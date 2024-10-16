import { useContext, useEffect, useState } from "react";
import { Proveedor } from "../types/proveedor";
import { StoreDispatch } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootState";
import { actualizarProveedor, agregarProveedor, eliminarProveedor, filtrarProveedorPorNombre, obtenerProveedores } from "../../store/thunks/thunkProveedor";
import { MarbellaContext } from "../../context/MarbellaProvider";

const initialValuesProveedor: Proveedor = {
    idProveedor: -1,
    nombreProv: '',
    direccProv: '',
    telefProv: '',
    rucProv: '',
    emailProv: '',
    nomRepresentante: '',
}

export const useProveedorLista = () => {

    const [proveedor, setProveedor] = useState<Proveedor>(initialValuesProveedor);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
    const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);

    const { proveedorNameSearch, onSetProveedorNameSearch } = useContext(MarbellaContext);
    const dispatch: StoreDispatch = useDispatch();

    const { proveedores, loading, pageSize, paginaActual } = useSelector((state: RootState) => state.proveedor);

    const handleProveedor = (prov: Proveedor) => {
        setProveedor(prov);
        setIsEditMode(true);
        setIsOpenModalEdit(true);
    };

    const openModalDelete = (idProveedor: number) => {
        setProveedor({ ...proveedor, idProveedor: idProveedor });
        setIsOpenModalDelete(true);
    };

    const closeModalDelete = () => setIsOpenModalDelete(false);

    const openModalEdit = () => {
        setIsEditMode(false);
        setIsOpenModalEdit(true);
    };

    const closeModalEdit = () => {
        setIsOpenModalEdit(false);
    };

    const deleteProductoItem = () => {
        dispatch(eliminarProveedor(proveedor.idProveedor));
        closeModalDelete();
    };

    const onSubmitForm = (values: Proveedor) => {
        if (isEditMode) {
            dispatch(actualizarProveedor(values.idProveedor, values));
        } else {
            dispatch(agregarProveedor(values));
        }
        closeModalEdit()
    };

    const getProveedorWithLimit = (size: number) => {
        dispatch(obtenerProveedores(0, size, proveedorNameSearch));
    };

    const hadleSearchProveedorWithName = (search: string) => {
        onSetProveedorNameSearch(search);
        dispatch(filtrarProveedorPorNombre(0, pageSize, search));
    };

    const inicialValues: Proveedor = isEditMode ? proveedor : initialValuesProveedor;

    useEffect(() => {
        dispatch(obtenerProveedores());
    }, [dispatch])

    return {
        proveedores, loading, pageSize, paginaActual,
        closeModalEdit, isEditMode, isOpenModalDelete, isOpenModalEdit,
        handleProveedor, openModalDelete, closeModalDelete, openModalEdit,
        deleteProductoItem, onSubmitForm, getProveedorWithLimit,
        hadleSearchProveedorWithName, inicialValues
    }
}
