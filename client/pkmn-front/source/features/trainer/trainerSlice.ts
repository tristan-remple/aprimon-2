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
    data: {
        name: "",
        ign: "",
        trades: false,
        since: 0,
        queue: {
            pokemon: "",
            ball: "",
            number: 0
        },
        aprimon: {
            count: 0,
            shinies: 0,
            eggs: 0,
            ratio: 0
        },
        collection: []
    }
}

export const getTrainer = createAsyncThunk("trainer/get", async (username: string) => {
    const response = await axios.get(`${url}${username}`, axiosOptions)
    return response
})

export const trainerSlice = createSlice({
    name: "trainer",
    initialState,
    reducers: {
        addAprimon: (state) => {
            // call on aprimonSlice
        },
        addQueue: (state, action) => {
            // change queue state
            // const newQueue = action.payload
            const newQueue = {
                pokemon: "totodile",
                ball: "beast",
                number: 50
            }
            state.data.queue = newQueue;
        },
        confirmQueue: (state) => {
            // reset queue state
            state.data.queue.number = 0;
            // call aprimonSlice to increment eggs hatched
        },
        confirmShiny: () => {
            // call on aprimonSlice
        },
        saveProgress: (state) => {
            // api push
        }
    },
    extraReducers(builder) {
        builder
            .addCase(getTrainer.pending, (state, action) => {
                state.status = "loading"
            })
            .addCase(getTrainer.fulfilled, (state, action) => {
                const { bio, ign, name, queue, since, trades } = action.payload.data[0]
                const collection = action.payload.data[1]

                const count : number = collection.length
                const shinies : number = collection.reduce((tally: number, pkmn) => {
                    if (pkmn.final) {
                        return tally + 1
                    }
                    return tally
                }, 0)
                const eggs : number = collection.reduce((tally: number, pkmn) => {
                    return tally + pkmn.eggs
                }, 0)
                const ratio : number = Math.round(eggs / shinies)

                state.status = "success"
                state.error = ""

                state.data = {
                    name,
                    ign,
                    trades,
                    since,
                    queue,
                    aprimon: {
                        count,
                        shinies,
                        eggs,
                        ratio
                    },
                    collection
                }
                console.log(state)
            })
            .addCase(getTrainer.rejected, (state, action) => {
                state.status = "failed"
                state.error = action.error.message ? action.error.message : "Bad request"
            })
    }
})

export const selectUsername = (state: RootState) => state.trainer.data.name
export const selectCollection = (state: RootState) => state.trainer.data.collection

export default trainerSlice.reducer