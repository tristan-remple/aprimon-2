import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../store"
import axios from 'axios';

// abbreviate api url
// const url = `${import.meta.env.VITE_API_URL}/trainers`;
const url = `http://localhost:1021/pkmn`;

const axiosOptions = {
    withCredentials: true,
    validateStatus: (status) => {
        return true;
    }
}

const initialState = {
    status: "idle",
    error: "",
    data: []
}

export const getPossible = createAsyncThunk("possible/get", async () => {
    const response = await axios.get(url, axiosOptions)
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
                state.status = "loading"
            })
            .addCase(getPossible.fulfilled, (state, action) => {
                state.status = "success"
                state.error = ""
                state.data = action.payload.data
            })
            .addCase(getPossible.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message ? action.error.message : "Bad request"
            })
    }
})

export const {
    
} = possibleSlice.actions

export const selectPossible = (state: RootState) => state.possible.data

export default possibleSlice.reducer