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
    error: string | null,
    openWindow: OpenWindow | null,
    openDetails: string | null,
    loggedTrainer: string | null,
    data: Trainer
}

const initialState: TrainerState = {
    status: Status.idle,
    error: null,
    openWindow: null,
    openDetails: null,
    loggedTrainer: null,
    data: {
        name: "",
        ign: "",
        self: false,
        trades: false,
        bio: "",
        since: 0,
        prefs: {
            sort: [],
            filter: Ball.select
        },
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
    const response: AxiosResponse = await axios.patch(`${url}/${trainerData.name}`, trainerData, axiosOptions)
    return response
})

interface login {
    email: string,
    password: string
}

export const loginTrainer = createAsyncThunk("trainer/login", async (loginDetails: login) => {
    const response: AxiosResponse = await axios.post(`${url}/signin`, loginDetails, axiosOptions)
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
        },
        setSortOrder: (state, action) => {
            state.data.prefs.sort = action.payload
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

                if (typeof action.payload.data === "string") {
                    state.status = Status.failed
                    state.error = action.payload.data
                    return
                }
                
                const { bio, ign, name, queue, since, trades, self } = action.payload.data

                state.status = Status.success
                state.error = null

                state.data = {
                    name,
                    ign,
                    trades,
                    bio,
                    since,
                    queue,
                    self, 
                    prefs: {
                        sort: [],
                        filter: Ball.select
                    }
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
                
                if (typeof action.payload.data === "string") {
                    state.status = Status.failed
                    state.error = action.payload.data
                    return
                }

                const { bio, ign, name, queue, since, trades, self, prefs } = action.payload.data

                state.status = Status.success
                state.error = null

                state.data = {
                    name,
                    ign,
                    trades,
                    bio,
                    since,
                    queue,
                    self,
                    prefs: {
                        sort: [],
                        filter: Ball.select
                    }
                }
            })
            .addCase(patchTrainer.rejected, (state, action) => {
                state.status = Status.failed
                state.error = action.error.message ? action.error.message : "Bad request"
            })
            .addCase(loginTrainer.pending, (state, action) => {
                state.status = Status.loading
            })
            .addCase(loginTrainer.fulfilled, (state, action) => {

                if (!action.payload.data) {
                    return
                }

                if (typeof action.payload.data === "string") {
                    state.status = Status.failed
                    state.error = action.payload.data
                    return
                }

                state.loggedTrainer = action.payload.data.loggedTrainer

                state.status = Status.success
                state.error = null
            })
            .addCase(loginTrainer.rejected, (state, action) => {
                state.status = Status.failed
                state.error = action.error.message ? action.error.message : "Bad request"
            })
    }
})

export const {
    addQueue,
    clearQueue,
    setOpenWindow,
    setOpenDetails,
    setSortOrder
} = trainerSlice.actions

export const selectUsername = (state: RootState) => state.trainer.data.name
export const selectStats = (state: RootState) => {
    const { name, ign, bio, since, queue } = state.trainer.data
    return { name, ign, bio, since, queue }
}
export const selectOpenWindow = (state: RootState) => state.trainer.openWindow
export const selectQueue = (state: RootState) => state.trainer.data.queue
export const selectTrainer = (state: RootState) => state.trainer.data
export const selectDetails = (state: RootState) => state.trainer.openDetails
export const selectSelf = (state: RootState) => state.trainer.loggedTrainer
export const selectError = (state: RootState) => state.trainer.error
export const selectSort = (state: RootState) => state.trainer.data.prefs.sort

export default trainerSlice.reducer