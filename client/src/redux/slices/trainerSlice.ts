// external dependencies
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../store"
import axios, { AxiosResponse } from 'axios'

// types
import Status from "../../types/StatusEnum"
import Trainer from "../../types/Trainer"
import Ball from "../../types/BallEnum"
import OpenWindow from "../../types/WindowEnum"
import { useAppSelector } from "../hooks"
import { selectCollection } from "./aprimonSlice"
import Aprimon from "../../types/Aprimon"

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
    openDetails: string | null,
    data: Trainer
}

const initialState: TrainerState = {
    status: Status.idle,
    error: "",
    openWindow: null,
    openDetails: null,
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

export const patchTrainer = createAsyncThunk("trainer/patch", async (trainerData: Trainer) => {
    console.log(trainerData)
    const response: AxiosResponse = await axios.patch(`${url}/${trainerData.name}`, trainerData, axiosOptions)
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
        },
        setOpenDetails: (state, action) => {
            state.openWindow = OpenWindow.Details
            state.openDetails = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getTrainer.pending, (state, action) => {
                state.status = Status.loading
            })
            .addCase(getTrainer.fulfilled, (state, action) => {
                if (!action.payload.data) {
                    return
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
            .addCase(patchTrainer.pending, (state, action) => {
                state.status = Status.loading
            })
            .addCase(patchTrainer.fulfilled, (state, action) => {
                if (!action.payload.data) {
                    return
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
            .addCase(patchTrainer.rejected, (state, action) => {
                state.status = Status.failed
                state.error = action.error.message ? action.error.message : "Bad request"
            })
    }
})

export const {
    addQueue,
    clearQueue,
    setOpenWindow,
    setOpenDetails
} = trainerSlice.actions

export const selectUsername = (state: RootState) => state.trainer.data.name
export const selectStats = (state: RootState) => {
    const { bio, since, queue } = state.trainer.data
    return { bio, since, queue }
}
export const selectOpenWindow = (state: RootState) => state.trainer.openWindow
export const selectQueue = (state: RootState) => state.trainer.data.queue
export const selectTrainer = (state: RootState) => state.trainer.data
export const selectDetails = (state: RootState) => state.trainer.openDetails

export default trainerSlice.reducer