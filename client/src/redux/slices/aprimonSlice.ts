import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../store"
import axios from 'axios';

// abbreviate api url
const url = `${import.meta.env.VITE_API_URL}/aprimon`;

const axiosOptions = {
    withCredentials: true,
    validateStatus: (status) => {
        return true;
    }
}

const initialState = {
    status: "idle",
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
    const response = await axios.get(`${url}/${username}`, axiosOptions)
    return response
})

export const aprimonSlice = createSlice({
    name: "aprimon",
    initialState,
    reducers: {
        addFromQueue: (state, action) => {
            const queue = action.payload
            const { pokemon, ball, form, number } = queue
            const aprimon = state.data?.filter((apri) => {
                return apri.pokemon.name === pokemon && (apri.pokemon.form === form || !apri.pokemon.form && !form) && apri.ball === ball
            })[0]
            aprimon.eggs += parseInt(number)
        },
        addAprimon: (state, action) => {
            state.data.push(action.payload)
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getAprimon.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(getAprimon.fulfilled, (state, action) => {
                if (!action.payload.data) {
                    return;
                }

                const collection = action.payload.data

                const count : number = collection?.filter((pkmn) => !pkmn.wishlist).length
                const shinies : number = collection?.filter((pkmn) => pkmn.final).length
                const eggs : number = collection.reduce((tally: number, pkmn) => {
                    return tally + pkmn.eggs
                }, 0)
                const ratio : number = Math.round(eggs / shinies)

                state.status = "success"
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
                state.status = "failed"
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

export default aprimonSlice.reducer