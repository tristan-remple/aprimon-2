import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hooks'
import { clearTrainerError, clearTrainerName } from '../../redux/slices/trainerSlice'
import { clearApriError } from '../../redux/slices/aprimonSlice'
import { clearPossibleError } from '../../redux/slices/possibleSlice'

const NavButton = ({ href, title, label, icon }: { href: string, title: string, label: string, icon: boolean }) => {

    const dispatch = useAppDispatch()

    const clickHandler = () => {
        if (href === "/") {
            dispatch(clearTrainerName())
        }
        dispatch(clearApriError())
        dispatch(clearPossibleError())
        dispatch(clearTrainerError())
    }

    const content = icon ? <img className="symbol" src={`./img/icons/${ label }.png`} alt={ title } /> : label

    return (
        <Link className="small-button" title={ title } to={ href } onClick={ clickHandler } >
            { content }
        </Link>
    )
}

export default NavButton