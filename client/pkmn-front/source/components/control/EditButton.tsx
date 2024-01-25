import React from "react";
import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { selectOpenWindow, setOpenWindow } from '../../features/trainer/trainerSlice';

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