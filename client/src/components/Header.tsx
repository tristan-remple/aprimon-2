// external dependencies
import { useAppSelector } from '../redux/hooks'

// internal dependencies
import { selectUsername } from '../redux/slices/trainerSlice'
import Error from './Error'

export default function Header() {

    const username = useAppSelector(selectUsername)
    const title = username !== "" ? `${username}'s Aprimon Tracker` : "Aprimon Tracker Directory"

    return (
        <header>
            <div className="header box shiny">
                <img className="decoration" src="/img/icons/sparkle-hover.png" />
                <h1 className="user-display">{ title }</h1>
                <img className="decoration" src="/img/icons/sparkle-hover.png" />
            </div>
            <Error />
        </header>       
    )
}