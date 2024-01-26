import React, { useState } from "react";
import SidebarHeader from "./SidebarHeader";
import ControlButton from "./control/ControlButton";


export default function Control() {

    const [ open, setOpen ] = useState(false)
    const header = <SidebarHeader title="Control" open={open} setOpen={setOpen} />

    if (open) {
        return (
            <>
                { header }
                <div className="nav-row">
                    <ControlButton label="Browse" />
                    <ControlButton label="Wishlist" />
                    <ControlButton label="AddPkmn" />
                    <ControlButton label="AddEggs" />
                    <ControlButton label="HatchEggs" />
                    <ControlButton label="HatchShiny" />
                    <ControlButton label="Save" />
                </div>
            </>
        )
    } else {
        return header
    }
}