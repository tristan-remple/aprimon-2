// external dependencies
import { useAppDispatch } from '../../redux/hooks'

// internal dependencies
import { setOpenWindow } from '../../redux/slices/trainerSlice'

export default function CloseButton() {

    const dispatch = useAppDispatch()
    const closeWindow = () => {
        dispatch(setOpenWindow(null))
    }

    return (
        <button id="cancel" className="small-button" title="Cancel and close" onClick={ closeWindow }>
            <img className="symbol" src="img/x.png" alt="X to close" />
        </button>
    )
}