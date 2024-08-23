// external dependencies
import { useAppSelector } from '../redux/hooks'

// internal dependencies
import { selectUsername } from '../redux/slices/trainerSlice'
import Error from './Error'

export default function Header() {

    const username = useAppSelector(selectUsername)

    return (
        <header>
            <div className="header box shiny">
                <img className="decoration" src="/img/icons/sparkle-hover.png" />
                <h1 className="user-display">{username}'s Aprimon Tracker</h1>
                <img className="decoration" src="/img/icons/sparkle-hover.png" />
            </div>
            <Error />
        </header>       
    )
}