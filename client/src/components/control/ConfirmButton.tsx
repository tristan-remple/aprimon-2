// external dependencies
import { useAppDispatch } from '../../redux/hooks'

// internal dependencies
import { setOpenWindow } from '../../redux/slices/trainerSlice'

export default function ConfirmButton({ confirm, close = true }: { confirm: () => void, close?: boolean }) {

    const dispatch = useAppDispatch()
    const applyConfirm = () => {
        confirm()
        if (close) {
            dispatch(setOpenWindow(""))
        }
    }

    return (
        <button id="confirm" className="small-button" title="Confirm" onClick={ applyConfirm } >
            <img className="symbol" src="./img/icons/check.png" alt="Checkmark" />
        </button>
    )
}