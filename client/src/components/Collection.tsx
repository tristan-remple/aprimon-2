// external dependencies
import { useAppSelector } from '../redux/hooks'

// internal dependencies
import { selectCollection } from '../redux/slices/aprimonSlice'

// components
import Card from './Card'

export default function Collection() {

    const collection = useAppSelector(selectCollection)
    const renderedCollection = collection.map(apri => {
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