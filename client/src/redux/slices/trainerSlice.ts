import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState, AppThunk } from "../store"
import axios from 'axios';

// abbreviate api url
const url = `${import.meta.env.VITE_API_URL}/trainers`;

const axiosOptions = {
    withCredentials: true,
    validateStatus: (status) => {
        return true;
    }
}

// export interface TrainerState {
//     status: 'idle' | 'loading' | 'complete' | 'failed',
//     error: string | null,
//     name: string,
//     ign: string,
//     tradesOpen: boolean,
//     self: boolean,
//     since: number,
//     queue: {
//         pokemon: string,
//         ball: string,
//         number: number
//     },
//     aprimon: {
//         count: number,
//         shinies: number,
//         eggs: number,
//         ratio: number,
//     },
//     collection: [
//         {
//             pokemon: {
//                 name: string,
//                 natdex: number,
//                 form: string | null
//             },
//             ball: string,
//             nature: string,
//             eggs: number,
//             onhand: number,
//             final: string,
//             ha: boolean,
//             fiveiv: boolean,
//             target: boolean,
//             wishlist: boolean,
//             eggmoves: [
//                 string
//             ]
//         }
//     ]
// }
  
const initialState = {
    status: 'idle',
    error: "",
    openWindow: "",
    data: {
        name: "",
        ign: "",
        trades: false,
        bio: "",
        since: 0,
        queue: {
            pokemon: "",
            form: null,
            ball: "",
            number: 0
        }
    }
}

export const getTrainer = createAsyncThunk("trainer/get", async (username: string) => {
    const response = await axios.get(`${url}/${username}`, axiosOptions)
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
                state.status = "loading"
            })
            .addCase(getTrainer.fulfilled, (state, action) => {
                if (!action.payload.data) {
                    return;
                }
                
                const { bio, ign, name, queue, since, trades } = action.payload.data

                state.status = "success"
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
                state.status = "failed"
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