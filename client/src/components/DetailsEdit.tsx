// external dependencies
import { useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"
import util from '@aqualunae/util'

// internal dependencies
import { selectOpenWindow, selectUsername, setOpenWindow } from "../redux/slices/trainerSlice"
import { patchAprimon, selectApriDetails } from "../redux/slices/aprimonSlice"
import { selectPokeDetails } from "../redux/slices/possibleSlice"

// types
import OpenWindow from "../types/WindowEnum"
import CloseButton from "./control/CloseButton"
import Nature from "../types/NatureEnum"
import ConfirmButton from "./control/ConfirmButton"
import FieldError from "./control/FieldError"

const DetailsEdit = () => {

    const dispatch = useAppDispatch()
    const trainerViewing = useAppSelector(selectUsername)
    const apiStatusApri = useAppSelector(state => state.aprimon.status)
    const openWindow = useAppSelector(selectOpenWindow)
    const aprimon = useAppSelector(selectApriDetails)
    const pkmn = useAppSelector(selectPokeDetails)
    if (openWindow !== OpenWindow.DetailsEdit || !aprimon || !pkmn) { return }

    const { pokemon, ball, nature, eggs, onhand, final, ha, fiveiv, target, wishlist, eggmoves, trainer } = aprimon
    const { name, natdex, form } = pokemon
    const { evo, cycles, types, hidden, eggmoves: possibleEggmoves } = pkmn

    const zoomClass = final ? "shiny box" : "box"
    let strdex : string = natdex.toString().padStart(3, "0")
    let src: string = form ? `./img/basic/${ strdex }-${ form[0] }.png` : `./img/basic/${ strdex }.png`
    if (final) { src = form ? `./img/shiny/${ strdex }-${ form[0] }.png` : `./img/shiny/${ strdex }.png` }
    const imageAlt = form ? util.str.title(`${ form } ${ name }`) : util.str.title(name)
    const ballSrc = `./img/icons/${ ball }ball.png`
    const ballAlt = `${ ball } ball`
    const title = form ? util.str.title(`${ ball } ${ form } ${ name }`) : util.str.title(`${ ball } ${ name }`)

    const [ eggmovesIn, setEggmoves ] = useState(eggmoves)
    const toggleEggmove = (e: React.MouseEvent<HTMLSpanElement>) => {
        const target = e.target as HTMLSpanElement
        const move = target.id
        const possibleIndex = possibleEggmoves.findIndex(em => em === move)
        const currentIndex = eggmovesIn.findIndex(em => em === move)
        const newEggmoves = [...eggmovesIn]
        if (currentIndex === -1) { 
            newEggmoves.push(possibleEggmoves[possibleIndex]) 
        } else {
            newEggmoves.splice(currentIndex, 1)
        }
        setEggmoves(newEggmoves)
    }
    const displayEggmoves = possibleEggmoves.map(move => {
        const moveClass = eggmovesIn.includes(move) ? "eggmove" : "eggmove missing"
        return <span className={ moveClass } key={ move } id={ move } onClick={ toggleEggmove } >{ util.str.title(move) }</span>
    })

    const [ targetIn, setTarget ] = useState(target)
    const toggleTarget = () => {
        const newTarget = targetIn ? false : true
        setTarget(newTarget)
    }

    const natureOptions = (Object.keys(Nature) as Array<keyof typeof Nature>).map((ntr) => {
        return <option value={ Nature[ntr] } key={ntr}>{util.str.title(ntr)}</option>
    })
    const [ natureIn, setNature ] = useState(Nature[nature])
    const natureChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const input = e.target.value
        setNature(Nature[input as keyof typeof Nature])
    }

    const [ fiveIn, setFive ] = useState(fiveiv)
    const toggleFive = () => {
        const newFive = fiveIn ? false : true
        setFive(newFive)
    }

    const [ hiddenIn, setHidden ] = useState(ha)
    const toggleHidden = () => {
        const newHidden = hiddenIn ? false : true
        setHidden(newHidden)
    }

    const finalAdjust = final ? util.date.admin(final) : "yyyy-mm-dd"
    const [ finalIn, setFinal ] = useState(finalAdjust)
    const finalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFinal(e.target.value)
    }

    const [ eggsIn, setEggs ] = useState(eggs)
    const [ eggError, setEggError ] = useState("")
    const eggsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newEggs = parseInt(e.target.value)
        setEggs(newEggs)
        if (isNaN(newEggs) || newEggs < 0) {
            setEggError("Egg count must be a positive number.")
        } else {
            setEggError("")
        }
    }

    const saveEdits = () => {
        if (trainer === trainerViewing) {
            const readjustFinal = finalIn !== "yyyy-mm-dd" && finalIn !== "" ? util.date.short(finalIn) : null
            const patchApri = {
                pokemon,
                ball,
                nature: natureIn,
                eggs: eggsIn,
                onhand: 0,
                final: readjustFinal,
                ha: hiddenIn,
                fiveiv: fiveIn,
                target: targetIn,
                wishlist: false,
                eggmoves: eggmovesIn,
                trainer
            }
            if (apiStatusApri === 'idle' || apiStatusApri === 'success') {
                dispatch(patchAprimon(patchApri))
            }
        }
    }

    const remove = () => {
        dispatch(setOpenWindow(OpenWindow.Remove))
    }
    
    return ( 
        <div id="overlay">
            <div id="zoom" className={ zoomClass }>
                <div className="nav-row zoom-img-row">
                    <div className="aprimon">
                        <img className="big-pkmn" src={ src } alt={ imageAlt } />
                        <img className="ball" src={`./img/icons/${ ball }ball.png`} alt={`${ ballAlt } ball`} />
                    </div>
                </div>
                <h2>{ title }</h2>
                <div className="nav-row">
                    <div className="column">
                        <div className="display-field">
                            <span>Natdex #:</span>
                            <span>{ natdex }</span>
                        </div>
                        <div className="display-field">
                            <span>Types:</span>
                            <span>
                                { types.map(type => {
                                    return <span className={ `type ${ type }` } key={ type }>{ type.toUpperCase() }</span>
                                }) }
                            </span>
                        </div>
                        <div className="display-field">
                            <span>Evolution(s):</span>
                            <span>{ evo.length > 0 ? util.str.title(evo.join(", ")) : "none" }</span>
                        </div>
                        <div className="display-field">
                            <span>Egg cycles:</span>
                            <span>{ cycles }</span>
                        </div>
                    </div>
                    <div id="indv-facts" data-id="moon-zorua-h" className="column">
                        <div className="field">
                            <label htmlFor="eggs">Eggs hatched</label>
                            <input id="eggs" name="eggs" type="number" value={ eggsIn } onChange={ eggsChange } />
                            { eggError !== "" && <FieldError text={ eggError } /> }
                        </div>
                        <div className="check-field field">
                            <label htmlFor="target">Shiny target</label>
                            <div className="checkbox" onClick={ toggleTarget }>
                                { targetIn && <img src="./img/icons/check.png" alt="checkmark" className="small-check" /> }
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="final">Shiny obtained</label>
                            <input id="final" name="final" type="date" value={ finalIn } onChange={ finalChange } />
                        </div>
                        <div className="check-field field">
                            <label htmlFor="five">5+ IVs</label>
                            <div className="checkbox" id="five" onClick={ toggleFive }>
                                { fiveIn && <img src="./img/icons/check.png" alt="checkmark" className="small-check" /> }
                            </div>
                        </div>
                        <div className="field">
                            <label htmlFor="nature">Nature</label>
                            <select id="nature" name="nature" value={ natureIn } onChange={ natureChange }>
                                { natureOptions }
                            </select>
                        </div>
                        <div className="check-field field">
                            <label htmlFor="hidden">Hidden ability<br />({ hidden ? util.str.title(hidden) : "N/A" })</label>
                            <div className="checkbox" onClick={ toggleHidden }>
                                { hiddenIn && <img src="./img/icons/check.png" alt="checkmark" className="small-check" /> }
                            </div>
                        </div>
                    </div>
                </div>
                <div id="eggmoves">
                    <span>Egg moves:</span>
                    <p id="egg-wrapper" className="move-edit">
                        { displayEggmoves }
                    </p>
                </div>
                <div className="nav-row">
                    <button className="small-button remove-button" onClick={ remove }>
                        Remove from Collection
                    </button>
                </div>
                <div id="zoom-controls" className="nav-row">
                    <ConfirmButton confirm={ saveEdits } />
                    <CloseButton />
                </div>
            </div>
        </div>
    )
}

export default DetailsEdit