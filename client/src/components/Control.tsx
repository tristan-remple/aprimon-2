// external dependencies
import { useState } from "react"

// components
import SidebarHeader from "./SidebarHeader"
import ControlButton from "./control/ControlButton"

// types
import OpenWindow from "../types/WindowEnum"
import { useAppSelector } from "../redux/hooks"
import { selectLoggedTrainer, selectSelf } from "../redux/slices/trainerSlice"
import NavButton from "./control/NavButton"

export default function Control() {

    const [ open, setOpen ] = useState(false)

    return (
        <>
            <SidebarHeader title="Control" open={ open } setOpen={ setOpen } />
            { open && 
                <div className="nav-row">
                    <ControlButton label={ OpenWindow.Browse } />
                    { self && <>
                        <ControlButton label={ OpenWindow.Wishlist } />
                        <ControlButton label={ OpenWindow.AddApri } />
                        <ControlButton label={ OpenWindow.AddEggs } />
                        <ControlButton label={ OpenWindow.HatchEggs } />
                        <ControlButton label={ OpenWindow.HatchShiny } />
                    </> }
                </div> 
            }
        </>
    )
}