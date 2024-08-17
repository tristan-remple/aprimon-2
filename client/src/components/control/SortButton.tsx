// external dependencies
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

// internal dependencies
import Sort from '../../types/SortEnum'
import { selectSort, setSortOrder } from '../../redux/slices/trainerSlice'

// types

export default function SortButton({ label }: { label: Sort }) {

    const dispatch = useAppDispatch()
    const currentSort = useAppSelector(selectSort)

    const changeSort = () => {
        const sortIndex = currentSort.findIndex(order => order === label)
        const newSort = [...currentSort]
        if (sortIndex === -1) {
            newSort.push(label)
        } else {
            newSort.splice(sortIndex, 1)
        }
        dispatch(setSortOrder(newSort))
    }

    type options = { [key in Sort]: {
        title: string,
        img: string | null,
        alt: string
    }}

    type ButtonLabel = keyof options
    label as ButtonLabel

    const buttons: options = {
        alpha: {
            title: "Alphabetical",
            img: null,
            alt: "A-Z"
        },
        natdex: {
            title: "By Natdex Number",
            img: null,
            alt: "#"
        },
        count: {
            title: "By Eggs Hatched",
            img: null,
            alt: "EGG"
        },
        ball: {
            title: "Group Balls",
            img: "ball",
            alt: "generic pokeball icon"
        },
        target: {
            title: "Targets First",
            img: "target",
            alt: "target crosshairs"
        },
        shiny: {
            title: "Shinies First",
            img: "sparkle",
            alt: "sparkle emoji"
        },
        five: {
            title: "High IVs First",
            img: null,
            alt: "5+"
        },
        ha: {
            title: "Hidden Abilities First",
            img: null,
            alt: "HA"
        }
    }

    return (
        <button className={ `small-button${ currentSort.includes(label) ? ' shiny' : '' }` } title={ buttons[label].title } onClick={ changeSort } >
            { buttons[label].img ? <img className="symbol" src={`img/icons/${ buttons[label].img }.png`} alt={ buttons[label].alt } /> : buttons[label].alt }
        </button>
    )
}