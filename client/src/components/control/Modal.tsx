import React from "react";
import { useAppSelector } from '../../redux/hooks'
import { selectOpenWindow } from '../../redux/slices/trainerSlice'
import AddEggs from "./AddEggs"
import HatchEggs from "./HatchEggs"

export default function Modal() {

    const openWindow = useAppSelector(selectOpenWindow)

    if (!openWindow) {
        return;
    }

    let display = <></>
    switch (openWindow) {
        case "AddEggs":
            display = <AddEggs />
            break;
        case "HatchEggs":
            display = <HatchEggs />
            break;
    }

    return (
        <div id="overlay">
            { display }
        </div>
    )
}