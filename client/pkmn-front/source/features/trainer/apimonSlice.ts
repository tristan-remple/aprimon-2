import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../../app/store"
import axios from 'axios';

// abbreviate api url
// const url = `${import.meta.env.VITE_API_URL}/trainers`;
const url = `http://localhost:1021/`;

const axiosOptions = {
    withCredentials: true,
    validateStatus: (status) => {
        return true;
    }
}

const initialState = []

export const getTrainer = createAsyncThunk("trainer/get", async (username: string) => {
    const response = await axios.get(`${url}${username}`, axiosOptions)
    return response
})

export const trainerSlice = createSlice({
    name: "trainer",
    initialState,
    reducers: {
        
    }
})

export const {
    
} = trainerSlice.actions

export const selectUsername = (state: RootState) => state.thing

export default trainerSlice.reducer