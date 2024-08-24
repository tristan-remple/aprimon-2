// components
import Stats from "./Stats"
import Control from "./Control"
import SortSide from "./Sort"

export default function Sidebar() {

    return (
        <nav className="box">
            <Stats />
            <Control />
            <SortSide />
        </nav>
    )
}