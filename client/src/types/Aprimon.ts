import mongoose from "mongoose"
import Ball from "./BallEnum"
import Nature from "./NatureEnum"

export default interface Aprimon {
    pokemon: {
        name: string,
        natdex: number,
        form: string | null
    },
    ball: Ball,
    nature: Nature,
    eggs: number,
    onhand: number,
    final: string | null,
    ha: boolean,
    fiveiv: boolean,
    target: boolean,
    wishlist: boolean,
    eggmoves: string[],
    trainer: string
}