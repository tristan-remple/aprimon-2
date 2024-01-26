import React, { useState } from 'react'
import { selectUsername } from '../../redux/slices/trainerSlice'
import { selectPossible } from '../../redux/slices/possibleSlice'
import { addAprimon } from '../../redux/slices/aprimonSlice'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import AutoComplete from './AutoComplete'
import ucfirst from '../../helpers/ucfirst'
import CloseButton from './CloseButton'
import ConfirmButton from './ConfirmButton'

const AddApri = () => {

    const dispatch = useAppDispatch()
    const trainer = useAppSelector(selectUsername)

    const possible = useAppSelector(selectPossible)
    const list = possible.map(pokemon => {
        return pokemon.form ? `${pokemon.form} ${pokemon.name}` : pokemon.name
    })

    const [ pkmn, setPkmn ] = useState("")
    const pkmnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        setPkmn(input)
    }

    const balls = [ "beast", "dream", "fast", "friend", "heavy", "level", "love", "lure", "moon", "safari", "sport" ]
    const ballOptions = balls.map(ball => <option value={ball} key={ball}>{ucfirst(ball)}</option>)
    const [ ball, setBall ] = useState("")
    const ballChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const input = e.target.value
        setBall(input)
    }

    const natures = [ "random", "hardy", "lonely", "adamant", "naughty", "brave",
                    "bold", "docile", "impish", "lax", "relaxed",
                    "modest", "mild", "bashful", "rash", "quiet",
                    "calm", "gentle", "careful", "quirky", "sassy",
                    "timid", "hasty", "jolly", "naive", "serious" ]
    const natureOptions = natures.map(ntr => <option value={ntr} key={ntr}>{ucfirst(ntr)}</option>)
    const [ nature, setNature ] = useState("random")
    const natureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const input = e.target.value
        setNature(input)
    }

    const [ five, setFive ] = useState(false)
    const toggleFive = () => {
        const newFive = five ? false : true
        setFive(newFive)
    }

    const [ hidden, setHidden ] = useState(false)
    const toggleHidden = () => {
        const newHidden = hidden ? false : true
        setHidden(newHidden)
    }

    const [ target, setTarget ] = useState(false)
    const toggleTarget = () => {
        const newTarget = target ? false : true
        setTarget(newTarget)
    }

    const [ wishlist, setWishlist ] = useState(false)
    const toggleWishlist = () => {
        const newWishlist = wishlist ? false : true
        setWishlist(newWishlist)
    }

    const confirmAddition = () => {
        const pkmnArr = pkmn.toLowerCase().split(" ")
        let pkmnName: String
        let form
        if (pkmnArr.length === 1) {
            form = null
            pkmnName = pkmnArr[0]
        } else {
            form = pkmnArr[0]
            pkmnName = pkmnArr[1]
        }

        const dex = possible.filter(pkmn => pkmn.name === pkmnName )[0]
        const natdex = dex.natdex

        const newApri = {
            pokemon: {
                name: pkmnName,
                natdex,
                form: form
            },
            ball,
            nature,
            eggs: 0,
            onhand: 0,
            final: null,
            ha: hidden,
            fiveiv: five,
            target,
            wishlist,
            eggmoves: [],
            trainer
        }

        dispatch(addAprimon(newApri))
    }

    return (
        <div id="zoom" className="box">
            <h2>Add an Aprimon to your Collection</h2>
            <div className="field">
                <label htmlFor="pkmn">Pokemon:</label>
                <input id="pkmn" name="pkmn" type="text" value={ pkmn } onChange={ pkmnChange } />
                <AutoComplete list={ list } inputValue={ pkmn } onChange={ setPkmn } />
            </div>
            <div className="field">
                <label htmlFor="ball">Pokeball:</label>
                <select id="ball" name="ball" value={ ball } onChange={ ballChange }>
                    { ballOptions }
                </select>
            </div>
            <div className="field">
                <label htmlFor="nature">Nature:</label>
                <select id="nature" name="nature" value={ nature } onChange={ natureChange }>
                    { natureOptions }
                </select>
            </div>
            <div className="check-field field">
                <label htmlFor="five">5+ IVs?</label>
                <div className="checkbox" id="five" onClick={ toggleFive }>
                    { five && <img src="img/check.png" alt="checkmark" className="small-check" /> }
                </div>
            </div>
            <div className="check-field field">
                <label htmlFor="hidden">Hidden ability?</label>
                <div className="checkbox" onClick={ toggleHidden }>
                    { hidden && <img src="img/check.png" alt="checkmark" className="small-check" /> }
                </div>
            </div>
            <div className="check-field field">
                <label htmlFor="target">Shiny target?</label>
                <div className="checkbox" onClick={ toggleTarget }>
                    { target && <img src="img/check.png" alt="checkmark" className="small-check" /> }
                </div>
            </div>
            <div className="check-field field">
                <label htmlFor="wishlist">Wishlist only?</label>
                <div className="checkbox" onClick={ toggleWishlist }>
                    { wishlist && <img src="img/check.png" alt="checkmark" className="small-check" /> }
                </div>
            </div>
            <div className="nav-row">
                <ConfirmButton confirm={ confirmAddition } />
                <CloseButton />
            </div>
        </div>
    )
}

export default AddApri