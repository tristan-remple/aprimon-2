// external dependencies
import { useState } from "react"
import { useAppDispatch } from '../../redux/hooks'

// internal dependencies
import { registerTrainer, setOpenWindow } from '../../redux/slices/trainerSlice'

// components
import CloseButton from "../control/CloseButton"
import ConfirmButton from "../control/ConfirmButton"
import FieldError from "../control/FieldError"

export default function Register() {

    const dispatch = useAppDispatch()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ username, setUsername ] = useState("")
    const [ emailError, setEmailError ] = useState("")
    const [ passError, setPassError ] = useState("")
    const [ nameError, setNameError ] = useState("")

    const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        setEmail(input)

        if (!input.toLowerCase().match(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            setEmailError("Invalid email address.")
        } else {
            setEmailError("")
        }
    }

    const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        setUsername(input)

        if (input.length > 255) {
            setNameError("Username is too long.")
        } else if (input.length < 3) {
            setNameError("Username is too short.")
        } else {
            setNameError("")
        }
    }

    const passwordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        setPassword(input)
        let newPassError: string[] = []

        if (input.length < 10) {
            newPassError.push("Password is too short.")
        } else if (input.length > 255) {
            newPassError.push("Password is too long.")
        }
        if (!/.*[a-z]+.*/.test(input) || !/.*[A-Z]+.*/.test(input)) {
            newPassError.push("Password must contain both uppercase and lowercase letters.")
        }
        if (!/.*[0-9]+.*/.test(input)) {
            newPassError.push("Password must contain at least one number.")
        }
        if (!/.*[`~!@#$%^&*()_+=-\[\]{}\|;':",\.\/<>?]+.*/.test(input)) {
            newPassError.push("Password must contain at least one symbol.")
        }

        if (newPassError.length > 0) {
            const errorText = newPassError.join("\n")
            setPassError(errorText)
        } else {
            setPassError("")
        }
    }

    const confirmRegister = () => {

        if (emailError !== "" || passError !== "" || nameError !== "") {
            return
        }

        const registerDetails = {
            name: username,
            email,
            password
        }
        dispatch(registerTrainer(registerDetails))
        dispatch(setOpenWindow(""))
    }

    return (
        <div id="zoom" className="box">
            <h2>Register for Aprimon Tracker</h2>
            <div className="field">
                <label htmlFor="name">Username:</label>
                <input id="name" name="name" type="text" value={ username } onChange={ nameChange } />
                { nameError && <FieldError text={ nameError } /> }
            </div>
            <div className="field">
                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" value={ email } onChange={ emailChange } />
                { emailError && <FieldError text={ emailError } /> }
            </div>
            <div className="field">
                <label htmlFor="password">Password:</label>
                <input id="password" name="password" type="password" value={ password } onChange={ passwordChange } />
                { passError && <FieldError text={ passError } /> }
            </div>
            <div className="nav-row">
                <ConfirmButton confirm={ confirmRegister } close={ false } />
                <CloseButton />
            </div>
        </div>        
    )
}