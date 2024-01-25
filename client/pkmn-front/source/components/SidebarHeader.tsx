import React from "react";

export default function SidebarHeader({ title, open, setOpen }) {

    const toggle = () => {
        const newStatus = open ? false : true
        setOpen(newStatus)
    }

    return (
        <button className={`small-button wide-button menu${open && ' shiny'}`} onClick={toggle}>
            {title.toUpperCase()}
        </button>
    )
}