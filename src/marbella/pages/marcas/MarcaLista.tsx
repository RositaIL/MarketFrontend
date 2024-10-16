
import { MarcaItem } from "./MarcaItem";
import { Skeleton } from "../../components/Skeleton";
import { ModalDelete } from "../../components/ModalDelete";
import { Button } from "../../components/Button";
import { IoMdAdd } from "react-icons/io";
import { Search } from "../../components/Search";
import { Formulario } from "../../components/Formulario";
import { DropdownMenu } from "../../components/DropdownMenu";
import { useMarcaLista } from "../../hooks/useMarcaLista";
import { Marca } from "../../types/marca";
import { MarcaFields } from "../formFields";


export const MarcaLista = () => {

  const { loading, marcas, pageSize, paginaActual, isEditMode, isOpenModalEdit, isOpenModalDelete, openModalAdd,
    closeModalEdit, openModalDelete, closeModalDelete, inicialValues, getMarcaWithLimit,
    deleteMarcaItem, handleMarca, hadleSearchMarcaWithname, onSubmitForm } = useMarcaLista();

  const fields = MarcaFields;

  return (
    <>
      <div className="container flex items-center justify-between p-4">
        <Button onClick={openModalAdd} text={"base"}>
          <IoMdAdd className="w-6 h-6" />
          Agregar nueva marca
        </Button>
        <div className="flex items-center gap-9 ">
          <DropdownMenu getDataWithLimit={getMarcaWithLimit} pageSize={pageSize} />
          <Search name={"marca"} hadleSearch={hadleSearchMarcaWithname} />
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
          ) : (marcas.map((marca: Marca, index) => {
            return (
              <MarcaItem
                key={marca.idMarca}
                index={paginaActual * pageSize + index + 1}
                marca={marca}
                actualizarMarca={handleMarca}
                openShowDelete={openModalDelete}
              />
            );
          }))}
        </tbody>
      </table>
      {isOpenModalEdit && (
        <Formulario
          initialValue={inicialValues}
          fields={fields}
          onSubmitForm={onSubmitForm}
          onCancelForm={closeModalEdit}
          nameForm="marca"
          isEditMode={isEditMode}
        />
      )}
      {isOpenModalDelete && (
        <ModalDelete
          handleDeleteItem={deleteMarcaItem}
          closeModalDetele={closeModalDelete}
        />
      )}
    </>
  );
};
