import { useEffect, useState } from "react";
import { MarcaItem } from "./MarcaItem";
import { useDispatch, useSelector } from "react-redux";
import { actualizarMarca, agregarMarca, eliminarMarca, obtenerMarcas } from "../../../store/thunks/thunkMarca";
import { RootState } from "../../../store/rootState";
import { Marca } from "../../types/marca";
import { Skeleton } from "../../components/Skeleton";
import { ModalDelete } from "../../components/ModalDelete";
import { Button } from "../../components/Button";
import { IoMdAdd } from "react-icons/io";
import { Search } from "../../components/Search";
import { StoreDispatch } from "../../../store/store";
import { Formulario } from "../../components/Formulario";
import { DropdownMenu } from "../../components/dropdownMenu";

const initialMarca: Marca = {
  idMarca: -1,
  nombreMarca: "",
};

export const MarcaLista = () => {
  const [marca, setMarca] = useState<Marca>(initialMarca);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState<boolean>(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState<boolean>(false);


  const dispatch: StoreDispatch = useDispatch();
  const { loading, marcas, pageSize } = useSelector(
    (state: RootState) => state.marca
  );


  const hadleSearch = (buscar: string) => {
    console.log("BUSCAR", buscar);
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
  const openModalAdd = () => {
    setIsEditMode(false);
    setIsOpenModalEdit(true);
  };

  const closeModalEdit = () => {
    setIsOpenModalEdit(false);
    setIsEditMode(false);
  };

  const onSubmitForm = (values: Marca) => {
    if (isEditMode) {
      dispatch(actualizarMarca(values.idMarca, values));
    } else {
      dispatch(agregarMarca(values));
    }
    closeModalEdit();
  }
  const deleteMarcaItem = () => {
    dispatch(eliminarMarca(marca.idMarca));
    closeModalDelete();
  };

  const getMarcaWithLimit = (size: number) => {
    dispatch(obtenerMarcas(0, size))
  }

  const inicialValues: Marca = isEditMode ? marca : initialMarca;

  const fields = [
    {
      name: "nombreMarca",
      label: "Marca",
      type: "text",
      placeholder: "Ingrese la marca",
    }
  ]

  useEffect(() => {
    dispatch(obtenerMarcas());
  }, []);

  return (
    <>
      <div className="container flex items-center justify-between p-4">
        <Button onClick={openModalAdd} text={"base"}>
          <IoMdAdd className="w-6 h-6" />
          Agregar nueva marca
        </Button>
        <div className="flex items-center gap-9 ">
          <DropdownMenu getDataWithLimit={getMarcaWithLimit} pageSize={pageSize} />
          <Search name={"marca"} hadleSearch={hadleSearch} />
        </div>
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
          ) : (marcas.map((marca: Marca) => {
            return (
              <MarcaItem
                key={marca.idMarca}
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
