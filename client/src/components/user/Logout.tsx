// external dependencies
import { useEffect } from "react"
import { useAppDispatch } from '../../redux/hooks'

// internal dependencies
import { logoutTrainer } from '../../redux/slices/trainerSlice'

// components
import CloseButton from "../control/CloseButton"

export default function Logout() {

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(logoutTrainer())
    }, [])

    return (
        <div id="zoom" className="box">
            <h2>Logged out of Aprimon Tracker</h2>
            <p>Thanks for visiting!</p>
            <div className="nav-row">
                <CloseButton />
            </div>
        </div>        
    )
}