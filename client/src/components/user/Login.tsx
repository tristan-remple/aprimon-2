// external dependencies
import { useState } from "react"
import { useAppDispatch } from '../../redux/hooks'

// internal dependencies
import { loginTrainer } from '../../redux/slices/trainerSlice'

// components
import CloseButton from "../control/CloseButton"
import ConfirmButton from "../control/ConfirmButton"
import ControlButton from "../control/ControlButton"
import OpenWindow from "../../types/WindowEnum"

export default function Login() {

    const dispatch = useAppDispatch()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        setEmail(input)
    }

    const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        setPassword(input)
    }

    const confirmLogin = () => {
        const loginDetails = {
            email,
            password
        }
        dispatch(loginTrainer(loginDetails))
    }

    return (
        <div id="zoom" className="box">
            <h2>Log in to Aprimon Tracker</h2>
            <div className="field">
                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" value={ email } onChange={ emailChange } />
            </div>
            <div className="field">
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" value={ password } onChange={ passwordChange } />
            </div>
            <div className="nav-row">
                <ControlButton label={ OpenWindow.Register } />
                <ConfirmButton confirm={ confirmLogin } />
                <CloseButton />
            </div>
        </div>        
    )
}