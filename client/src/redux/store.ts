import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"

import trainerReducer from './slices/trainerSlice'
import possibleReducer from "./slices/possibleSlice"
import aprimonReducer from './slices/aprimonSlice'

export const store = configureStore({
  reducer: {
    aprimon: aprimonReducer,
    possible: possibleReducer,
    trainer: trainerReducer
  },
  // ignore axios peripherals from api calls
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload.headers', 'payload.config', 'payload.request']
      }
    })
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
