import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"

import trainerReducer from '../features/trainer/trainerSlice'

export const store = configureStore({
  reducer: {
    // aprimon: aprimonReducer,
    // pokemon: pokemonReducer,
    trainer: trainerReducer
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
