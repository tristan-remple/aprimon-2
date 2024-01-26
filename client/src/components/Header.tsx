import React from "react";

import { useAppSelector } from '../redux/hooks'
import { selectUsername } from '../redux/slices/trainerSlice';

export default function Header() {

    const username = useAppSelector(selectUsername)

    return (
        <header className="box shiny">
            <img className="decoration" src="/img/sparkle-hover.png" />
            <h1 className="user-display">{username}'s Aprimon Tracker</h1>
            <img className="decoration" src="/img/sparkle-hover.png" />
        </header>
    )
}