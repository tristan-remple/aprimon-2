import Queue from "./Queue"
import Sort from "./SortEnum"
import Ball from "./BallEnum"
import mongoose from "mongoose"

export default interface Trainer {
    name: string,
    since: number,
    queue: Queue,
    bio: string,
    ign: string,
    trades: boolean,
    email?: string,
    password?: string,
    self?: boolean,
    prefs: {
        sort: Sort[],
        filter: Ball
    }
}