import React from "react";
import { Categoria } from "../../types/categoria";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootState";

type CategoriaItemProps = {
  categoria: Categoria;
  index: number;
  openModalDelete: (idCategoria: number) => void;
  handleCategory: (categoria: Categoria) => void;
};

export const CategoriaItem: React.FC<CategoriaItemProps> = ({
  categoria,
  index,
  openModalDelete,
  handleCategory,
}) => {

  const { user } = useSelector((state: RootState) => state.auth)
  const rolUser = !user.rol.includes('ADMINISTRADOR');

  const handleUpdateCategory = () => handleCategory(categoria);

  const handleRemoveCategory = () => openModalDelete(categoria.idCategoria);
  return (
    <tr className="hover:bg-gray-50">
      <td className="p-4 text-center text-gray-600">{index}</td>
      <td className="p-4 text-center text-gray-600">
        {categoria.nombreCategoria}
      </td>
      <td className="p-4 text-center">
        <button onClick={handleUpdateCategory} disabled={rolUser} className="mr-4" title="Editar">
          <FiEdit
            className={`w-6 h-6 text-${rolUser ? 'red-200' : 'blue-400'} hover:${rolUser ? 'red-200' : 'blue-600'}`}
            style={{ color: rolUser ? '#ffa3a3' : 'blue-400' }}
          />
        </button>
        <button className="mr-4" disabled={rolUser} title="Eliminar">
          <RiDeleteBin5Line
            onClick={handleRemoveCategory}
            className={`w-6 h-6 text-${rolUser ? 'red-200' : 'red-500'} hover:${rolUser ? 'red-200' : 'red-700'}`}
            style={{ color: rolUser ? '#ffa3a3' : 'red-500' }}
          />
        </button>
      </td>
    </tr>
  );
};
