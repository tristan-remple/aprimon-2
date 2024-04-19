// external dependencies
import { useAppSelector, useAppDispatch } from '../../redux/hooks'

// internal dependencies
import { selectQueue, clearQueue, patchTrainer, selectTrainer } from '../../redux/slices/trainerSlice'
import { addFromQueue, patchAprimon, selectFromQueue } from '../../redux/slices/aprimonSlice'

// components
import ConfirmButton from './ConfirmButton'
import CloseButton from './CloseButton'

// types
import Queue from '../../types/Queue'
import Month from '../../types/MonthEnum'
import Ball from '../../types/BallEnum'

const HatchShiny = () => {

    const dispatch = useAppDispatch()

    const trainer = useAppSelector(selectTrainer)
    const apri = useAppSelector(selectFromQueue)
    console.log(apri)
    const queue = trainer.queue
    const { pokemon, ball, form, number } = queue

    const confirmShiny = () => {
        const newTrainer = {...trainer}
        newTrainer.since = 0
        newTrainer.queue = {
            pokemon: "",
            form: null,
            ball: Ball.select,
            number: 0
        }
        dispatch(patchTrainer(newTrainer))

        const newApri = {...apri}
        const date = new Date()
        const day = date.getDate()
        const month = Month[date.getMonth()]
        const year = date.getFullYear()
        const stringDate = `${month} ${day}, ${year}`
        newApri.final = stringDate
        newApri.eggs += number
        dispatch(patchAprimon(newApri))
    }

    return (
        <div id="zoom" className="box">
            <h2>Confirm that a shiny {ball} {form} {pokemon} has hatched?</h2>
            <div className="nav-row">
                <ConfirmButton confirm={ confirmShiny } />
                <CloseButton />
            </div>
        </div>
    )
}

export default HatchShiny