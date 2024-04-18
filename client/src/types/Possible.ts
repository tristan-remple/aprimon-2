export default interface Possible {
    name: string,
    natdex: number,
    paldex?: number,
    kitdex?: number,
    bludex?: number,
    form: string | null,
    evo: string[],
    prevgen: boolean,
    swsh: boolean,
    bdsp: boolean,
    cycles: number,
    types: string[],
    hidden: string | null,
    eggmoves: string[]
}