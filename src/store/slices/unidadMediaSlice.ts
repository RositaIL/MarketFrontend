import { createSlice } from "@reduxjs/toolkit";
import { UnidadMedida } from "../../marbella/types/unidadMedida";
import { UnidadMedidaState } from "../interfaceState";
import { PaginationResponse } from "../../marbella/types/paginationResponse";

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
        getAllUnidadMedida: (state: UnidadMedidaState, { payload }: PayloadAction<PaginationResponse<UnidadMedida>>) => {
            state.unidadMedidas = payload.content;
        }
    }
})

export const { getAllUnidadMedida } = unidadMedidaSlice.actions;