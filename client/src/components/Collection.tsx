// external dependencies
import { useAppSelector } from '../redux/hooks'

// internal dependencies
import { selectCollection } from '../redux/slices/aprimonSlice'
import { selectSort } from '../redux/slices/trainerSlice'
import Aprimon from '../types/Aprimon'
import Sort from '../types/SortEnum'

// components
import Card from './Card'

export default function Collection() {

    const collection = useAppSelector(selectCollection)
    const currentSort = useAppSelector(selectSort)
    
    type options = { [key in Sort]: {
        order: (listApri: Aprimon[]) => Aprimon[]
    }}

    const sortOptions: options = {
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
            order: (listApri: Aprimon[]) => listApri.sort((a, b) => (a.target === b.target) ? 0 : a ? -1 : 1)
        },
        shiny: {
            order: (listApri: Aprimon[]) => listApri.sort((a, b) => {
                return new Date(b.final || 0).getTime() - new Date(a.final || 0).getTime()
            })
        },
        five: {
            order: (listApri: Aprimon[]) => listApri.sort((a, b) => (a.fiveiv === b.fiveiv) ? 0 : a ? -1 : 1)
        },
        ha: {
            order: (listApri: Aprimon[]) => listApri.sort((a, b) => (a.ha === b.ha) ? 0 : a ? -1 : 1)
        }
    }

    let newCollection = [...collection]
    currentSort.forEach(so => {
        console.log(so)
        newCollection = sortOptions[so].order(newCollection)
    })

    const renderedCollection = newCollection.map(apri => {
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
            {renderedCollection}
        </article>
    )
}