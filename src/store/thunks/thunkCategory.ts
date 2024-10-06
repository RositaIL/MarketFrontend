import { StoreDispatch } from "../store";
import axios from "axios";
import { marbellaApi } from "../../api/marbellaApi";
import {
  deleteCategoria,
  getAllCategory,
  handleErrorMessage,
  saveCategory,
  startLoading,
  updateCategory,
} from "../slices/categoriaSlice";
import { Categoria } from "../../marbella/types/categoria";

export const obtenerCategorias = () => {
  return async (dispatch: StoreDispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await marbellaApi.get<Categoria[]>("/categoria");
      setTimeout(() => {
        dispatch(getAllCategory(data));
      }, 1500);
    } catch (Error) {
      if (axios.isAxiosError(Error)) {
        if (Error.code === "ERR_NETWORK") {
          dispatch(handleErrorMessage("El servidor no está disponible en este momento. Por favor, intente de nuevo más tarde"));
        } else {
          const { error }: { error: string } = Error.response!.data;
          dispatch(handleErrorMessage(error));
        }
      }
      console.log("Error: ", Error);
    }
  };
};

export const agregarCatergoria = (categoria: Categoria) => {
  return async (dispatch: StoreDispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await marbellaApi.post<Categoria>(
        "/categoria",
        categoria
      );
      dispatch(saveCategory(data));
    } catch (Error) {
      if (axios.isAxiosError(Error)) {
        if (Error.code === "ERR_NETWORK") {
          dispatch(
            handleErrorMessage(
              "El servidor no está disponible en este momento. Por favor, intente de nuevo más tarde"
            )
          );
        } else {
          const { error }: { error: string } = Error.response!.data;
          dispatch(handleErrorMessage(error));
        }
      }
      console.log("Error: ", Error);
    }
  };
};

export const actualizarCategoria = (idCategoria: number, categoria: Categoria) => {
  return async (dispatch: StoreDispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await marbellaApi.put<Categoria>(`/categoria/${idCategoria}`, categoria);
      dispatch(updateCategory(data));
    } catch (Error) {
      if (axios.isAxiosError(Error)) {
        if (Error.code === "ERR_NETWORK") {
          dispatch(
            handleErrorMessage("El servidor no está disponible en este momento. Por favor, intente de nuevo más tarde")
          );
        } else {
          const { error }: { error: string } = Error.response!.data;
          dispatch(handleErrorMessage(error));
        }
      }
      console.log("Error: ", Error);
    }
  };
};

export const eliminarCategoria = (idCategoria: number) => {
  return async (dispatch: StoreDispatch) => {
    dispatch(startLoading());
    try {
      marbellaApi.delete(`/categoria/${idCategoria}`);
      dispatch(deleteCategoria(idCategoria));
    } catch (Error) {
      if (axios.isAxiosError(Error)) {
        if (Error.code === "ERR_NETWORK") {
          dispatch(
            handleErrorMessage("El servidor no está disponible en este momento. Por favor, intente de nuevo más tarde")
          );
        } else {
          const { error }: { error: string } = Error.response!.data
          dispatch(handleErrorMessage(error));
        }
      }
      console.log("Error: ", Error);
    }
  }
}
