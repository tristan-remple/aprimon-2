// external dependencies
import { useAppSelector, useAppDispatch } from '../../redux/hooks'

// internal dependencies
import { selectTrainer, patchTrainer } from '../../redux/slices/trainerSlice'
import { patchAprimon, selectFromQueue } from '../../redux/slices/aprimonSlice'

// components
import ConfirmButton from './ConfirmButton'
import CloseButton from './CloseButton'

// types
import Aprimon from '../../types/Aprimon'
import Trainer from '../../types/Trainer'
import Ball from '../../types/BallEnum'

const HatchEggs = () => {

    const dispatch = useAppDispatch()

    const trainer = useAppSelector(selectTrainer)
    const apri = useAppSelector(selectFromQueue)
    const { number, form, pokemon, ball } = trainer.queue

    const confirmQueue = () => {
        const newApri: Aprimon = {...apri}
        newApri.eggs += number
        dispatch(patchAprimon(newApri))

        const newTrainer: Trainer = {...trainer}
        newTrainer.since += number
        newTrainer.queue = {
            pokemon: "",
            form: null,
            ball: Ball.select,
            number: 0
        }
        dispatch(patchTrainer(newTrainer))
    }

    return (
        <div id="zoom" className="box">
            <h2>Confirm that the {number} {form} {pokemon} eggs in queue have hatched?</h2>
            <div className="nav-row">
                <ConfirmButton confirm={ confirmQueue } />
                <CloseButton />
            </div>
        </div>
    )
}

export default HatchEggs