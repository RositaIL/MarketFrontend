import React from "react";
import { Usuario } from "../../types/Usuario";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { GiPadlock } from "react-icons/gi";

type UsuarioItemsProps = {
  usuario: Usuario;
  openModalDelete: (idUsuario: number) => void;
  handleUsuario: (user: Usuario) => void;
};

export const UsuarioItem: React.FC<UsuarioItemsProps> = ({
  usuario,
  openModalDelete,
  handleUsuario,
}) => {
  const hanldeUpdateUsuario = () => {
    handleUsuario(usuario);
  };

  const handleRemoveUsuario = () => {
    openModalDelete(usuario.idUsuario);
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="p-4 text-center text-gray-600">{usuario.idUsuario}</td>
      <td className="p-4 text-center text-gray-600">
        {usuario.nombresApellidosUsu}
      </td>
      <td className="p-4 text-center text-gray-600">{usuario.emailUsu}</td>
      <td className="p-4 text-center text-gray-600">{usuario.username}</td>
      <td className="p-4 flex justify-center items-center"><GiPadlock /></td>
      <td className="p-4 text-center text-gray-600">{usuario.idRol}</td>
      <td className="p-4 text-center">
        <button onClick={hanldeUpdateUsuario} className="mr-4" title="Editar">
          <FiEdit className="w-6 h-6 text-blue-400 hover:text-blue-600" />
        </button>
        <button className="mr-4" title="Eliminar">
          <RiDeleteBin5Line
            onClick={handleRemoveUsuario}
            className="w-6 h-6 text-red-500 hover:text-red-700"
          />
        </button>
      </td>
    </tr>
  );
};
