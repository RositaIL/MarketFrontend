import { Button } from "../../components/Button";
import { IoMdAdd } from "react-icons/io";
import { Search } from "../../components/Search";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootState";
import { Skeleton } from "../../components/Skeleton";
import { Usuario } from "../../types/Usuario";
import { UsuarioItem } from "./UsuarioItem";
import { useEffect, useState } from "react";
import { Formulario } from "../../components/Formulario";
import { ModalDelete } from "../../components/ModalDelete";
import { StoreDispatch } from "../../../store/store";
import {
  actualizarUsuario,
  eliminarUsuario,
  guardarUsuario,
  obtenerUsuarios,
} from "../../../store/thunks/thunkUsuario";
import { obtenerRoles } from "../../../store/thunks/thunkRol";
import { Rol } from "../../types/rol";
import { DropdownMenu } from "../../components/DropdownMenu";

const initialUser: Usuario = {
  idUsuario: -1,
  nombresApellidosUsu: "",
  emailUsu: "",
  username: "",
  password: "",
  idRol: -1,
};

export const UsuarioLista = () => {
  //estados
  const [user, setUser] = useState<Usuario>(initialUser);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);


  const { usuarios, loading, pageSize } = useSelector(
    (state: RootState) => state.usuario
  );

  const { roles } = useSelector((state: RootState) => state.rol);

  const dispatch: StoreDispatch = useDispatch();
  const inicialValues: Usuario = isEditMode ? user : initialUser;

  const fields = [
    {
      name: "nombresApellidosUsu",
      label: "Nombres Completos",
      type: "text",
      placeholder: "Ingrese sus nombres",
    },
    {
      name: "emailUsu",
      label: "Email",
      type: "text",
      placeholder: "Ingrese sus nombres",
    },
    {
      name: "username",
      label: "Usuario",
      type: "text",
      placeholder: "Ingrese su usuario",
    },
    {
      name: "password",
      label: "Contraseña",
      type: "password",
      placeholder: "Ingrese su contraseña",
    },
  ];

  const selects = [
    {
      name: "idRol",
      options: roles.map(({ idRol, descripcionRol }: Rol) => {
        return {
          value: idRol,
          label: descripcionRol,
        };
      })
    }
  ]
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
    dispatch(obtenerUsuarios(0, size));
  };

  useEffect(() => {
    dispatch(obtenerUsuarios());
    dispatch(obtenerRoles());
  }, []);
  return (
    <>
      <div className="container flex items-center justify-between p-4">
        <Button onClick={openModalEdit} text={"base"}>
          <IoMdAdd className="w-6 h-6" />
          Agregar nuevo usuario
        </Button>
        <div className="flex items-center gap-9 ">
          <DropdownMenu getDataWithLimit={getUsuarioWithLimit} pageSize={pageSize} />
          <Search name={"marca"} hadleSearch={() => { }} />
        </div>
      </div>
      <table className="min-w-full bg-white" style={{ border: '2px dashed lightgray' }}>
        <thead className="bg-blue-200 whitespace-nowrap">
          <tr>
            <th className="p-4 text-center text-xs font-bold text-gray-700">
              ID
            </th>
            <th className="p-4 text-center text-xs font-bold text-gray-700">
              NOMBRES Y APELLIDOS
            </th>
            <th className="p-4 text-center text-xs font-bold text-gray-700">
              EMAIL
            </th>
            <th className="p-4 text-center text-xs font-bold text-gray-700">
              USUARIO
            </th>
            <th className="p-4 text-center text-xs font-bold text-gray-700">
              PASSWORD
            </th>
            <th className="p-4 text-center text-xs font-bold text-gray-700">
              ROL
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
            usuarios.map((usuario: Usuario) => {
              return (
                <UsuarioItem
                  key={usuario.idUsuario}
                  usuario={usuario}
                  handleUsuario={handleUsuario}
                  openModalDelete={openModalDelete}
                />
              );
            })
          )}
        </tbody>
      </table>
      {isOpenModalDelete && (
        <ModalDelete
          handleDeleteItem={deleteUsuarioItem}
          closeModalDetele={closeModalDelete}
        />
      )}
      {isOpenModalEdit && (
        <Formulario
          initialValue={inicialValues}
          fields={fields}
          onSubmitForm={onSubmitForm}
          onCancelForm={closeModalEdit}
          nameForm="usuario"
          isEditMode={isEditMode}
          selects={selects}
        />
      )}
    </>
  );
};
