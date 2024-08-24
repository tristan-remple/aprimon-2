import { Link } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hooks'
import { clearTrainerName } from '../../redux/slices/trainerSlice'

const NavButton = ({ href, title, label, icon }: { href: string, title: string, label: string, icon: boolean }) => {

    const dispatch = useAppDispatch()

    const clickHandler = () => {
        if (href === "/") {
            dispatch(clearTrainerName())
        }
    }

    const content = icon ? <img className="symbol" src={`img/icons/${ label }.png`} alt={ title } /> : label

    return (
        <Link className="small-button" title={ title } to={ href } onClick={ clickHandler } >
            { content }
        </Link>
    )
}

export default NavButton