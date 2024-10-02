import { useEffect, useState } from "react"
import { MarcaItem } from "./MarcaItem"
import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { eliminarMarca, obtenerMarcas } from "../../../store/thunks/thunkMarca";
import { RootState } from "../../../store/rootState";
import { Marca } from "../../interface/marca";
import { Skeleton } from "../../components/Skeleton";
import { ShowMarca } from "./ShowMarca";
import { IoClose } from "react-icons/io5";
import { FaCircleCheck } from "react-icons/fa6";
import { ShowDelete } from "../../components/ShowDelete";

const marcaInicial = {
    idMarca: '',
    nombreMarca: ''
}

export const MarcaLista = () => {

    const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false);
    const [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
    const [marca, setMarca] = useState<Marca>(marcaInicial);

    const dispatch: any = useDispatch();
    const { loading, marcas, messageError, status } = useSelector((state: RootState) => state.marca);

    useEffect(() => {
        if (messageError) {
            Swal.fire('Error', messageError, 'error');
        }
    }, [messageError])

    useEffect(() => {
        dispatch(obtenerMarcas());
    }, []);

    const actualizarMarca = (marca: Marca) => {
        setMarca(marca);
        setIsOpenEdit(!isOpenEdit);
    };
    const deleteMarca = () => {
        dispatch(eliminarMarca(marca.idMarca));
        closeShowRemoveMarca();
    };
    const openShowDelete = (id: string) => {
        setIsOpenDelete(true);
        setMarca({ ...marca, idMarca: id });
    };
    const closeShowUpdateMarca = () => {
        setIsOpenEdit(false);
    };
    const closeShowRemoveMarca = () => {
        setIsOpenDelete(false);
    };

    return (
        <>
            {status ? (
                <div className="bg-green-500 text-white absolute right-0 font-semibold tracking-wide flex items-center w-max max-w-sm p-4 rounded-md shadow-md shadow-green-200 mx-auto mt-4 font-[sans-serif]" role="alert">
                    <FaCircleCheck className="w-5 h-5 shrink-0 fill-white inline mr-3" />
                    <span className="block sm:inline text-sm mr-3"> {status} correctamente</span>
                    <IoClose className="w-5 h-5 cursor-pointer shrink-0 fill-white ml-auto" />
                </div>
            ) : undefined}

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
                    {
                        (loading && (
                            <tr>
                                <td colSpan={3} className="p-2">
                                    <Skeleton times={5} className="h-10 w-full" />
                                </td>
                            </tr>
                        ))
                    }
                    {
                        marcas.map((marca: Marca) => {
                            return <MarcaItem
                                key={marca.idMarca}
                                marca={marca}
                                actualizarMarca={actualizarMarca}
                                openShowDelete={openShowDelete}
                            />
                        })
                    }
                </tbody>
            </table>
            {isOpenEdit && (
                <ShowMarca
                    isOpen={isOpenEdit}
                    marca={marca}
                    closeShowMarca={closeShowUpdateMarca}
                />
            )}
            {isOpenDelete && (
                <ShowDelete
                    handleDeleteItem={deleteMarca}
                    closeShowDetele={closeShowRemoveMarca}
                />
            )}

        </>
    )
}
