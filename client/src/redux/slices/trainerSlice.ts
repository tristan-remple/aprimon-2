// external dependencies
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../store"
import axios, { AxiosResponse } from 'axios'

// types
import Status from "../../types/StatusEnum"
import Trainer from "../../types/Trainer"
import Ball from "../../types/BallEnum"
import OpenWindow from "../../types/WindowEnum"

// abbreviate api url
const url = `${import.meta.env.VITE_API_URL}/trainers`

const axiosOptions = {
    withCredentials: true,
    validateStatus: (status: number) => {
        return true;
    }
}

interface TrainerState {
    status: Status,
    error: string,
    openWindow: OpenWindow | null,
    data: Trainer
}

const initialState = {
    status: Status.idle,
    error: "",
    openWindow: null,
    data: {
        name: "",
        ign: "",
        trades: false,
        bio: "",
        since: 0,
        queue: {
            pokemon: "",
            form: null,
            ball: Ball.select,
            number: 0
        }
    }
}

export const getTrainer = createAsyncThunk("trainer/get", async (username: string) => {
    const response: AxiosResponse = await axios.get(`${url}/${username}`, axiosOptions)
    return response
})

export const trainerSlice = createSlice({
    name: "trainer",
    initialState,
    reducers: {
        addQueue: (state, action) => {
            state.data.queue = action.payload
        },
        clearQueue: (state) => {
            const queueNumber = state.data.queue.number
            state.data.since += queueNumber
            state.data.queue.number = 0
        },
        saveProgress: (state) => {
            // api push
        },
        setOpenWindow: (state, action) => {
            state.openWindow = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getTrainer.pending, (state, action) => {
                state.status = Status.loading
            })
            .addCase(getTrainer.fulfilled, (state, action) => {
                if (!action.payload.data) {
                    return;
                }
                
                const { bio, ign, name, queue, since, trades } = action.payload.data

                state.status = Status.success
                state.error = ""

                state.data = {
                    name,
                    ign,
                    trades,
                    bio,
                    since,
                    queue
                }
            })
            .addCase(getTrainer.rejected, (state, action) => {
                state.status = Status.failed
                state.error = action.error.message ? action.error.message : "Bad request"
            })
    }
})

export const {
    addQueue,
    clearQueue,
    setOpenWindow
} = trainerSlice.actions

export const selectUsername = (state: RootState) => state.trainer.data.name
export const selectStats = (state: RootState) => {
    const { bio, since, queue } = state.trainer.data
    return { bio, since, queue }
}
export const selectOpenWindow = (state: RootState) => state.trainer.openWindow
export const selectQueue = (state: RootState) => state.trainer.data.queue

export default trainerSlice.reducer