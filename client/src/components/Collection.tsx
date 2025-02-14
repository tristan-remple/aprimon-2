// external dependencies
import { useEffect, useState } from 'react'
import { useAppSelector } from '../redux/hooks'

// internal dependencies
import { selectCollection } from '../redux/slices/aprimonSlice'
import { selectPrefs, selectSort } from '../redux/slices/trainerSlice'
import Aprimon from '../types/Aprimon'
import Sort from '../types/SortEnum'
import Ball from '../types/BallEnum'

// components
import Card from './Card'

export default function Collection() {

    const collection = useAppSelector(selectCollection)
    const currentSort = useAppSelector(selectSort)
    const currentPrefs = useAppSelector(selectPrefs)
    
    type sortOptions = { [key in Sort]: {
        order: (listApri: Aprimon[]) => Aprimon[]
    }}

    const sorts: sortOptions = {
        alpha: {
            order: (listApri: Aprimon[]) => listApri.sort((a, b) => a.pokemon.name.localeCompare(b.pokemon.name))
        },
        natdex: {
            order: (listApri: Aprimon[]) => listApri.sort((a, b) => a.pokemon.natdex - b.pokemon.natdex)
        },
        count: {
            order: (listApri: Aprimon[]) => listApri.sort((a, b) => b.eggs - a.eggs)
        },
        ball: {
            order: (listApri: Aprimon[]) => listApri.sort((a, b) => a.ball.localeCompare(b.ball))
        },
        target: {
            order: (listApri: Aprimon[]) => listApri.sort((a, b) => (a.target === b.target) ? 0 : a.target ? -1 : 1)
        },
        shiny: {
            order: (listApri: Aprimon[]) => listApri.sort((a, b) => {
                return new Date(b.final || 0).getTime() - new Date(a.final || 0).getTime()
            })
        },
        five: {
            order: (listApri: Aprimon[]) => listApri.sort((a, b) => (a.fiveiv === b.fiveiv) ? 0 : a.fiveiv ? -1 : 1)
        },
        ha: {
            order: (listApri: Aprimon[]) => listApri.sort((a, b) => (a.ha === b.ha) ? 0 : a.ha ? -1 : 1)
        }
    }

    const [ sortedCollection, setSortedCollection ] = useState(collection)

    useEffect(() => {
        let newCollection = [...collection]
        currentSort.forEach(so => {
            newCollection = sorts[so].order(newCollection)
        })
        newCollection = newCollection.filter(apri => {
            if (currentPrefs.filterBall.length > 0) {
                return currentPrefs.filterBall.includes(apri.ball)
            } else {
                return true
            }
        })
        if (currentPrefs.filterSort.includes(Sort.count)) {
            newCollection = newCollection.filter(apri => apri.eggs > 0)
        }
        if (currentPrefs.filterSort.includes(Sort.target)) {
            newCollection = newCollection.filter(apri => apri.target)
        }
        if (currentPrefs.filterSort.includes(Sort.shiny)) {
            newCollection = newCollection.filter(apri => apri.final)
        }
        if (currentPrefs.filterSort.includes(Sort.five)) {
            newCollection = newCollection.filter(apri => apri.fiveiv)
        }
        if (currentPrefs.filterSort.includes(Sort.ha)) {
            newCollection = newCollection.filter(apri => apri.ha)
        }
        if (currentPrefs.keyword && currentPrefs.keyword != "") {
            newCollection = newCollection.filter(apri => {
                let fullTitle = `${ apri.ball } ${ apri.pokemon.form } ${ apri.pokemon.name }`
                return fullTitle.includes(currentPrefs.keyword.toLowerCase())
            })
        }
        setSortedCollection(newCollection)
    }, [ currentSort, collection, currentPrefs ])

    const renderedCollection = sortedCollection.map(apri => {
        const { ball, pokemon } = apri
        const { name, form } = pokemon
        let id = `${ ball }-${ name }`
        if (form) { id += `-${ form }` }
        
        if (!apri.wishlist) {
            return <Card aprimon={ apri } key={ id } />
        }
    })

    return (
        <article id="card-rows">
            { renderedCollection }
        </article>
    )
}