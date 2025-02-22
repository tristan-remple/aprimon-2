// external dependencies
import { useAppDispatch } from '../../redux/hooks'

// internal dependencies
import { setOpenWindow } from '../../redux/slices/trainerSlice'

export default function CloseButton({ focusElement = null }: { focusElement?: string | null }) {

    const dispatch = useAppDispatch()
    const closeWindow = () => {
        dispatch(setOpenWindow(null))
        if (focusElement) {
            document.getElementById(focusElement)?.focus()
        }
    }

    const keyboardHandler = (e: React.KeyboardEvent) => {
        if (e.code == "Enter") {
            closeWindow()
        }
    }

    return (
        <button id="cancel" className="small-button" title="Cancel and close" onClick={ closeWindow } onKeyUpCapture={ keyboardHandler }>
            <img className="symbol" src="img/icons/x.png" alt="X to close" />
        </button>
    )
}