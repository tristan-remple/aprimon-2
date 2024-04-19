// external dependencies
import { useState } from "react"

// components
import SidebarHeader from "./SidebarHeader"
import ControlButton from "./control/ControlButton"

// types
import OpenWindow from "../types/WindowEnum"

export default function Control() {

    const [ open, setOpen ] = useState(false)
    const header = <SidebarHeader title="Control" open={ open } setOpen={ setOpen } />

    if (open) {
        return (
            <>
                { header }
                <div className="nav-row">
                    <ControlButton label={ OpenWindow.Browse } />
                    <ControlButton label={ OpenWindow.Wishlist } />
                    <ControlButton label={ OpenWindow.AddApri } />
                    <ControlButton label={ OpenWindow.AddEggs } />
                    <ControlButton label={ OpenWindow.HatchEggs } />
                    <ControlButton label={ OpenWindow.HatchShiny } />
                </div>
            </>
        )
    } else {
        return header
    }
}