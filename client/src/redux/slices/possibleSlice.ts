// external dependencies
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../store"
import axios, { AxiosResponse } from 'axios'

// types
import Possible from "../../types/Possible"
import Status from "../../types/StatusEnum"

// abbreviate api url
const url: string = `${import.meta.env.VITE_API_URL}/pkmn`

const axiosOptions = {
    withCredentials: true,
    validateStatus: (status: number) => {
        return true;
    }
}

interface PossibleState {
    status: Status,
    error: string | null,
    data: Possible[]
}

const initialState: PossibleState = {
    status: Status.idle,
    error: null,
    data: []
}

export const getPossible = createAsyncThunk("possible/get", async () => {
    const response: AxiosResponse = await axios.get(url, axiosOptions)
    return response
})

export const possibleSlice = createSlice({
    name: "possible",
    initialState,
    reducers: {
        clearPossibleError: (state) => {
            state.error = null
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getPossible.pending, (state, action) => {
                state.status = Status.loading
            })
            .addCase(getPossible.fulfilled, (state, action) => {
                state.status = Status.success
                state.error = ""
                state.data = action.payload.data
            })
            .addCase(getPossible.rejected, (state, action) => {
                state.status = Status.failed
                state.error = action.error.message ? action.error.message : "Bad request"
            })
    }
})

export const {
    clearPossibleError
} = possibleSlice.actions

export const selectPossible = (state: RootState) => state.possible.data
export const selectPokeDetails = (state: RootState) => state.possible.data.filter(pkmn => {
    const selection = state.trainer.openDetails?.split("-")
    if (!selection) { return false }
    return pkmn.name === selection[1] && (pkmn.form === selection[2] || (pkmn.form === null && selection[2] === undefined))
})[0]
export const selectPossibleError = (state: RootState) => state.trainer.error

export default possibleSlice.reducer