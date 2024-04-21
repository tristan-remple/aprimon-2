import Queue from "./Queue"

export default interface Trainer {
    name: string,
    since: number,
    queue: Queue,
    bio: string,
    ign: string,
    trades: boolean,
    email?: string,
    password?: string,
    self?: boolean
}