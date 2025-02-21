// components
import Stats from "./Stats"
import Control from "./Control"
import SortSide from "./Sort"
import FilterSide from "./Filter"
import Profile from "./Profile"
import { useAppSelector } from "../redux/hooks"
import { selectSelf } from "../redux/slices/trainerSlice"

export default function Sidebar() {

    const self = useAppSelector(selectSelf)

    return (
        <nav className="box">
            <Profile />
            <Stats />
            { self && <Control /> }
            <SortSide />
            <FilterSide />
        </nav>
    )
}