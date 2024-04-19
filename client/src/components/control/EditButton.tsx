// external dependecnies
import { useAppSelector, useAppDispatch } from '../../redux/hooks'

// internal dependencies
import { selectOpenWindow, setOpenWindow } from '../../redux/slices/trainerSlice'

export default function EditButton() {

    const openWindow = useAppSelector(selectOpenWindow)
    const dispatch = useAppDispatch()
    const switchWindow = (window: string) => {
        dispatch(setOpenWindow(window))
    }

    return (
        <button id="edit" className="small-button" title="Edit" onClick={() => switchWindow(`${openWindow}Edit`)} >
            <img className="symbol" src="img/edit.png" alt="Edit pencil" />
        </button>
    )
}