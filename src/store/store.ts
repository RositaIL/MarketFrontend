
import { configureStore } from "@reduxjs/toolkit"
import { authSlice } from "./auth"
import { marcaSlice } from "./slices/marcaSlice"

export const store = configureStore(
    {
        reducer: {
            auth: authSlice.reducer,
            marca: marcaSlice.reducer,
        },
    }
)
