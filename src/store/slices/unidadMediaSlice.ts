import { createSlice } from "@reduxjs/toolkit";
import { UnidadMedida } from "../../marbella/types/unidadMedida";
import { UnidadMedidaState } from "../interfaceState";

const initialUnidadMedida: UnidadMedida[] = [];

type PayloadAction<T> = {
    payload: T
}

export const unidadMedidaSlice = createSlice({
    name: 'unidadMedida',
    initialState: {
        unidadMedidas: initialUnidadMedida
    },
    reducers: {
        getAllUnidadMedida: (state: UnidadMedidaState, { payload }: PayloadAction<UnidadMedida[]>) => {
            state.unidadMedidas = payload;
        }
    }
})

export const { getAllUnidadMedida } = unidadMedidaSlice.actions;