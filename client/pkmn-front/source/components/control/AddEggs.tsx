import React, { useState } from "react"
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { addQueue, selectCollection } from "../../features/trainer/trainerSlice"
import CloseButton from "./closeButton"
import ConfirmButton from "./ConfirmButton"
import AutoComplete from "./AutoComplete"

export default function AddEggs() {

    const collection = useAppSelector(selectCollection)
    const list = collection.map(apri => {
        return apri.pokemon.form ? `${apri.ball} ${apri.pokemon.form} ${apri.pokemon.name}` : `${apri.ball} ${apri.pokemon.name}`
    })

    const dispatch = useAppDispatch()

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
        let queue = {}
        if (apriArr.length === 2) {
            queue = {
                pokemon: apriArr[1],
                ball: apriArr[0],
                number: qEggs
            }
        } else if (apriArr.length === 3) {
            queue = {
                pokemon: apriArr[2],
                form: apriArr[1],
                ball: apriArr[0],
                number: qEggs
            }
        }
        
        dispatch(addQueue(queue))
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
                <AutoComplete list={list} inputValue={ qPkmn } onChange={ setQPkmn } />
            </div>
            <p>Overwrite queue?</p>
            <div className="nav-row">
                <ConfirmButton confirm={ confirmQueue } />
                <CloseButton />
            </div>
        </div>        
    )
}