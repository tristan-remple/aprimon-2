// external dependencies
import { useAppSelector } from "../redux/hooks"
import util from '@aqualunae/util'

// internal dependencies
import { selectOpenWindow } from "../redux/slices/trainerSlice"
import { selectApriDetails } from "../redux/slices/aprimonSlice"
import { selectPokeDetails } from "../redux/slices/possibleSlice"

// types
import OpenWindow from "../types/WindowEnum"
import CloseButton from "./control/CloseButton"
import EditButton from "./control/EditButton"

const Details = () => {

    const openWindow = useAppSelector(selectOpenWindow)
    const aprimon = useAppSelector(selectApriDetails)
    const pkmn = useAppSelector(selectPokeDetails)
    if (openWindow !== OpenWindow.Details || !aprimon || !pkmn) { return }

    const { pokemon, ball, nature, eggs, onhand, final, ha, fiveiv, target, wishlist, eggmoves } = aprimon
    const { name, natdex, form } = pokemon
    const { evo, cycles, types, hidden, eggmoves: possibleEggmoves } = pkmn

    const zoomClass = final ? "shiny box" : "box"
    let strdex : string = natdex.toString().padStart(3, "0")
    let src: string = form ? `/img/basic/${ strdex }-${ form[0] }.png` : `/img/basic/${ strdex }.png`
    if (final) { src = form ? `/img/shiny/${ strdex }-${ form[0] }.png` : `/img/shiny/${ strdex }.png` }
    const imageAlt = form ? util.str.title(`${ form } ${ name }`) : util.str.title(name)
    const ballAlt = `${ ball } ball`
    const title = form ? util.str.title(`${ ball } ${ form } ${ name }`) : util.str.title(`${ ball } ${ name }`)

    const displayEggmoves = possibleEggmoves.map(move => {
        const moveClass = eggmoves.includes(move) ? "eggmove" : "eggmove missing"
        return <span className={ moveClass } key={ move }>{ util.str.title(move) }</span>
    })
    
    return ( 
        <div id="overlay">
            <div id="zoom" className={ zoomClass }>
                <div className="nav-row zoom-img-row">
                    <div className="aprimon">
                        <img className="big-pkmn" src={ src } alt={ imageAlt } />
                        <img className="ball" src={`/img/icons/${ ball }ball.png`} alt={`${ ballAlt } ball`} />
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
                            <div className="display-field">
                                <span>Eggs hatched:</span>
                                <span>{ eggs }</span>
                            </div>
                            <div className="display-field">
                                <span>Shiny target:</span>
                                <span>{ target ? "yes" : "no" }</span>
                            </div>
                            <div className="display-field">
                                <span>Shiny obtained:</span>
                                <span>{ final ? final : "no" }</span>
                            </div>
                            <div className="display-field">
                                <span>5+ IVs</span>
                                <span>{ fiveiv ? "yes" : "no" }</span>
                            </div>
                            <div className="display-field">
                                <span>Nature:</span>
                                <span>{ util.str.title(nature) }</span>
                            </div>
                            <div className="display-field">
                                <span>Hidden ability:<br />({ hidden ? util.str.title(hidden) : "N/A" })</span>
                                <span>{ ha ? "yes" : "no" }</span>
                            </div>
                        </div>
                    </div>
                <div id="eggmoves">
                    <span>Egg moves:</span>
                    <p id="egg-wrapper" className="move-edit">
                        { displayEggmoves }
                    </p>
                </div>
                <div id="zoom-controls" className="nav-row">
                    <EditButton />
                    <CloseButton />
                </div>
            </div>
        </div>
    )
}

export default Details