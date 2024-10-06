import React from "react";
import { MdErrorOutline } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { Button } from "./Button";

interface ShowDeleteProps {
  handleDeleteItem: () => void;
  closeModalDetele: () => void;
}

export const ModalDelete: React.FC<ShowDeleteProps> = ({
  handleDeleteItem,
  closeModalDetele,
}) => {
  const handleCloseShow = () => closeModalDetele();
  const deleteDelete = () => handleDeleteItem();

  return (
    <div className="fixed inset-0 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 relative">
        <IoClose
          onClick={handleCloseShow}
          className="w-6 h-6 cursor-pointer shrink-0 fill-gray-400 hover:fill-red-500 float-right"
        />

        <div className="my-8 text-center">
          <MdErrorOutline className="w-14 h-14 fill-red-500 inline" />
          <h4 className="text-lg text-gray-800 font-semibold mt-6">
            {" "}
            La marca sera eliminada permanente
          </h4>
          <p className="text-sm text-gray-500 mt-2">
            {" "}
            ¿Estas seguro de proceder?
          </p>
        </div>

        <div className="flex max-sm:flex-col gap-4">
          <Button
            onClick={handleCloseShow}
            colorBG={"gray-200"}
            colorText={"gray-800"}
            hoverColor={"bg-gray-300"}
            activeColor=""
            width={"w-full"}
          >
            Cancelar
          </Button>
          <Button
            onClick={deleteDelete}
            colorBG={"red-800"}
            hoverColor={"bg-red-800"}
            activeColor=""
            width={"w-full"}
          >
            Eliminar permanente
          </Button>
        </div>
      </div>
    </div>
  );
};
