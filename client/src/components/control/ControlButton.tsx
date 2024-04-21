// external dependencies
import { useAppDispatch } from '../../redux/hooks'

// internal dependencies
import { setOpenWindow } from "../../redux/slices/trainerSlice"

// types
import OpenWindow from '../../types/WindowEnum'

export default function ControlButton({ label }: { label: OpenWindow }) {

    const dispatch = useAppDispatch()

    const openWindow = () => {
        dispatch(setOpenWindow(label))
    }

    type options = { [key in OpenWindow]: {
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
        Logout: {
            title: "Log out of Aprimon Tracker",
            img: "exit",
            alt: "exit door"
        },
        Login: {
            title: "Log in to Aprimon Tracker",
            img: "enter",
            alt: "entrance door"
        },
        AllUsers: {
            title: "See all users",
            img: "group",
            alt: "group of people"
        },
        Details: {
            title: "View Aprimon details",
            img: "ball",
            alt: "pokeball"
        }
    }

    return (
        <button className="small-button" title={ buttons[label].title } onClick={ openWindow } >
            <img className="symbol" src={`img/${ buttons[label].img }.png`} alt={ buttons[label].alt } />
        </button>
    )
}