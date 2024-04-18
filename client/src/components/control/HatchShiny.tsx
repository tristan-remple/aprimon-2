import React from 'react'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import { selectQueue, clearQueue } from '../../redux/slices/trainerSlice'
import { addFromQueue } from '../../redux/slices/aprimonSlice'
import ConfirmButton from './ConfirmButton'
import CloseButton from './CloseButton'
import Queue from '../../types/Queue'
import Ball from '../../types/BallEnum'

const HatchShiny = () => {

    const dispatch = useAppDispatch()

    const queue: Queue = useAppSelector(selectQueue)
    const { pokemon, ball, form, number } = queue

    const confirmQueue = () => {
        dispatch(addFromQueue(queue))
        dispatch(clearQueue())
    }

    return (
        <div id="zoom" className="box">
            <h2>Confirm that a shiny {ball} {form} {pokemon} has hatched?</h2>
            <div className="nav-row">
                <ConfirmButton confirm={ confirmQueue } />
                <CloseButton />
            </div>
        </div>
    )
}

export default HatchShiny