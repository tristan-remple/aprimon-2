import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import CloseButton from "../control/CloseButton"
import WishTile from "./WishTile"
import { selectCollection } from "../../redux/slices/aprimonSlice"
import Aprimon from "../../types/Aprimon"
import { selectUsername } from "../../redux/slices/trainerSlice"

const Wishlist = () => {

    const username = useAppSelector(selectUsername)

    const aprimon: Aprimon[] = useAppSelector(selectCollection)
    const wishlist = aprimon.filter(apri => apri.wishlist)

    const [ showShiny, setShowShiny ] = useState(false)

    const renderedList = wishlist.map(apri => {
        let id = apri.pokemon.natdex.toString()
        if (apri.pokemon.form) { id += apri.pokemon.form }
        return <WishTile apri={ apri } shiny={ showShiny } key={ id } />
    })

    const toggleShiny = () => {
        setShowShiny(showShiny ? false : true)
    }

    const buttons = []

    buttons.push(
        <button className={ `small-button ${ showShiny ? "shiny" : "exclude" }` } title={ `Show ${ showShiny ? "Basic" : "Shiny" } Sprites` } onClick={ toggleShiny } key="shiny" >
            <img className="symbol" src="img/icons/sparkle.png" alt="Shiny icon" />
        </button>
    )

    buttons.push(<CloseButton key="close" />)

    return (
        <div id="browse-display" className="box">
            <h2>{ username }'s Wishlist</h2>
            <div className="nav-row wide-row">
                { buttons }
            </div>
            <div id="browse-row" className="nav-row">
                { renderedList }
            </div>
        </div>
    )
}

export default Wishlist