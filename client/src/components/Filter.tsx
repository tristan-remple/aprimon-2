import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../redux/hooks"

import Ball from "../types/BallEnum"
import GameFilter from "../types/GameFilter"
import Sort from "../types/SortEnum"
import { setKeywordFilter } from "../redux/slices/trainerSlice"

import SidebarHeader from "./SidebarHeader"
import { FilterBallButton, FilterGameButton, FilterSortButton } from "./control/FilterButton"


const FilterSide = () => {

    const dispatch = useAppDispatch()

    const [ open, setOpen ] = useState(false)
    const header = <SidebarHeader title="Filter" open={ open } setOpen={ setOpen } />

    const [ keyword, setKeyword ] = useState("")
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        setKeyword(input)
        dispatch(setKeywordFilter(input))
    }

    if (open) {
        return (
            <>
                { header }
                <div className="nav-row">
                    <input type="text" value={ keyword } placeholder="Search..." onChange={ handleChange } />
                </div>
                <div className="nav-row">
                    <FilterBallButton label={ Ball.beast } />
                    <FilterBallButton label={ Ball.dream } />
                    <FilterBallButton label={ Ball.fast } />
                    <FilterBallButton label={ Ball.friend } />
                    <FilterBallButton label={ Ball.heavy } />
                    <FilterBallButton label={ Ball.level } />
                    <FilterBallButton label={ Ball.love } />
                    <FilterBallButton label={ Ball.lure } />
                    <FilterBallButton label={ Ball.moon } />
                    <FilterBallButton label={ Ball.safari } />
                    <FilterBallButton label={ Ball.sport } />
                </div>
                <div className="nav-row">
                    <FilterSortButton label={ Sort.count } />
                    <FilterSortButton label={ Sort.target } />
                    <FilterSortButton label={ Sort.shiny } />
                    <FilterSortButton label={ Sort.five } />
                    <FilterSortButton label={ Sort.ha } />
                </div>
            </>
        )
    } else {
        return header
    }
}

export default FilterSide