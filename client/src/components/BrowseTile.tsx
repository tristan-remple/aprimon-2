import { useDispatch } from 'react-redux'
import Possible from '../types/Possible'
import util from '@aqualunae/util'
import OpenWindow from '../types/WindowEnum'
import { setBrowseTarget, setOpenWindow } from '../redux/slices/trainerSlice'

const BrowseTile = ({ pkmn, shiny }: { pkmn: Possible, shiny: boolean }) => {

    const dispatch = useDispatch()

    const strdex : string = pkmn.natdex.toString().padStart(3, "0")
    const suffix = pkmn.form ? "-" + pkmn.form[0] : ""
    const title = pkmn.form ? util.str.title(`${ pkmn.form } ${ pkmn.name }`) : util.str.title(pkmn.name)

    const addPokemon = () => {
        dispatch(setBrowseTarget(title))
        dispatch(setOpenWindow(OpenWindow.AddApri))
    }

    return (
        <div id={ `${ pkmn.name }${ pkmn.form && '-' + pkmn.form  }` } className="browse-card" onClick={ addPokemon }>
            <img className="pokemon" src={ `./img/${ shiny ? "shiny" : "basic" }/${ strdex }${ suffix }.png` } alt={ util.str.title(pkmn.name) } />
        </div>
    )
}

export default BrowseTile