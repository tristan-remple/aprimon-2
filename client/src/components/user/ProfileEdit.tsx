import { useState } from "react"
import Trainer from "../../types/Trainer"
import Ball from "../../types/BallEnum"
import FieldError from "../control/FieldError"
import ConfirmButton from "../control/ConfirmButton"
import CloseButton from "../control/CloseButton"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { patchTrainer, selectProfile, selectTrainer } from "../../redux/slices/trainerSlice"

type ProfileDetails = {
    name: string,
    bio: string,
    ign: string,
    switchCode: string,
    discord: string,
    trades: boolean,
    email: string
}


const ProfileEdit = () => {

    const stats = useAppSelector(selectProfile)
    const { name, email, ign, switchCode, discord, bio, trades } = stats

    const [ profileInfo, setProfileInfo ] = useState<ProfileDetails>({
        name,
        bio,
        ign: ign ? ign : "",
        switchCode: switchCode ? switchCode : "",
        discord: discord ? discord : "",
        trades: trades ? trades : false,
        email: email ? email : ""
    })

    const [ profileErrors, setProfileErrors ] = useState<ProfileDetails>({
        name: "",
        bio: "",
        ign: "",
        switchCode: "",
        discord: "",
        trades: false,
        email: ""
    })

    const nameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        const updatedProfile = { ...profileInfo }
        updatedProfile.name = input
        setProfileInfo(updatedProfile)
        if (input.match(/^[a-zA-Z0-9_.]{2,32}$/)) {
            const updatedErrors = { ...profileErrors }
            updatedErrors.name = ""
            setProfileErrors(updatedErrors)
        } else {
            const updatedErrors = { ...profileErrors }
            updatedErrors.name = "This is not a valid username. Usernames may contain alphanumeric characters, underscores, and periods. Usernames must be between 2 and 32 characters."
            setProfileErrors(updatedErrors)
        }
    }

    const emailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        const updatedProfile = { ...profileInfo }
        updatedProfile.email = input
        setProfileInfo(updatedProfile)
        if (input.toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {
            const updatedErrors = { ...profileErrors }
            updatedErrors.email = ""
            setProfileErrors(updatedErrors)
        } else {
            const updatedErrors = { ...profileErrors }
            updatedErrors.email = "This is not a valid email address."
            setProfileErrors(updatedErrors)
        }
    }

    const bioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.target.value
        const updatedProfile = { ...profileInfo }
        updatedProfile.bio = input
        setProfileInfo(updatedProfile)
        if (input.length > 1000) {
            const updatedErrors = { ...profileErrors }
            updatedErrors.bio = ""
            setProfileErrors(updatedErrors)
        } else {
            const updatedErrors = { ...profileErrors }
            updatedErrors.bio = "Your bio may not exceed 1000 characters."
            setProfileErrors(updatedErrors)
        }
    }

    const ignChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        const updatedProfile = { ...profileInfo }
        updatedProfile.ign = input
        setProfileInfo(updatedProfile)
        if (input.length <= 12) {
            const updatedErrors = { ...profileErrors }
            updatedErrors.ign = ""
            setProfileErrors(updatedErrors)
        } else {
            const updatedErrors = { ...profileErrors }
            updatedErrors.ign = "This is not a valid Pokemon Scarlet & Violet trainer name."
            setProfileErrors(updatedErrors)
        }
    }

    const switchCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        const updatedProfile = { ...profileInfo }
        updatedProfile.switchCode = input
        setProfileInfo(updatedProfile)
        if (input.match(/^SW-[0-9]{4}-[0-9]{4}-[0-9]{4}$/)) {
            const updatedErrors = { ...profileErrors }
            updatedErrors.switchCode = ""
            setProfileErrors(updatedErrors)
        } else {
            const updatedErrors = { ...profileErrors }
            updatedErrors.switchCode = "This is not a valid switch friend code."
            setProfileErrors(updatedErrors)
        }
    }

    const discordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value
        const updatedProfile = { ...profileInfo }
        updatedProfile.discord = input
        setProfileInfo(updatedProfile)
        if (input.match(/^[a-z0-9_.]{2,32}$/)) {
            const updatedErrors = { ...profileErrors }
            updatedErrors.discord = ""
            setProfileErrors(updatedErrors)
        } else {
            const updatedErrors = { ...profileErrors }
            updatedErrors.discord = "This is not a valid discord handle."
            setProfileErrors(updatedErrors)
        }
    }

    const changeTrades = () => {
        const updatedTrades = profileInfo.trades ? false : true
        const updatedProfile = { ...profileInfo }
        updatedProfile.trades = updatedTrades
        setProfileInfo(updatedProfile)
    }

    const dispatch = useAppDispatch()
    const trainer = useAppSelector(selectTrainer)
    const saveProfile = () => {
        if (profileErrors.name == "" && profileErrors.email == "" && profileErrors.bio == "" &&
            profileErrors.ign == "" && profileErrors.switchCode == "" && profileErrors.discord == "") {
            const newTrainer = { ...trainer }
            newTrainer.name = profileInfo.name
            newTrainer.email = profileInfo.email
            newTrainer.bio = profileInfo.bio
            newTrainer.ign = profileInfo.ign
            newTrainer.switchCode = profileInfo.switchCode
            newTrainer.discord = profileInfo.discord
            newTrainer.trades = profileInfo.trades
            dispatch(patchTrainer(newTrainer))
        }
    }

    return (
        <div id="zoom" className="box">
            <h2>Update Your Profile</h2>
            <p>
                All information on your profile except your email is visible to everyone. Please only include contact info if you're certain you want it to be public. Including more contact info will allow others to reach you for trading purposes, but may also expose you to unwanted attention.
            </p>
            <div className="column">
                <div className="field">
                    <label htmlFor="name">Username:</label>
                    <input id="name" name="name" type="text" className="wide-field" value={ profileInfo.name } onChange={ nameChange } />
                    { profileErrors.name !== "" && <FieldError text={ profileErrors.name } /> }
                </div>
                <div className="field">
                    <label htmlFor="email">Email:</label>
                    <input id="email" name="email" type="email" className="wide-field" value={ profileInfo.email } onChange={ emailChange } />
                    { profileErrors.email !== "" && <FieldError text={ profileErrors.email } /> }
                </div>
                <div className="field">
                    <label htmlFor="bio">Bio:</label>
                    <textarea id="bio" name="bio" className="wide-field" value={ profileInfo.bio } onChange={ bioChange } />
                    { profileErrors.bio !== "" && <FieldError text={ profileErrors.bio } /> }
                </div>
                <div className="field">
                    <label htmlFor="ign">IGN:</label>
                    <input id="ign" name="ign" type="text" className="wide-field" value={ profileInfo.ign } onChange={ ignChange } />
                    { profileErrors.ign !== "" && <FieldError text={ profileErrors.ign } /> }
                </div>
                <div className="field">
                    <label htmlFor="switchCode">Switch Code:</label>
                    <input id="switchCode" name="switchCode" className="wide-field" type="text" value={ profileInfo.switchCode } onChange={ switchCodeChange } />
                    { profileErrors.switchCode !== "" && <FieldError text={ profileErrors.switchCode } /> }
                </div>
                <div className="field">
                    <label htmlFor="discord">Discord Handle:</label>
                    <input id="discord" name="discord" type="text" className="wide-field" value={ profileInfo.discord } onChange={ discordChange } />
                    { profileErrors.discord !== "" && <FieldError text={ profileErrors.discord } /> }
                </div>
                <div className="check-field field">
                    <label htmlFor="trades">Trades Open:</label>
                    <div className="checkbox" onClick={ changeTrades }>
                        { profileInfo.trades && <img src="./img/icons/check.png" alt="checkmark" className="small-check" /> }
                    </div>
                </div>
            </div>
            <div className="nav-row">
                <ConfirmButton confirm={ saveProfile } />
                <CloseButton />
            </div>
        </div> 
    )
}

export default ProfileEdit