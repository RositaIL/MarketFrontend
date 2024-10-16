import { Button } from "../../components/Button";
import { IoMdAdd } from "react-icons/io";
import { Search } from "../../components/Search";
import { Skeleton } from "../../components/Skeleton";
import { CategoriaItem } from "./CategoriaItem";
import { Categoria } from "../../types/categoria";
import { ModalDelete } from "../../components/ModalDelete";
import { Formulario } from "../../components/Formulario";
import { DropdownMenu } from "../../components/DropdownMenu";
import { useCategoriaLista } from "../../hooks/useCategoriaLista";
import { CategoriaFields } from "../formFields";

export const CategoriaLista = () => {

  const { loading, pageSize, paginaActual, categorias, openModalEdit, openModalDelete, closeModalDelete, isEditMode,
    isOpenModalDelete, isOpenModalEdit, closeModalEdit, handleCategory, deleteCategoryItem, onSubmitForm,
    inicialValues, getCategoriaWithLimit, hadleSearchMarcaWithName } = useCategoriaLista();

  const fields = CategoriaFields;

  return (
    <>
      <div className="container flex items-center justify-between p-4">
        <Button onClick={openModalEdit} text={"base"}>
          <IoMdAdd className="w-6 h-6" />
          Agregar nueva categoria
        </Button>
        <div className="flex items-center gap-9 ">
          <DropdownMenu getDataWithLimit={getCategoriaWithLimit} pageSize={pageSize} />
          <Search name={"marca"} hadleSearch={hadleSearchMarcaWithName} />
        </div>
      </div>
      <table className="min-w-full bg-white" style={{ border: '2px dashed lightgray' }}>
        <thead className="bg-blue-200 whitespace-nowrap">
          <tr>
            <th className="p-4 text-center text-xs font-bold text-gray-700">
              N°
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
            categorias.map((categoria: Categoria, index) => {
              return (
                <CategoriaItem
                  key={categoria.idCategoria}
                  index={paginaActual * pageSize + index + 1}
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