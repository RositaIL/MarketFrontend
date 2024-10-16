import React from "react";
import { Categoria } from "../../types/categoria";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";

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
  const handleUpdateCategory = () => handleCategory(categoria);

  const handleRemoveCategory = () => openModalDelete(categoria.idCategoria);
  return (
    <tr className="hover:bg-gray-50">
      <td className="p-4 text-center text-gray-600">{index}</td>
      <td className="p-4 text-center text-gray-600">
        {categoria.nombreCategoria}
      </td>
      <td className="p-4 text-center">
        <button onClick={handleUpdateCategory} className="mr-4" title="Editar">
          <FiEdit className="w-6 h-6 text-blue-400 hover:text-blue-600" />
        </button>
        <button className="mr-4" title="Eliminar">
          <RiDeleteBin5Line
            onClick={handleRemoveCategory}
            className="w-6 h-6 text-red-500 hover:text-red-700"
          />
        </button>
      </td>
    </tr>
  );
};
