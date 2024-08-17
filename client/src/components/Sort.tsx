import { useState } from "react"
import SidebarHeader from "./SidebarHeader"
import { useAppSelector } from "../redux/hooks"
import SortButton from "./control/SortButton"
import Sort from "../types/SortEnum"

const SortSide = () => {

    const [ open, setOpen ] = useState(false)
    const header = <SidebarHeader title="Sort" open={ open } setOpen={ setOpen } />

    if (open) {
        return (
            <>
                { header }
                <div className="nav-row">
                    <SortButton label={ Sort.alpha } />
                    <SortButton label={ Sort.natdex } />
                    <SortButton label={ Sort.count } />
                    <SortButton label={ Sort.ball } />
                    <SortButton label={ Sort.target } />
                    <SortButton label={ Sort.shiny } />
                    <SortButton label={ Sort.five } />
                    <SortButton label={ Sort.ha } />
                </div>
            </>
        )
    } else {
        return header
    }
}

export default SortSide