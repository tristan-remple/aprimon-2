import Ball from "./BallEnum"

export default interface Queue {
    pokemon: string,
    number: number,
    ball: Ball,
    form: string | null
}