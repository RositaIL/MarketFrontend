import { useContext, useEffect, useState } from "react";
import { Categoria } from "../types/categoria";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch } from "../../store/store";
import { RootState } from "../../store/rootState";
import { MarbellaContext } from "../../context/MarbellaProvider";
import {
    actualizarCategoria, agregarCatergoria, eliminarCategoria,
    filtrarCategoriaPorNombre, obtenerCategorias
} from "../../store/thunks/thunkCategory";

const inicialCategory = {
    idCategoria: -1,
    nombreCategoria: "",
};

export const useCategoriaLista = () => {

    const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
    const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);
    const [category, setCategory] = useState<Categoria>(inicialCategory);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const dispatch: StoreDispatch = useDispatch();
    const { categorias, loading, pageSize, paginaActual } = useSelector(
        (state: RootState) => state.categoria
    );

    const { categoriaNameSearch, onSetCategoriaNameSearch } = useContext(MarbellaContext);

    const closeModalDelete = () => setIsOpenModalDelete(false);

    const openModalDelete = (id: number) => {
        setCategory({ ...category, idCategoria: id });
        setIsOpenModalDelete(true);
    };

    const handleCategory = (categoria: Categoria) => {
        setCategory(categoria);
        setIsEditMode(true);
        setIsOpenModalEdit(true);
    };

    const openModalEdit = () => {
        setIsEditMode(false);
        setIsOpenModalEdit(true);
    };
    const closeModalEdit = () => setIsOpenModalEdit(false);

    const deleteCategoryItem = () => {
        dispatch(eliminarCategoria(category.idCategoria));
        closeModalDelete();
    };

    //Actualizar o agregar marca
    const onSubmitForm = (values: Categoria) => {
        if (isEditMode) {
            dispatch(actualizarCategoria(values.idCategoria, values));
        } else dispatch(agregarCatergoria(values));
        closeModalEdit();
    };

    const getCategoriaWithLimit = (size: number) => {
        dispatch(obtenerCategorias(0, size, categoriaNameSearch));
    };

    const hadleSearchMarcaWithName = (search: string) => {
        onSetCategoriaNameSearch(search);
        dispatch(filtrarCategoriaPorNombre(0, pageSize, search));
    };

    const inicialValues: Categoria = isEditMode ? category : inicialCategory;

    useEffect(() => {
        dispatch(obtenerCategorias());
    }, [dispatch]);

    return {
        loading,
        pageSize,
        paginaActual,
        categorias,
        isEditMode,
        isOpenModalDelete,
        isOpenModalEdit,
        openModalDelete,
        closeModalDelete,
        openModalEdit,
        closeModalEdit,
        onSubmitForm,
        handleCategory,
        deleteCategoryItem,
        getCategoriaWithLimit,
        hadleSearchMarcaWithName,
        inicialValues,
    }
}
