
import { createSlice } from "@reduxjs/toolkit";
import { Marca } from '../../marbella/types/marca';
import { MarcaState } from "../interfaceState";

const initialMarca: Marca[] = [];

type PayloadAction<T> = {
    payload: T
}

export const marcaSlice = createSlice(
    {
        name: 'marca',
        initialState: {
            loading: false,
            marcas: initialMarca,
            messageError: '',
            operationState: ''
        },
        reducers: {
            startLoading: (state: MarcaState) => {
                state.loading = true;
            },
            handleErrorMessage: (state: MarcaState, { payload }: PayloadAction<string>) => {
                state.messageError = payload;
                state.operationState = '';
            },
            clearHandleErrorMessage: (state: MarcaState) => {
                state.messageError = '';
                state.operationState = '';
                state.loading = false;
            },
            clearOperationState: (state: MarcaState) => {
                state.operationState = '';
            },
            getAllMarca: (state, { payload }: PayloadAction<Marca[]>) => {
                state.marcas = payload;
                state.loading = false;
                state.messageError = '';
                state.operationState = '';
            },
            saveMarca: (state: MarcaState, { payload }: PayloadAction<Marca>) => {
                state.marcas = [payload, ...state.marcas];
                state.loading = false;
                state.operationState = 'Agregado';
                state.messageError = '';
            },
            updateMarca: (state: MarcaState, { payload }: PayloadAction<Marca>) => {
                const index = state.marcas.findIndex((marca: Marca) => marca.idMarca === payload.idMarca);
                if (index !== -1) {
                    state.marcas[index] = payload;
                    state.loading = false;
                    state.operationState = 'Actualizado';
                    state.messageError = '';
                }
            },
            deleteMarca: (state: MarcaState, { payload }: PayloadAction<number>) => {
                const index = state.marcas.findIndex((marca: Marca) => marca.idMarca === payload);
                if (index !== -1) {
                    state.marcas = state.marcas.filter(marca => marca.idMarca !== payload);
                    state.loading = false;
                    state.operationState = 'Eliminado';
                    state.messageError = '';
                }
            }
        }
    }
)

export const { getAllMarca, saveMarca, updateMarca, deleteMarca, handleErrorMessage, clearHandleErrorMessage, startLoading, clearOperationState } = marcaSlice.actions;