import React from "react";
import ucfirst from '../helpers/ucfirst';

export default function Card({ pokemon, form, natdex, ball, fiveiv, ha, final, eggs, target }) {

    const title = ucfirst(pokemon)
    const cardClass = final ? "box card shiny" : "box card"
    let strdex : string = ''
    if (natdex < 10) {
        strdex = `00${natdex}`
    } else if (natdex < 100) {
        strdex = `0${natdex}`
    } else {
        strdex = natdex
    }
    const src = form ? `/img/${strdex}-${form[0]}.png` : `/img/${strdex}.png`
    const fiveBadge = fiveiv ? "info" : "info missing"
    const haBadge = ha ? "info" : "info missing"
    const sparkleSrc = final ? "/img/sparkle-hover.png" : "/img/sparkle-grey.png"
    const eggsBadge = target ? "info" : "info missing"

    return (
        <div className={cardClass} id={`${ball}-${pokemon}`}>
            <img className="pokemon" src={src} alt={pokemon} />
            <img className="ball" src={`/img/${ball}ball.png`} alt={`${ball} ball`} />
            <h3>{title}</h3>
            <div className="small-row">
                <p className={fiveBadge} title="5+ IVs">5+</p>
                <p className={haBadge} title="hidden ability">HA</p>
                <p className="info missing">
                    <img className="icon" src={sparkleSrc} />
                </p>
                <p className={eggsBadge} title="eggs hatched">{eggs}</p>
            </div>
        </div>
    )
}