// external dependencies
import { useAppSelector } from '../redux/hooks'

// internal dependencies
import { selectError, selectUsername } from '../redux/slices/trainerSlice'

export default function Header() {

    const username = useAppSelector(selectUsername)
    const error = useAppSelector(selectError)

    return (
        <header>
            <div className="header box shiny">
                <img className="decoration" src="/img/icons/sparkle-hover.png" />
                <h1 className="user-display">{username}'s Aprimon Tracker</h1>
                <img className="decoration" src="/img/icons/sparkle-hover.png" />
            </div>
            { error && (
                <div className="box error">
                    <p>{ error }</p>
                </div>
            )}
        </header>       
    )
}