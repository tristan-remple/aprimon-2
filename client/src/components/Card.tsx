import React from "react";
import util from '@aqualunae/util';

import Aprimon from "../types/Aprimon";

export default function Card({ aprimon }: { aprimon: Aprimon }) {

    const { pokemon, ball, fiveiv, ha, final, eggs, target } = aprimon
    const { natdex, form } = pokemon

    const title: string = util.str.title(pokemon.name)
    const cardClass: string = final ? "box card shiny" : "box card"
    let strdex : string = ''
    if (natdex < 10) {
        strdex = `00${natdex}`
    } else if (natdex < 100) {
        strdex = `0${natdex}`
    } else {
        strdex = natdex.toString()
    }
    const src: string = form ? `/img/${strdex}-${form[0]}.png` : `/img/${strdex}.png`
    const fiveBadge: string = fiveiv ? "info" : "info missing"
    const haBadge: string = ha ? "info" : "info missing"
    const sparkleSrc: string = final ? "/img/sparkle-hover.png" : "/img/sparkle-grey.png"
    const eggsBadge: string = target ? "info" : "info missing"

    return (
        <div className={cardClass} id={`${ball}-${pokemon.name}`}>
            <img className="pokemon" src={src} alt={pokemon.name} />
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