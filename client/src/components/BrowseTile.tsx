import Possible from '../types/Possible'
import util from '@aqualunae/util'

const BrowseTile = ({ pkmn, shiny }: { pkmn: Possible, shiny: boolean }) => {
    let strdex : string = pkmn.natdex.toString().padStart(3, "0")
    let suffix = pkmn.form ? "-" + pkmn.form[0] : ""
    return (
        <div id={ `${ pkmn.name }${ pkmn.form && '-' + pkmn.form  }` } className="browse-card">
            <img className="pokemon" src={ `img/${ shiny ? "shiny" : "basic" }/${ strdex }${ suffix }.png` } alt={ util.str.title(pkmn.name) } />
        </div>
    )
}

export default BrowseTile