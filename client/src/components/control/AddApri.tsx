// external dependencies
import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'
import util from '@aqualunae/util'

// internal dependencies
import { selectUsername } from '../../redux/slices/trainerSlice'
import { selectPossible } from '../../redux/slices/possibleSlice'
import { postAprimon } from '../../redux/slices/aprimonSlice'

// components
import AutoComplete from './AutoComplete'
import CloseButton from './CloseButton'
import ConfirmButton from './ConfirmButton'

// types
import Nature from '../../types/NatureEnum'
import Ball from '../../types/BallEnum'
import Aprimon from '../../types/Aprimon'

const AddApri = () => {

    const dispatch = useAppDispatch()
    const trainer = useAppSelector(selectUsername)
    const apiStatusApri = useAppSelector(state => state.aprimon.status)

    const possible = useAppSelector(selectPossible)
    const list = possible.map(pokemon => {
        return pokemon.form ? `${pokemon.form} ${pokemon.name}` : pokemon.name
    })

    const [ pkmn, setPkmn ] = useState("")
    const pkmnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        setPkmn(input)
    }

    const ballOptions = (Object.keys(Ball) as Array<keyof typeof Ball>).map((ball) => {
        return <option value={ Ball[ball] } key={ball}>{util.str.title(ball)}</option>
    })
    const [ ball, setBall ] = useState(Ball.beast)
    const ballChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const input = e.target.value
        setBall(Ball[input as keyof typeof Ball])
    }

    const natureOptions = (Object.keys(Nature) as Array<keyof typeof Nature>).map((ntr) => {
        return <option value={ Nature[ntr] } key={ntr}>{util.str.title(ntr)}</option>
    })
    const [ nature, setNature ] = useState(Nature.random)
    const natureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const input = e.target.value
        setNature(Nature[input as keyof typeof Nature])
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
        let pkmnName: string
        let form: string | null
        if (pkmnArr.length === 1) {
            form = null
            pkmnName = pkmnArr[0]
        } else {
            form = pkmnArr[0]
            pkmnName = pkmnArr[1]
        }

        const dex = possible.filter(pkmn => pkmn.name === pkmnName )[0]
        const natdex = dex.natdex

        const newApri: Aprimon = {
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

        // dispatch(addAprimon(newApri))
        if (apiStatusApri === 'idle' || apiStatusApri === 'success') {
            dispatch(postAprimon(newApri))
        }
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
                    { five && <img src="img/icons/check.png" alt="checkmark" className="small-check" /> }
                </div>
            </div>
            <div className="check-field field">
                <label htmlFor="hidden">Hidden ability?</label>
                <div className="checkbox" onClick={ toggleHidden }>
                    { hidden && <img src="img/icons/check.png" alt="checkmark" className="small-check" /> }
                </div>
            </div>
            <div className="check-field field">
                <label htmlFor="target">Shiny target?</label>
                <div className="checkbox" onClick={ toggleTarget }>
                    { target && <img src="img/icons/check.png" alt="checkmark" className="small-check" /> }
                </div>
            </div>
            <div className="check-field field">
                <label htmlFor="wishlist">Wishlist only?</label>
                <div className="checkbox" onClick={ toggleWishlist }>
                    { wishlist && <img src="img/icons/check.png" alt="checkmark" className="small-check" /> }
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