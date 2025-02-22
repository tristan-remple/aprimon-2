// external dependencies
import { useAppDispatch } from '../redux/hooks'
import util from '@aqualunae/util'

// internal dependencies
import { setOpenDetails } from '../redux/slices/trainerSlice'

// types
import Aprimon from "../types/Aprimon"

export default function Card({ aprimon }: { aprimon: Aprimon }) {

    const dispatch = useAppDispatch()

    const { pokemon, ball, fiveiv, ha, final, eggs, target } = aprimon
    const { name, natdex, form } = pokemon

    const title: string = util.str.title(name)
    const cardClass: string = final ? "box card shiny" : "box card"
    let strdex : string = natdex.toString().padStart(3, "0")
    let src: string = form ? `/img/basic/${ strdex }-${ form[0] }.png` : `/img/basic/${ strdex }.png`
    if (final) { src = form ? `/img/shiny/${ strdex }-${ form[0] }.png` : `/img/shiny/${ strdex }.png` }
    const fiveBadge: string = fiveiv ? "info" : "info missing"
    const haBadge: string = ha ? "info" : "info missing"
    const sparkleSrc: string = final ? "/img/icons/sparkle-hover.png" : "/img/icons/sparkle-grey.png"
    const eggsBadge: string = target ? "info" : "info missing"

    let id = `${ ball }-${ name }`
    if (form) {
        id += `-${ form }`
    }

    const openDetails = () => {
        dispatch(setOpenDetails(id))
    }
    
    const handleKeyboard = (e: React.KeyboardEvent) => {
        if (e.code == "Enter") {
            openDetails()
        }
    }

    return (
        <div className={ cardClass } id={ id } onClick={ openDetails } tabIndex={ 0 } onKeyDownCapture={ handleKeyboard } >
            <div className="aprimon">
                <img className="pokemon" src={ src } alt={ name } />
                <img className="ball" src={`/img/icons/${ ball }ball.png`} alt={`${ ball } ball`} />
            </div>
            <h3>{title}</h3>
            <div className="small-row">
                <p className={ fiveBadge } title="5+ IVs">5+</p>
                <p className={ haBadge } title="hidden ability">HA</p>
                <p className="info missing">
                    <img className="icon" src={ sparkleSrc } />
                </p>
                <p className={ eggsBadge } title="eggs hatched">{ eggs }</p>
            </div>
        </div>
    )
}