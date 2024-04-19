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
    error: string,
    data: Possible[]
}

const initialState: PossibleState = {
    status: Status.idle,
    error: "",
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
    
} = possibleSlice.actions

export const selectPossible = (state: RootState) => state.possible.data

export default possibleSlice.reducer