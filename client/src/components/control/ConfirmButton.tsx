// external dependencies
import { useAppDispatch } from '../../redux/hooks'

// internal dependencies
import { setOpenWindow } from '../../redux/slices/trainerSlice'

export default function ConfirmButton({ confirm }: {confirm: () => void}) {

    const dispatch = useAppDispatch()
    const applyConfirm = () => {
        confirm()
        dispatch(setOpenWindow(""))
    }

    return (
        <button id="confirm" className="small-button" title="Confirm" onClick={ applyConfirm } >
            <img className="symbol" src="img/check.png" alt="Checkmark" />
        </button>
    )
}