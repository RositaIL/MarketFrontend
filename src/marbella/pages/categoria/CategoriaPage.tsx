import { FaCircleCheck } from "react-icons/fa6";
import { CategoriaLista } from "./CategoriaLista";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/rootState";
import { clearHandleErrorMessage, clearOperationState } from "../../../store/slices/categoriaSlice";
import { useEffect } from "react";
import Swal from 'sweetalert2';

export const CategoriaPage = () => {

  const dispatch = useDispatch();
  const { operationState, messageError } = useSelector((state: RootState) => state.categoria);

  useEffect(() => {
    if (messageError) {
      Swal.fire("Error", messageError, "error");
      dispatch(clearHandleErrorMessage());
    }
  }, [messageError]);

  useEffect(() => {
    if (operationState) {
      setTimeout(() => {
        dispatch(clearOperationState());
      }, 1500);
    }
  }, [operationState])

  return (
    <div className="font-sans overflow-x-auto">
      {operationState && (
        <div
          className="bg-green-500 text-white absolute right-0 font-semibold tracking-wide flex items-center w-max max-w-sm p-4 rounded-md shadow-md shadow-green-200 mx-auto font-[sans-serif]"
          role="alert"
        >
          <FaCircleCheck className="w-5 h-5 shrink-0 fill-white inline mr-3" />
          <span className="block sm:inline text-sm mr-3">
            {operationState} correctamente
          </span>
          <IoClose className="w-5 h-5 cursor-pointer shrink-0 fill-white ml-auto" />
        </div>
      )}
      <CategoriaLista />
      <div className="md:flex m-4">
        <p className="text-sm text-gray-500 flex-1">
          Showind 1 to 5 of 100 entries
        </p>

        <div className="flex items-center max-md:mt-4">
          <p className="text-sm text-gray-500">Display</p>
          <select className="text-sm text-gray-500 border border-gray-400 rounded h-7 mx-4 px-1 outline-none">
            <option>5</option>
            <option>10</option>
            <option>20</option>
            <option>50</option>
            <option>100</option>
          </select>

          <ul className="flex space-x-1 ml-2">
            <li className="flex items-center justify-center cursor-pointer bg-blue-100 w-7 h-7 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 fill-gray-500"
                viewBox="0 0 55.753 55.753"
              >
                <path
                  d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                  data-original="#000000"
                />
              </svg>
            </li>
            <li className="flex items-center justify-center cursor-pointer text-sm w-7 h-7 text-gray-500 rounded">
              1
            </li>
            <li className="flex items-center justify-center cursor-pointer text-sm bg-[#007bff] text-white w-7 h-7 rounded">
              2
            </li>
            <li className="flex items-center justify-center cursor-pointer text-sm w-7 h-7 text-gray-500 rounded">
              3
            </li>
            <li className="flex items-center justify-center cursor-pointer text-sm w-7 h-7 text-gray-500 rounded">
              4
            </li>
            <li className="flex items-center justify-center cursor-pointer bg-blue-100 w-7 h-7 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-3 fill-gray-500 rotate-180"
                viewBox="0 0 55.753 55.753"
              >
                <path
                  d="M12.745 23.915c.283-.282.59-.52.913-.727L35.266 1.581a5.4 5.4 0 0 1 7.637 7.638L24.294 27.828l18.705 18.706a5.4 5.4 0 0 1-7.636 7.637L13.658 32.464a5.367 5.367 0 0 1-.913-.727 5.367 5.367 0 0 1-1.572-3.911 5.369 5.369 0 0 1 1.572-3.911z"
                  data-original="#000000"
                />
              </svg>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
