import { createSlice } from "@reduxjs/toolkit";
import { Categoria } from "../../marbella/types/categoria";
import { CategoriaState } from "../interfaceState";

const initialCategory: Categoria[] = [];

type PayloadAction<T> = {
    payload: T
}

export const categoriaSlice = createSlice(
    {
        name: 'categoria',
        initialState: {
            loading: false,
            categorias: initialCategory,
            messageError: '',
            operationState: '',
        },
        reducers: {
            startLoading: (state: CategoriaState) => {
                state.loading = true;
            },
            clearOperationState: (state: CategoriaState) => {
                state.operationState = '';
            },
            handleErrorMessage: (state: CategoriaState, { payload }: PayloadAction<string>) => {
                state.messageError = payload;
            },
            clearHandleErrorMessage: (state: CategoriaState) => {
                state.messageError = '';
                state.operationState = '';
                state.loading = false;
            },
            getAllCategory: (state: CategoriaState, { payload }: PayloadAction<Categoria[]>) => {
                state.categorias = payload
                state.loading = false;
                state.messageError = ''
                state.operationState = '';
            },
            saveCategory: (state: CategoriaState, { payload }: PayloadAction<Categoria>) => {
                state.categorias = [payload, ...state.categorias];
                state.messageError = '';
                state.loading = false;
                state.operationState = 'Agregado';

            },
            updateCategory: (state: CategoriaState, { payload }: PayloadAction<Categoria>) => {
                const index = state.categorias.findIndex(category => category.idCategoria === payload.idCategoria);
                if (index !== -1) {
                    state.categorias[index] = payload;
                    state.messageError = '';
                    state.loading = false;
                    state.operationState = 'Acualizadó';
                }
            },
            deleteCategoria: (state: CategoriaState, { payload }: PayloadAction<number>) => {
                const index = state.categorias.findIndex(category => category.idCategoria === payload);
                if (index !== -1) {
                    state.categorias = state.categorias.filter(category => category.idCategoria !== payload);
                    state.messageError = '';
                    state.loading = false;
                    state.operationState = 'Eliminado';
                }
            }
        }
    }
)

export const { saveCategory, getAllCategory, updateCategory, deleteCategoria, startLoading, clearOperationState, handleErrorMessage, clearHandleErrorMessage } = categoriaSlice.actions;