import { useEffect, useState } from "react"
import { useAppSelector } from "../redux/hooks"
import { selectPossible } from "../redux/slices/possibleSlice"
import GameFilter from "../types/GameFilter"
import Possible from "../types/Possible"
import CloseButton from "./control/CloseButton"
import BrowseTile from "./BrowseTile"

const Browse = () => {

    const possible = useAppSelector(selectPossible)

    type options = { [key in GameFilter]: {
        filterPos: (listApri: Possible[]) => Possible[],
        filterNeg: (listApri: Possible[]) => Possible[]
    }}

    const filterList: options = {
        all: {
            filterPos: (listApri) => possible,
            filterNeg: (listApri) => listApri
        },
        lowgen: {
            filterPos: (listApri) => listApri.filter(apri => apri.prevgen === true),
            filterNeg: (listApri) => listApri.filter(apri => apri.prevgen === false)
        },
        swsh: {
            filterPos: (listApri) => listApri.filter(apri => apri.swsh === true),
            filterNeg: (listApri) => listApri.filter(apri => apri.swsh === false)
        },
        bdsp: {
            filterPos: (listApri) => listApri.filter(apri => apri.bdsp === true),
            filterNeg: (listApri) => listApri.filter(apri => apri.bdsp === false)
        },
        dlc: {
            filterPos: (listApri) => listApri.filter(apri => !apri.paldex),
            filterNeg: (listApri) => listApri.filter(apri => !apri.bludex && !apri.kitdex)
        }
    }

    type filterState = {
        [key in GameFilter]: boolean | null
    }

    const [ filters, setFilters ] = useState<filterState>({
        all: true,
        lowgen: null,
        swsh: null,
        bdsp: null,
        dlc: null
    })

    const [ filteredPkmn, setFilteredPkmn ] = useState(possible)

    useEffect(() => {
        let newList = [...possible]
        if (filters[GameFilter.all] !== true) {
            for (const prop in filters) {
                const opt = prop as GameFilter
                if (filters[opt]) {
                    newList = filterList[opt].filterPos(newList)
                } else if (filters[opt] === false) {
                    newList = filterList[opt].filterNeg(newList)
                }
            }
        }
        setFilteredPkmn(newList)
    }, [ filters, possible ])

    const [ showShiny, setShowShiny ] = useState(false)

    const renderedList = filteredPkmn.map(pkmn => {
        let id = pkmn.natdex.toString()
        if (pkmn.form) { id += pkmn.form }
        return <BrowseTile pkmn={ pkmn } shiny={ showShiny } key={ id } />
    })

    const handleButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLButtonElement
        const id = target.id as GameFilter
        const newFilters = { ...filters }
        let newState = newFilters[id] ? false : newFilters[id] === false ? null : true
        if (id !== GameFilter.all && newState !== null) {
            newFilters[GameFilter.all] = null
        } else if (id === GameFilter.all && newState === true) {
            for (let prop in newFilters) {
                const fil = prop as GameFilter
                newFilters[fil] = null
            }
        } else if (id === GameFilter.all && newState === false) {
            newState = null
        }
        newFilters[id] = newState
        setFilters(newFilters)
    }

    let buttons = []
    for (const prop in filters) {
        const btnClass = filters[prop as GameFilter] ? "shiny" : filters[prop as GameFilter] === null ? "" : "exclude"
        const label = (prop === "lowgen") ? "7-" : prop.toUpperCase()
        const title = (prop === "lowgen") ? "Gen 7 and Earlier" : prop.toUpperCase()
        buttons.push(
            <button className={ `small-button browse-button ${ btnClass }` } title={ title } id={ prop } onClick={ handleButton } key={ prop } >
                { label }
            </button>
        )
    }

    const toggleShiny = () => {
        setShowShiny(showShiny ? false : true)
    }

    buttons.push(
        <button className={ `small-button ${ showShiny ? "shiny" : "exclude" }` } title={ `Show ${ showShiny ? "Basic" : "Shiny" } Sprites` } onClick={ toggleShiny } key="shiny" >
            <img className="symbol" src="./img/icons/sparkle.png" alt="Shiny icon" />
        </button>
    )

    buttons.push(<CloseButton key="close" />)

    return (
        <div id="browse-display" className="box">
            <h2>Browse Breedable Aprimon by Games Available</h2>
            <div className="nav-row wide-row">
                { buttons }
            </div>
            <div id="browse-row" className="nav-row">
                { renderedList }
            </div>
        </div>
    )
}

export default Browse