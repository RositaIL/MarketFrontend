import { createSlice } from "@reduxjs/toolkit";
import { Rol } from '../../marbella/types/rol';
import { RolState } from "../interfaceState";

const initialRol: Rol[] = []

type PayloadAction<T> = {
    payload: T
}

export const rolSlice = createSlice({
    name: 'rol',
    initialState: {
        roles: initialRol,
    },
    reducers: {
        getAllRols: (state: RolState, { payload }: PayloadAction<Rol[]>) => {
            state.roles = payload;
        }
    }
})

export const { getAllRols } = rolSlice.actions;