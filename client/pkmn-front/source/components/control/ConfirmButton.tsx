import React from "react";
import { useAppDispatch } from '../../app/hooks'
import { setOpenWindow } from '../../features/trainer/trainerSlice';

export default function ConfirmButton({ confirm }) {

    const dispatch = useAppDispatch()
    const applyConfirm = () => {
        confirm()
        dispatch(setOpenWindow(""))
    }

    return (
        <button id="confirm" className="small-button" title="Confirm" onClick={applyConfirm} >
            <img className="symbol" src="img/check.png" alt="Checkmark" />
        </button>
    )
}