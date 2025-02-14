// components
import Stats from "./Stats"
import Control from "./Control"
import SortSide from "./Sort"
import FilterSide from "./Filter"

export default function Sidebar() {

    return (
        <nav className="box">
            <Stats />
            <Control />
            <SortSide />
            <FilterSide />
        </nav>
    )
}