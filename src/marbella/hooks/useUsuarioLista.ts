import { useContext, useEffect, useState } from "react";
import { Usuario } from "../types/Usuario";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/rootState";
import { actualizarUsuario, eliminarUsuario, filtrarUsuarioPorNombre, guardarUsuario, obtenerUsuarios } from "../../store/thunks/thunkUsuario";
import { obtenerRoles } from "../../store/thunks/thunkRol";
import { StoreDispatch } from "../../store/store";
import { MarbellaContext } from "../../context/MarbellaProvider";

const initialUser: Usuario = {
    idUsuario: -1,
    nombresApellidosUsu: "",
    emailUsu: "",
    username: "",
    password: "",
    idRol: -1,
};

export const useUsuarioLista = () => {

    const [user, setUser] = useState<Usuario>(initialUser);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
    const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);

    const { usuarioNameSearch, onSetUsuarioNameSearch } = useContext(MarbellaContext);
    const { usuarios, loading, pageSize, paginaActual } = useSelector(
        (state: RootState) => state.usuario
    );

    const dispatch: StoreDispatch = useDispatch();

    const handleUsuario = (userEdit: Usuario) => {
        setUser(userEdit);
        setIsEditMode(true);
        setIsOpenModalEdit(true);
    };

    const openModalDelete = (idUsuario: number) => {
        setUser({ ...user, idUsuario: idUsuario });
        setIsOpenModalDelete(true);
    };

    const openModalEdit = () => {
        setIsEditMode(false);
        setIsOpenModalEdit(true);
    };
    const closeModalDelete = () => setIsOpenModalDelete(false);
    const closeModalEdit = () => {
        setIsEditMode(false);
        setIsOpenModalEdit(false);
    };
    const onSubmitForm = (values: Usuario) => {
        if (isEditMode) {
            dispatch(actualizarUsuario(values.idUsuario, values))
        } else dispatch(guardarUsuario(values));
        closeModalEdit();
    };

    const deleteUsuarioItem = () => {
        dispatch(eliminarUsuario(user.idUsuario));
        closeModalDelete();
    };

    const getUsuarioWithLimit = (size: number) => {
        dispatch(obtenerUsuarios(0, size, usuarioNameSearch));
    };

    const hadleSearchUsuarioWithName = (search: string) => {
        onSetUsuarioNameSearch(search);
        dispatch(filtrarUsuarioPorNombre(0, pageSize, search))
    };

    const inicialValues: Usuario = isEditMode ? user : initialUser;

    useEffect(() => {
        dispatch(obtenerUsuarios());
        dispatch(obtenerRoles());
    }, [dispatch]);

    return {
        usuarios, loading, pageSize, paginaActual,
        isOpenModalDelete, isOpenModalEdit, isEditMode,
        handleUsuario, openModalDelete, openModalEdit,
        closeModalDelete, closeModalEdit, onSubmitForm, hadleSearchUsuarioWithName,
        deleteUsuarioItem, getUsuarioWithLimit, inicialValues
    }
}
