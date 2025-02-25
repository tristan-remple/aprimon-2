// external dependencies
import { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

// internal dependencies
import { selectPrefs, setBallFilter, setGameFilter, setSortFilter } from '../../redux/slices/trainerSlice'

// types
import Sort from '../../types/SortEnum'
import GameFilter from '../../types/GameFilter'
import Ball from '../../types/BallEnum'

export function FilterBallButton({ label }: { label: Ball }) {

    const dispatch = useAppDispatch()
    const currentPrefs = useAppSelector(selectPrefs)

    const changeBallFilter = () => {
        const sortIndex = currentPrefs.filterBall.findIndex(order => order === label)
        const newFilter = [...currentPrefs.filterBall]
        if (sortIndex === -1) {
            newFilter.push(label)
        } else {
            newFilter.splice(sortIndex, 1)
        }
        dispatch(setBallFilter(newFilter))
    }

    type options = { [key in Ball]: {
        title: string,
        img: string
    }}

    type ButtonLabel = keyof options
    label as ButtonLabel

    const buttons: options = {
        select: {
            title: "Clear Filter",
            img: "x"
        },
        beast: {
            title: "Beast Ball",
            img: "beastball"
        },
        dream: {
            title: "Dream Ball",
            img: "dreamball"
        },
        fast: {
            title: "Fast Ball",
            img: "fastball",
        },
        friend: {
            title: "Friend Ball",
            img: "friendball"
        },
        heavy: {
            title: "Heavy Ball",
            img: "heavyball"
        },
        level: {
            title: "Level Ball",
            img: "levelball"
        },
        love: {
            title: "Love Ball",
            img: "loveball"
        },
        lure: {
            title: "Lure Ball",
            img: "lureball"
        },
        moon: {
            title: "Moon Ball",
            img: "moonball"
        },
        safari: {
            title: "Safari Ball",
            img: "safariball"
        },
        sport: {
            title: "Sport Ball",
            img: "sportball"
        }
    }

    return (
        <button className={ `small-button${ currentPrefs.filterBall.includes(label) ? ' shiny' : '' }` } title={ buttons[label].title } onClick={ changeBallFilter } >
            <img className="symbol" src={`./img/icons/${ buttons[label].img }.png`} alt={ buttons[label].title } />
        </button>
    )
}

export function FilterGameButton({ label }: { label: GameFilter }) {

    const dispatch = useAppDispatch()
    const currentPrefs = useAppSelector(selectPrefs)

    const changeGameFilter = () => {
        const sortIndex = currentPrefs.filterGame.findIndex(order => order === label)
        const newFilter = [...currentPrefs.filterGame]
        if (sortIndex === -1) {
            newFilter.push(label)
        } else {
            newFilter.splice(sortIndex, 1)
        }
        dispatch(setGameFilter(newFilter))
    }

    type options = { [key in GameFilter]: {
        title: string,
        text: string
    }}

    type ButtonLabel = keyof options
    label as ButtonLabel

    const buttons: options = {
        all: {
            title: "Clear Filter",
            text: "all"
        },
        lowgen: {
            title: "Gen 7 and Earlier",
            text: "7-"
        },
        swsh: {
            title: "Sword and Shield",
            text: "SWSH"
        },
        bdsp: {
            title: "Brilliant Diamond and Shining Pearl",
            text: "BDSP",
        },
        dlc: {
            title: "Teal Mask and Indigo Disk",
            text: "DLC"
        }
    }

    return (
        <button className={ `small-button${ currentPrefs.filterGame.includes(label) ? ' shiny' : '' }` } title={ buttons[label].title } onClick={ changeGameFilter } >
            { buttons[label].text }
        </button>
    )
}

export function FilterSortButton({ label }: { label: Sort }) {

    const dispatch = useAppDispatch()
    const currentPrefs = useAppSelector(selectPrefs)

    const changeSortFilter = () => {
        const sortIndex = currentPrefs.filterSort.findIndex(order => order === label)
        const newFilter = [...currentPrefs.filterSort]
        if (sortIndex === -1) {
            newFilter.push(label)
        } else {
            newFilter.splice(sortIndex, 1)
        }
        dispatch(setSortFilter(newFilter))
    }

    type options = { [key in Sort]: {
        title: string,
        img: string | null,
        text: string
    }}

    type ButtonLabel = keyof options
    label as ButtonLabel

    const buttons: options = {
        alpha: {
            title: "",
            img: null,
            text: ""
        },
        natdex: {
            title: "",
            img: null,
            text: ""
        },
        count: {
            title: "Toggle Hatched",
            img: null,
            text: "EGG"
        },
        ball: {
            title: "",
            img: null,
            text: "",
        },
        target: {
            title: "Toggle Targets",
            img: "target",
            text: "target crosshair"
        },
        shiny: {
            title: "Toggle Shinies",
            img: "sparkle",
            text: "sparkle emoji"
        },
        five: {
            title: "Toggle 5+ IVs",
            img: null,
            text: "5+"
        },
        ha: {
            title: "Toggle Hidden Abilities",
            img: null,
            text: "HA"
        }
    }

    return (
        <button className={ `small-button${ currentPrefs.filterSort.includes(label) ? ' shiny' : '' }` } title={ buttons[label].title } onClick={ changeSortFilter } >
            { buttons[label].img ? <img className="symbol" src={`./img/icons/${ buttons[label].img }.png`} alt={ buttons[label].text } /> : buttons[label].text }
        </button>
    )
}