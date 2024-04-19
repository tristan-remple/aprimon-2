// external dependencies
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../store"
import axios, { AxiosResponse } from 'axios'

// types
import Aprimon from "../../types/Aprimon"
import Status from "../../types/StatusEnum"
import Queue from "../../types/Queue"

// abbreviate api url
const url: string = `${import.meta.env.VITE_API_URL}/aprimon`

const axiosOptions = {
    withCredentials: true,
    validateStatus: (status: number) => {
        return true;
    }
}

interface AprimonState {
    status: Status,
    error: string,
    metadata: {
        count: number,
        shinies: number,
        eggs: number,
        ratio: number
    },
    data: Aprimon[]
}

const initialState: AprimonState = {
    status: Status.idle,
    error: "",
    metadata: {
        count: 0,
        shinies: 0,
        eggs: 0,
        ratio: 0
    },
    data: []
}

export const getAprimon = createAsyncThunk("aprimon/get", async (username: string) => {
    const response: AxiosResponse = await axios.get(`${url}/${username}`, axiosOptions)
    return response
})

export const postAprimon = createAsyncThunk("aprimon/post", async (apriData: Aprimon) => {
    const response: AxiosResponse = await axios.post(url, apriData, axiosOptions)
    return response
})

export const patchAprimon = createAsyncThunk("aprimon/patch", async (apriData: Aprimon) => {
    const response: AxiosResponse = await axios.patch(url, apriData, axiosOptions)
    return response
})

export const aprimonSlice = createSlice({
    name: "aprimon",
    initialState,
    reducers: {
        addFromQueue: (state, action) => {
            const queue: Queue = action.payload
            const { pokemon, ball, form, number } = queue
            const aprimon = state.data?.filter((apri) => {
                return apri.pokemon.name === pokemon.toLowerCase() && (apri.pokemon.form === form || !apri.pokemon.form && !form) && apri.ball === ball.toLowerCase()
            })[0]
            aprimon.eggs += number
        },
        addAprimon: (state, action) => {
            state.data.push(action.payload)
        }
    },
    extraReducers(builder) {
        builder
            .addCase(postAprimon.pending, (state, action) => {
                state.status = Status.loading
            })
            .addCase(postAprimon.fulfilled, (state, action) => {
                state.data.push(action.payload.data)
                state.status = Status.success
                state.error = ""
            })
            .addCase(postAprimon.rejected, (state, action) => {
                state.status = Status.failed
                state.error = action.error.message ? action.error.message : "Bad request"
            })
            .addCase(patchAprimon.pending, (state, action) => {
                state.status = Status.loading
            })
            .addCase(patchAprimon.fulfilled, (state, action) => {
                const update: Aprimon = action.payload.data
                state.data = state.data.map(apri => {
                    if (update.pokemon.name === apri.pokemon.name &&
                        update.pokemon.form === apri.pokemon.form &&
                        update.ball === apri.ball) {
                        return update
                    } else {
                        return apri
                    }
                })
                state.status = Status.success
                state.error = ""
            })
            .addCase(patchAprimon.rejected, (state, action) => {
                state.status = Status.failed
                state.error = action.error.message ? action.error.message : "Bad request"
            })
            .addCase(getAprimon.pending, (state, action) => {
                state.status = Status.loading
            })
            .addCase(getAprimon.fulfilled, (state, action) => {
                if (!action.payload.data) {
                    return;
                }

                const collection: Aprimon[] = action.payload.data

                const count : number = collection?.filter((pkmn) => !pkmn.wishlist).length
                const shinies : number = collection?.filter((pkmn) => pkmn.final).length
                const eggs : number = collection.reduce((tally: number, pkmn) => {
                    return tally + pkmn.eggs
                }, 0)
                const ratio : number = Math.round(eggs / shinies)

                state.status = Status.success
                state.error = ""

                state.data = collection
                state.metadata = {
                    count,
                    shinies,
                    eggs,
                    ratio
                }
            })
            .addCase(getAprimon.rejected, (state, action) => {
                state.status = Status.failed
                state.error = action.error.message ? action.error.message : "Bad request"
            })
    }
})

export const {
    addFromQueue,
    addAprimon
} = aprimonSlice.actions

export const selectCollection = (state: RootState) => state.aprimon.data
export const selectMetadata = (state: RootState) => state.aprimon.metadata
export const selectFromQueue = (state: RootState) => state.aprimon.data.filter(apri => {
    const queue = state.trainer.data.queue
    return apri.pokemon.name === queue.pokemon &&
    apri.pokemon.form === queue.form &&
    apri.ball === queue.ball
})[0]

export default aprimonSlice.reducer