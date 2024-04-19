// external dependencies
import { useState } from "react"
import { useAppSelector, useAppDispatch } from '../../redux/hooks'

// internal dependencies
import { addQueue, selectQueue, selectTrainer, patchTrainer } from '../../redux/slices/trainerSlice'
import { selectCollection } from '../../redux/slices/aprimonSlice'

// components
import CloseButton from "./CloseButton"
import ConfirmButton from "./ConfirmButton"
import AutoComplete from "./AutoComplete"

// types
import Queue from "../../types/Queue"
import Ball from "../../types/BallEnum"

export default function AddEggs() {

    const dispatch = useAppDispatch()

    const collection = useAppSelector(selectCollection)
    const trainer = useAppSelector(selectTrainer)
    const queue = trainer.queue
    const list = collection.map(apri => {
        return apri.pokemon.form ? `${apri.ball} ${apri.pokemon.form} ${apri.pokemon.name}` : `${apri.ball} ${apri.pokemon.name}`
    })

    const [ qEggs, setQEggs ] = useState(0)
    const [ qPkmn, setQPkmn ] = useState("")

    const eggChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = parseInt(e.target.value)
        setQEggs(input)
    }

    const pkmnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        setQPkmn(input)
    }

    const confirmQueue = () => {
        const apriArr = qPkmn.split(" ");
        let newQueue: Queue
        let newTrainer = {...trainer}
        if (apriArr.length === 2) {
            newQueue = {
                pokemon: apriArr[1],
                form: null,
                ball: apriArr[0] as Ball,
                number: qEggs
            }
            newTrainer.queue = newQueue
            dispatch(patchTrainer(newTrainer))
        } else if (apriArr.length === 3) {
            newQueue = {
                pokemon: apriArr[2],
                form: apriArr[1],
                ball: apriArr[0] as Ball,
                number: qEggs
            }
            newTrainer.queue = newQueue
            dispatch(patchTrainer(newTrainer))
        }
    }

    return (
        <div id="zoom" className="box">
            <h2>Add Pokemon eggs to hatching queue</h2>
            <div className="field">
                <label htmlFor="add-q-eggs">Eggs:</label>
                <input id="add-q-eggs" name="add-q-eggs" type="number" value={ qEggs } onChange={ eggChange } />
            </div>
            <div className="field">
                <label htmlFor="add-q-pkmn">Aprimon:</label>
                <input id="add-q-pkmn" name="add-q-pkmn" type="text" value={ qPkmn } onChange={ pkmnChange } />
                <AutoComplete list={ list } inputValue={ qPkmn } onChange={ setQPkmn } />
            </div>
            { queue.number !== 0 && <p>Overwrite queue?</p> }
            <div className="nav-row">
                <ConfirmButton confirm={ confirmQueue } />
                <CloseButton />
            </div>
        </div>        
    )
}