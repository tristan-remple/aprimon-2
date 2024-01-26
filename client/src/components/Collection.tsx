import React from "react";

import { useAppSelector } from '../redux/hooks'
import { selectCollection } from '../redux/slices/trainerSlice';

import Card from './Card'

export default function Collection() {

    const collection = useAppSelector(selectCollection)
    const renderedCollection = collection.map(apri => {
        if (!apri.wishlist) {
            return <Card 
                pokemon={apri.pokemon.name} 
                form={apri.pokemon.form} 
                natdex={apri.pokemon.natdex} 
                ball={apri.ball} 
                fiveiv={apri.fiveiv} 
                ha={apri.ha} 
                final={apri.final} 
                eggs={apri.eggs} 
                target={apri.target}
            />
        }
    })

    return (
        <article id="card-rows">
            {renderedCollection}
        </article>
    )
}