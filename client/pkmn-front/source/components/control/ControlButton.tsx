import React, { useState } from "react";
import { useAppDispatch } from '../../app/hooks'

import { setOpenWindow } from "../../features/trainer/trainerSlice";

export default function ControlButton({ label }) {

    const dispatch = useAppDispatch()

    const openWindow = () => {
        dispatch(setOpenWindow(label))
    }

    const buttons = {
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
        AddPkmn: {
            title: "Add Pokemon",
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
            <img className="symbol" src={`img/${buttons[label].img}.png`} alt={buttons[label].alt} />
        </button>
    )
}