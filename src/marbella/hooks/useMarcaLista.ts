import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StoreDispatch } from "../../store/store";
import { RootState } from "../../store/rootState";
import { Marca } from '../types/marca';
import { MarbellaContext } from "../../context/MarbellaProvider";
import { actualizarMarca, agregarMarca, eliminarMarca, filtrarMarcaPorNombre, obtenerMarcas } from "../../store/thunks/thunkMarca";

const initialMarca: Marca = {
    idMarca: -1,
    nombreMarca: "",
};

export const useMarcaLista = () => {

    const dispatch: StoreDispatch = useDispatch();
    const [marca, setMarca] = useState<Marca>(initialMarca);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);
    const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);

    const { marcaNameSerch, onSetMarcaNameSearch } = useContext(MarbellaContext);
    const { loading, marcas, pageSize, paginaActual } = useSelector(
        (state: RootState) => state.marca
    );

    const openModalAdd = () => {
        setIsEditMode(false);
        setIsOpenModalEdit(true);
    };

    const closeModalEdit = () => {
        setIsOpenModalEdit(false);
        setIsEditMode(false);
    };

    const handleMarca = (marca: Marca) => {
        setMarca(marca);
        setIsEditMode(true);
        setIsOpenModalEdit(true);
    };

    const openModalDelete = (id: number) => {
        setMarca({ ...marca, idMarca: id });
        setIsOpenModalDelete(true);
    };

    const closeModalDelete = () => {
        setIsOpenModalDelete(false);
    };

    const getMarcaWithLimit = (size: number) => {
        dispatch(obtenerMarcas(0, size, marcaNameSerch))
    };

    const hadleSearchMarcaWithname = (buscar: string) => {
        onSetMarcaNameSearch(buscar);
        dispatch(filtrarMarcaPorNombre(0, pageSize, buscar));
    };

    const onSubmitForm = (values: Marca) => {
        if (isEditMode) {
            dispatch(actualizarMarca(values.idMarca, values));
        } else {
            dispatch(agregarMarca(values));
        }
        closeModalEdit();
    };

    const deleteMarcaItem = () => {
        dispatch(eliminarMarca(marca.idMarca));
        closeModalDelete();
    };

    const inicialValues: Marca = isEditMode ? marca : initialMarca;
    useEffect(() => {
        dispatch(obtenerMarcas());
    }, [dispatch]);

    return {
        loading,
        marcas,
        pageSize,
        paginaActual,
        isEditMode,
        isOpenModalEdit,
        isOpenModalDelete,
        openModalAdd,
        closeModalEdit,
        openModalDelete,
        closeModalDelete,
        handleMarca,
        deleteMarcaItem,
        onSubmitForm,
        getMarcaWithLimit,
        hadleSearchMarcaWithname,
        inicialValues: inicialValues
    };
}
