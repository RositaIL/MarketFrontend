
import { createSlice } from "@reduxjs/toolkit";
import { Marca } from '../../marbella/interface/marca';

export const marcaSlice = createSlice(
    {
        name: 'marca',
        initialState: {
            loading: false,
            marcas: [] as Marca[],
            messageError: '',
            status: ''
        },
        reducers: {
            checkingMarca: (state) => {
                state.loading = true;
                state.marcas = [];
            },
            handleErrorMessage: (state, { payload }) => {
                state.messageError = payload;
            },
            getAllMarca: (state, { payload }) => {
                state.loading = false;
                state.marcas = payload;
                state.messageError = '';
                state.status = '';
            },
            updateMarca: (state, { payload }: { payload: Marca }) => {
                const index = state.marcas.findIndex((marca: Marca) => marca.idMarca === payload.idMarca);
                if (index !== -1) {
                    state.marcas[index] = payload;
                    state.status = 'Actualizó';
                    state.messageError = '';
                }
            },
            deleteByIdMarca: (state, { payload }) => {
                const index = state.marcas.findIndex((marca: Marca) => marca.idMarca === payload);
                if (index !== -1) {
                    state.marcas = state.marcas.filter(marca => marca.idMarca !== payload);
                    state.status = 'Eliminó';
                    state.messageError = '';
                }
            },
            addMarca: (state, { payload }) => {
                state.marcas = [payload, ...state.marcas];
                state.status = 'Añadio';
                state.messageError = '';
            },
            clearSuccessMessage: (state) => {
                state.status = '';
            }

        }
    }
)

export const { checkingMarca, getAllMarca, updateMarca, clearSuccessMessage, handleErrorMessage, deleteByIdMarca } = marcaSlice.actions;