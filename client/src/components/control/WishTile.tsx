import util from '@aqualunae/util'
import Aprimon from '../../types/Aprimon'
import { useState } from 'react'
import { useAppDispatch } from '../../redux/hooks'
import { patchAprimon, removeAprimon } from '../../redux/slices/aprimonSlice'

const WishTile = ({ apri, shiny }: { apri: Aprimon, shiny: boolean }) => {

    const dispatch = useAppDispatch()

    const [ open, setOpen ] = useState(false)
    const toggle = () => {
        const newOpen = open ? false : true
        setOpen(newOpen)
    }

    const addApri = () => {
        const newApri = {...apri}
        newApri.wishlist = false
        dispatch(patchAprimon(newApri))
    }

    const removeWish = () => {
        dispatch(removeAprimon(apri))
    }

    const buttons = []
    
    buttons.push(
        <button className="small-button" title="Add to Collection" onClick={ addApri } key="add" >
            <img className="symbol" src="img/icons/check.png" alt="checkmark" />
        </button>
    )

    buttons.push(
        <button className="small-button" title="Remove from Wishlist" onClick={ removeWish } key="remove" >
            <img className="symbol" src="img/icons/x.png" alt="X to remove" />
        </button>
    )

    const active = open ? " active" : ""
    let strdex : string = apri.pokemon.natdex.toString().padStart(3, "0")
    let suffix = apri.pokemon.form ? "-" + apri.pokemon.form[0] : ""
    return (
        <div id={ `${ apri.pokemon.name }${ apri.pokemon.form && '-' + apri.pokemon.form }-${ apri.ball }` } className={ `wish-card wishlist${ active }` } onClick={ toggle } >
            <img className="pokemon" src={ `img/${ shiny ? "shiny" : "basic" }/${ strdex }${ suffix }.png` } alt={ util.str.title(apri.pokemon.name) } />
            <img className="ball" src={`/img/icons/${ apri.ball }ball.png`} alt={`${ apri.ball } ball`} />
            { open && <div className="nav-row">{ buttons }</div> }
        </div>
    )
}

export default WishTile