import { Button } from "../../components/Button";
import { IoMdAdd } from "react-icons/io";
import { Search } from "../../components/Search";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootState";
import { Skeleton } from "../../components/Skeleton";
import { Usuario } from "../../types/Usuario";
import { UsuarioItem } from "./UsuarioItem";
import { Formulario } from "../../components/Formulario";
import { ModalDelete } from "../../components/ModalDelete";
import { Rol } from "../../types/rol";
import { DropdownMenu } from "../../components/DropdownMenu";
import { useUsuarioLista } from "../../hooks/useUsuarioLista";
import { UsuarioFields } from "../formFields";

export const UsuarioLista = () => {

  const { usuarios, loading, pageSize, paginaActual,
    isOpenModalDelete, isOpenModalEdit, isEditMode,
    handleUsuario, openModalDelete, openModalEdit,
    closeModalDelete, closeModalEdit, onSubmitForm, hadleSearchUsuarioWithName,
    deleteUsuarioItem, getUsuarioWithLimit, inicialValues } = useUsuarioLista();

  const { roles } = useSelector((state: RootState) => state.rol);

  const fields = UsuarioFields;

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

  return (
    <>
      <div className="container flex items-center justify-between p-4">
        <Button onClick={openModalEdit} text={"base"}>
          <IoMdAdd className="w-6 h-6" />
          Agregar nuevo usuario
        </Button>
        <div className="flex items-center gap-9 ">
          <DropdownMenu getDataWithLimit={getUsuarioWithLimit} pageSize={pageSize} />
          <Search name={"marca"} hadleSearch={hadleSearchUsuarioWithName} />
        </div>
      </div>
      <table className="min-w-full bg-white" style={{ border: '2px dashed lightgray' }}>
        <thead className="bg-blue-200 whitespace-nowrap">
          <tr>
            <th className="p-4 text-center text-xs font-bold text-gray-700">
              N°
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
            usuarios.map((usuario: Usuario, index) => {
              return (
                <UsuarioItem
                  key={usuario.idUsuario}
                  index={paginaActual * pageSize + index + 1}
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
