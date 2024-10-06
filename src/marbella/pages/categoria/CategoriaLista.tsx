import { Button } from "../../components/Button";
import { IoMdAdd } from "react-icons/io";
import { Search } from "../../components/Search";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootState";
import { useEffect, useState } from "react";
import {
  actualizarCategoria,
  agregarCatergoria,
  eliminarCategoria,
  obtenerCategorias,
} from "../../../store/thunks/thunkCategory";
import { StoreDispatch } from "../../../store/store";
import { Skeleton } from "../../components/Skeleton";
import { CategoriaItem } from "./CategoriaItem";
import { Categoria } from "../../types/categoria";
import { ModalDelete } from "../../components/ModalDelete";
import { Formulario } from "../../components/Formulario";

const inicialCategory = {
  idCategoria: -1,
  nombreCategoria: "",
};

export const CategoriaLista = () => {
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);
  const [category, setCategory] = useState<Categoria>(inicialCategory);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const dispatch: StoreDispatch = useDispatch();

  const { categorias, loading } = useSelector(
    (state: RootState) => state.categoria
  );

  useEffect(() => {
    dispatch(obtenerCategorias());
  }, []);

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

  const fields = [
    {
      name: "nombreCategoria",
      label: "Categoria",
      type: "text",
      placeholder: "Ingrese la categoria",
    },
  ];

  const inicialValues: Categoria = isEditMode ? category : inicialCategory;

  return (
    <>
      <div className="container flex items-center justify-between p-4">
        <Button onClick={openModalEdit} text={"base"}>
          <IoMdAdd className="w-6 h-6" />
          Agregar nueva categoria
        </Button>
        <Search name={"marca"} hadleSearch={() => { }} />
      </div>
      <table className="min-w-full bg-white">
        <thead className="bg-blue-200 whitespace-nowrap">
          <tr>
            <th className="p-4 text-center text-xs font-bold text-gray-700">
              ID
            </th>
            <th className="p-4 text-center text-xs font-bold text-gray-700">
              DESCRIPCION
            </th>
            <th className="p-4 text-center text-xs font-bold text-gray-700">
              ACCIONES
            </th>
          </tr>
        </thead>
        <tbody className="whitespace-nowrap">
          {loading ? (
            <tr>
              <td colSpan={3} className="p-2">
                <Skeleton times={5} className="h-10 w-full" />
              </td>
            </tr>
          ) : (
            categorias.map((categoria: Categoria) => {
              return (
                <CategoriaItem
                  key={categoria.idCategoria}
                  categoria={categoria}
                  handleCategory={handleCategory}
                  openModalDelete={openModalDelete}
                />
              );
            })
          )}
        </tbody>
      </table>
      {isOpenModalDelete && (
        <ModalDelete
          handleDeleteItem={deleteCategoryItem}
          closeModalDetele={closeModalDelete}
        />
      )}
      {isOpenModalEdit && (
        <Formulario
          initialValue={inicialValues}
          fields={fields}
          onSubmitForm={onSubmitForm}
          onCancelForm={closeModalEdit}
          nameForm="categoria"
          isEditMode={isEditMode}
        />
      )}
    </>
  );
};
