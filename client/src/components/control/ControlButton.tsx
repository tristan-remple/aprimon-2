import React, { useState } from "react";
import { useAppDispatch } from '../../redux/hooks'

import { setOpenWindow } from "../../redux/slices/trainerSlice";

export default function ControlButton({ label }: { label: string }) {

    const dispatch = useAppDispatch()

    const openWindow = () => {
        dispatch(setOpenWindow(label))
    }

    type options = { [n: string]: {
        title: string,
        img: string,
        alt: string
    } }

    type ButtonLabel = keyof options
    label as ButtonLabel

    const buttons: options = {
        Browse: {
            title: "Browse possible aprimon",
            img: "browse",
            alt: "eye"
        },
        Wishlist: {
            title: "View wishlist",
            img: "wishlist",
            alt: "heart bookmark"
        },
        AddApri: {
            title: "Add Aprimon",
            img: "addmon",
            alt: "plus sign over pokeball"
        },
        AddEggs: {
            title: "Add eggs to queue",
            img: "addeggs",
            alt: "plus sign over eggs"
        },
        HatchEggs: {
            title: "Confirm queue eggs as hatched",
            img: "check",
            alt: "checkmark"
        },
        HatchShiny: {
            title: "Confirm queue eggs contained a shiny",
            img: "sparkle",
            alt: "sparkle emoji"
        },
        Save: {
            title: "Save your progress",
            img: "save",
            alt: "save floppy icon"
        }
    }

    return (
        <button className="small-button" title={ buttons[label].title } onClick={ openWindow } >
            <img className="symbol" src={`img/${ buttons[label].img }.png`} alt={ buttons[label].alt } />
        </button>
    )
}