import React from "react";

import { useAppSelector } from '../redux/hooks'
import { selectCollection } from '../redux/slices/aprimonSlice';

import Card from './Card'

export default function Collection() {

    const collection = useAppSelector(selectCollection)
    const renderedCollection = collection.map(apri => {
        if (!apri.wishlist) {
            return <Card aprimon={ apri } />
        }
    })

    return (
        <article id="card-rows">
            {renderedCollection}
        </article>
    )
}