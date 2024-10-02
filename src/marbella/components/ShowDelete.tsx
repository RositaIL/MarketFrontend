import React from "react"
import { MdErrorOutline } from "react-icons/md";
import { IoClose } from "react-icons/io5";

interface ShowDeleteProps {
    handleDeleteItem: () => void,
    closeShowDetele: () => void
}


export const ShowDelete: React.FC<ShowDeleteProps> = ({ handleDeleteItem, closeShowDetele }) => {

    const handleCloseShow = () => closeShowDetele();
    const deleteDelete = () => handleDeleteItem();

    return (
        <div className="fixed inset-0 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 relative">
                <IoClose onClick={handleCloseShow} className="w-6 h-6 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 float-right" />

                <div className="my-8 text-center">
                    <MdErrorOutline className="w-14 h-14 fill-red-500 inline" />
                    <h4 className="text-lg text-gray-800 font-semibold mt-6"> La marca sera eliminada permanente</h4>
                    <p className="text-sm text-gray-500 mt-2"> ¿Estas seguro de proceder?</p>
                </div>

                <div className="flex max-sm:flex-col gap-4">
                    <button onClick={handleCloseShow} type="button" className="px-5 py-2.5 rounded-lg w-full tracking-wide text-gray-800 text-sm border-none outline-none bg-gray-200 hover:bg-gray-300">
                        Cancelar
                    </button>
                    <button onClick={deleteDelete} type="button" className="px-5 py-2.5 rounded-lg w-full tracking-wide text-white text-sm border-none outline-none bg-red-500 hover:bg-red-600">
                        Eliminar permanente
                    </button>
                </div>
            </div>
        </div>
    )
}
