import React from 'react'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { selectQueue, clearQueue } from '../../redux/slices/trainerSlice'
import { patchAprimon, selectFromQueue } from '../../redux/slices/aprimonSlice'
import ConfirmButton from './ConfirmButton'
import CloseButton from './CloseButton'
import Aprimon from '../../types/Aprimon'

const HatchEggs = () => {

    const dispatch = useAppDispatch()

    const queue = useAppSelector(selectQueue)
    const apri = useAppSelector(selectFromQueue)
    const { number, form, pokemon, ball } = queue

    const confirmQueue = () => {
        const newApri: Aprimon = {...apri}
        newApri.eggs += queue.number
        dispatch(patchAprimon(newApri))
        dispatch(clearQueue())
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