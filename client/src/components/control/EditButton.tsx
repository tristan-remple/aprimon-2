// external dependecnies
import { MutableRefObject, Ref } from 'react'
import { useAppSelector, useAppDispatch } from '../../redux/hooks'

// internal dependencies
import { selectOpenWindow, setOpenWindow } from '../../redux/slices/trainerSlice'

export default function EditButton({ innerRef }: { innerRef: MutableRefObject<HTMLButtonElement | null> }) {

    const openWindow = useAppSelector(selectOpenWindow)
    const dispatch = useAppDispatch()
    const switchWindow = (window: string) => {
        dispatch(setOpenWindow(window))
    }

    return (
        <button id="edit" className="small-button" title="Edit" onClick={() => switchWindow(`${openWindow}Edit`)} ref={ innerRef } >
            <img className="symbol" src="./img/icons/edit.png" alt="Edit pencil" />
        </button>
    )
}