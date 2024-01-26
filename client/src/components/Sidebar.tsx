import React from "react";
import Stats from "./Stats";
import Control from "./Control";

export default function Header() {

    return (
        <nav className="box">
            <Stats />
            <Control />
        </nav>
    )
}