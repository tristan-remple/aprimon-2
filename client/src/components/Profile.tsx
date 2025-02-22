// external dependencies
import { useState } from "react"
import { useAppSelector } from '../redux/hooks'
import util from '@aqualunae/util'

// internal dependencies
import { selectLoggedTrainer, selectProfile, selectStats } from '../redux/slices/trainerSlice'
import { selectMetadata } from "../redux/slices/aprimonSlice"

// components
import SidebarHeader from "./SidebarHeader"
import ControlButton from "./control/ControlButton"
import OpenWindow from "../types/WindowEnum"
import HiddenDetail from "./user/HiddenDetail"
import NavButton from "./control/NavButton"
import { shallowEqual } from "react-redux"

export default function Profile() {

    const stats = useAppSelector(selectProfile, shallowEqual)
    const self = useAppSelector(selectLoggedTrainer)
    const { name, ign, bio, switchCode, discord, trades } = stats
    const [ open, setOpen ] = useState(true)
    const header = <SidebarHeader title="Profile" open={ open } setOpen={ setOpen } />

    const userButton = self ? <ControlButton label={ OpenWindow.Logout } /> : <ControlButton label={ OpenWindow.Login } />

    if (open) {
        return (
            <>
                { header }
                <p>
                    { self === name && <>(This is your profile.)<br /></> }
                    { bio }
                </p>
                { trades ? <p>Trades are open!</p> : <p>Not open to trading at this time.</p> }
                { ign && ign !== "" && <HiddenDetail label="IGN" info={ ign } /> }
                { switchCode && switchCode !== "" && <HiddenDetail label="Switch Code" info={ switchCode } /> }
                { discord && discord !== "" && <HiddenDetail label="Discord Handle" info={ discord } /> }
                <div className="nav-row">
                    <NavButton href="/" title="See All Trainers" label="group" icon={ true } />
                    { self === name && <ControlButton label={ OpenWindow.ProfileEdit } /> }
                    { userButton }
                </div>
            </>
        )
    } else {
        return header
    }
}