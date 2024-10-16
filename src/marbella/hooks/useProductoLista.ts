import { useContext, useEffect, useState } from "react";
import { Producto } from "../types/Producto";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootState";
import { StoreDispatch } from "../../store/store";
import { actualizarProducto, agregarProducto, eliminarProducto, filtrarProductoPorNombre, obtenerProductos } from "../../store/thunks/thunkProducto";
import { listarCategoriaSinPaginada, listarMarcaSinPaginada, listarUnidadMedidaSinPaginada } from "../../store/thunks/thunkDataSinPaginacion";
import { MarbellaContext } from "../../context/MarbellaProvider";

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
};

export const useProductoLista = () => {

    const [producto, setProducto] = useState<Producto>(initialProducto);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
    const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);

    const { loading, productos, pageSize, paginaActual } = useSelector((state: RootState) => state.producto);
    const { marcas, categorias, unidadMedidas } = useSelector((state: RootState) => state.dataSinPaginacion);

    const dispatch: StoreDispatch = useDispatch();
    const { productoNameSearch, onSetProductoNameSearch } = useContext(MarbellaContext);

    const openModalEdit = () => {
        setIsOpenModalEdit(true);
        setIsEditMode(false);
    };

    const closeModalEdit = () => {
        setIsOpenModalEdit(false);
    };
    const handleproducto = (producto: Producto) => {
        setProducto(producto);
        setIsEditMode(true);
        setIsOpenModalEdit(true);
    };

    const openModalDelete = (idProd: number) => {
        setProducto({ ...producto, idPro: idProd });
        setIsOpenModalDelete(true);
    };

    const closeModalDelete = () => {
        setIsOpenModalDelete(false);
    };

    const deleteProductoItem = () => {
        dispatch(eliminarProducto(producto.idPro));
        closeModalDelete();
    };

    const onSubmitForm = (values: Producto) => {
        if (isEditMode) {
            dispatch(actualizarProducto(values.idPro, values));
        } else dispatch(agregarProducto(values));
        closeModalEdit();

    };

    const hadleSearchProductoWithName = (search: string) => {
        onSetProductoNameSearch(search);
        dispatch(filtrarProductoPorNombre(0, pageSize, search));
    };

    const getProductoWithLimit = (size: number) => {
        dispatch(obtenerProductos(0, size, productoNameSearch));
    };


    const inicialValues: Producto = isEditMode ? producto : initialProducto;

    useEffect(() => {
        dispatch(obtenerProductos());
        dispatch(listarUnidadMedidaSinPaginada());
        dispatch(listarMarcaSinPaginada());
        dispatch(listarCategoriaSinPaginada());
    }, [dispatch]);

    return {
        loading, productos, pageSize, paginaActual,
        marcas, categorias, unidadMedidas,
        isEditMode, isOpenModalDelete, isOpenModalEdit,
        openModalEdit, closeModalEdit, closeModalDelete, handleproducto,
        openModalDelete, deleteProductoItem, onSubmitForm,
        getProductoWithLimit, hadleSearchProductoWithName, inicialValues
    }
}
