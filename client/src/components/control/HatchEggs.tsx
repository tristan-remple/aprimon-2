import React from 'react'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { selectQueue, clearQueue } from '../../redux/slices/trainerSlice'
import { addFromQueue } from '../../redux/slices/aprimonSlice'
import ConfirmButton from './ConfirmButton'
import CloseButton from './CloseButton'

const HatchEggs = () => {

    const dispatch = useAppDispatch()

    const queue = useAppSelector(selectQueue)
    const { pokemon, ball, form, number } = queue

    const confirmQueue = () => {
        dispatch(addFromQueue(queue))
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