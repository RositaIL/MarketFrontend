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
import { PaginationResponse } from "../../marbella/types/paginationResponse";

export const obtenerCategorias = (page: number = 0, size: number = 5, name: string = '') => {
  return async (dispatch: StoreDispatch) => {
    dispatch(startLoading());
    try {
      const { data } = await marbellaApi.get<PaginationResponse<Categoria>>(`/categoria?page=${page}&size=${size}&nombre=${name}`);
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
        };
      };
    };
  };
};

export const agregarCatergoria = (categoria: Categoria) => {
  return async (dispatch: StoreDispatch) => {
    dispatch(startLoading());
    try {
      await marbellaApi.post<Categoria>("/categoria", categoria);
      dispatch(saveCategory());
    } catch (Error) {
      if (axios.isAxiosError(Error)) {
        if (Error.code === "ERR_NETWORK") {
          dispatch(handleErrorMessage("El servidor no está disponible en este momento. Por favor, intente de nuevo más tarde"));
        } else {
          const { error }: { error: string } = Error.response!.data;
          dispatch(handleErrorMessage(error));
        };
      };
    };
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
        };
      };
    };
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
        };
      };
    };
  };
};

export const filtrarCategoriaPorNombre = (page: number = 0, size: number = 5, name: string = '') => {
  return async (dispatch: StoreDispatch) => {
    try {
      const { data } = await marbellaApi.get<PaginationResponse<Categoria>>(`/categoria?page=${page}&size=${size}&nombre=${name}`);
      dispatch(getAllCategory(data));
    } catch (Error) {
      if (axios.isAxiosError(Error)) {
        if (Error.code === "ERR_NETWORK") {
          dispatch(handleErrorMessage("El servidor no está disponible en este momento. Por favor, intente de nuevo más tarde"));
        } else {
          const { error }: { error: string } = Error.response!.data;
          dispatch(handleErrorMessage(error));
        };
      };
    };
  };
};
